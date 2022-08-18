require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const {Recipe, Diet} = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const URL = 'https://api.spoonacular.com/recipes'
const flag = '/complexSearch?addRecipeInformation=true';
const {apiKey} = process.env;
let dietsComplete = false;
//apiKey = d4ff803413e94920ae48a43e59907b94 para el ENV
//apiKey = 1bd36b11dedd4b2eaeb261378b86aa5f
//apiKey = 1bd36b11dedd4b2eaeb261378b86aa5f
//apiKey = 5bfe94162e3d4dfcbcc9a43e61f54f17
//URL = https://api.spoonacular.com/recipes


const router = Router();
//https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=1bd36b11dedd4b2eaeb261378b86aa5f&number=10
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//Funcion para traer datos de API para la RUTA PRINCIPAL
const getRecipeApi = async () =>{
    let recipeApi = await axios.get(`${URL}${flag}&apiKey=${apiKey}&number=100`);
    recipeApi = await recipeApi.data.results;    
    recipeApi = recipeApi.map(recipe=>{
        return{
            id:recipe.id,
            title:recipe.title,
            healthScore:recipe.healthScore,
            image: recipe.image,
            diets: recipe.diets,
        }
    })
    return recipeApi;
}
//Funcion para traer TODOS los datos de la DB incluyendo el modelo Diet
//y devolviendolos con igual formato que los datos de API
const getRecipeDb = async ()=>{
    let recipeDb = await Recipe.findAll({
        include:{
            model:Diet,
            attributes:['name'],
            through:{
                attributes:[]
            }
        }                
    });
    recipeDb = recipeDb.map(e=>e.toJSON());
    recipeDb.map(el=>{
       el.diets = el.diets.map(e=>e.name);
    }) 
    return recipeDb;
}
//Funcion que ejecuta las funciones para traer datos de API 
//y de DB y los concatena
const getAllRecipe = async()=>{
    let recipeApi = await getRecipeApi();
    let recipeDb = await getRecipeDb();
    return recipeApi.concat(recipeDb);
}

//Funcion que se conecta a ENDPOINT y trae los datos de un ID en particular
//enviado desde el FRONT para la ruta de DETAIL, si no lo encuentra devuelve NULL
const getRecipeApiId = async(id)=>{
    try{
        let recipeId = await axios.get(`${URL}/${id}/information?apiKey=${apiKey}`)
        recipeId = recipeId.data;
        if (recipeId){
            return{
                  id:recipeId.id,
                  title:recipeId.title,
                  summary:recipeId.summary,
                  healthScore:recipeId.healthScore,
                  image: recipeId.image,
                  dishTypes: recipeId.dishTypes,
                  diets: recipeId.diets,
                  steps: recipeId.analyzedInstructions[0]?.steps.map(e=>e.step)
            }
        }        
    }
    catch(e){return null}
}

//Funcion que busca en la DB un ID en particular enviado desde el FRONT para
//la ruta de DETAIL; si no lo encuentra retorna NULL
const getRecipeDbId = async (id)=>{
    try{
        let recipeId = await Recipe.findByPk(id,{
            include:{
                model:Diet,
                attributes:['name'],
                through:{
                    attributes:[]
                }
            }
        })        
        recipeId = recipeId.toJSON();
        recipeId.diets = recipeId.diets.map(el=>el.name);
        // console.log('recipeId',recipeId)
        return recipeId;
    }
    catch(e){return null}
}

//Funcion que se conecta al ENDPOINT desde donde se traen todas las recetas,
//toma el atributo diets, que es un array, lo convierte a Set para eliminar
//duplicados, los convierte en array nuevamente y por ultimo los guarda en la DB
const setDiets = async ()=>{
    try{
        let allRecipe = await getRecipeApi();
        let diets = allRecipe.map(e=>e.diets).flat();
        let setDiets = new Set(diets);
        diets = [...setDiets];
        diets = diets.filter(Boolean);
        let promises = diets.map(e=>Diet.findOrCreate({
            where:{
                name:e
            }
        }))
        await Promise.all(promises);
        dietsComplete = true;
        return diets;
    }
    catch(e){return e}
    
}

//Ruta a la que se conecta la accion que trae los datos al componente Home
//Si recibe por query un title solo retorna los datos que incluyen ese title
router.get('/recipes',async (req,res,next)=>{
    //buscar receta por nombre
    let {title} = req.query;
    try{
        let allRecipe = await getAllRecipe();
        if(!title) return res.status(200).json(allRecipe);
        let recipeTitle = allRecipe.filter(e=>e.title.toUpperCase().includes(title.toUpperCase()));
        if(recipeTitle) res.status(200).json(recipeTitle);
    }
    catch(e){next(e)}
})

//Ruta que recibe un id por params, hace la busqueda de ese id en la API y
//en la DB y lo devuelve si hay coincidencias.Caso contrario devuelve 
//un status 404
router.get('/recipes/:id',async (req,res,next)=>{
    //buscar recetas por id
    let {id} = req.params;
    try{
        console.log('Ejecutando con id',id);
        //Implementar con Promise.all ambas promesas
        let recipeApi = await getRecipeApiId(id);
        let recipeDb = await getRecipeDbId(id);                 
        let recipeId = recipeDb || recipeApi;
        recipeId?
        res.status(200).json(recipeId):
        res.status(404).send(new Error('Tu búsqueda no produjo resultados'));        
    }
    catch(e){next(e)}
})

//Ruta que ejecuta que funcion setDiets para guardar las dietas en la DB 
//y las devuelve al cliente
router.get('/diets',async (req,res,next)=>{
    try{
        let diets = await setDiets();                
        return res.status(200).json(diets);
    }
    catch(e){next(e)}
})

//Ruta que crea una nueva receta, recibiendo por body los datos obligatorios
//Si los datos obligatorios fueron enviados, se guarda en la DB la receta en
//la tabla recipes, se busca los id de las dietas enviadas y guarda en la
//tabla intermedia la relacion entre ambas tablas.
//Retorna al cliente la dieta creada
router.post('/recipe',async (req,res,next)=>{
    let {title,diets,summary} = req.body;
    let dietsDB = [];
    if(!title||!diets||!summary) return res.status(404).send('Faltan datos obligatorios');
    try{
        if(!dietsComplete) dietsDB = await setDiets();
        let promises = diets.map(el=>Diet.findOne({where:{name:el}}));
        let idDiets = await Promise.all(promises)
        let recipe = await Recipe.create(req.body);
        if(recipe) {
            await recipe.addDiets(idDiets);
            //let diet = await Diet.findByPk(idDiets)
            recipe.dataValues.diets = diets//
            //console.log('diet',diet)
        }
        return res.status(201).json(recipe);
    }    
    catch(e){next(e)}
})


/* router.put('/recipe/:id',async (req,res,next)=>{
    let { id } = req.params;
    try{
        let recipeDb = await Recipe.findByPk(id);
        if(!recipeDb) return res.status(404).send('No se encontró la receta a modificar');
        await recipeDb.update(req.body);
        res.status(200).json(recipeDb);
    }
    catch(e){next(e)}

}) */

/* router.delete('/recipe/:id',async (req,res,next)=>{
    let {id} = req.params;
    try{
        let recipe = await Recipe.findByPk(id);
        if(!recipe) return res.status(404).send('No se encontro la receta a eliminar');
        await recipe.destroy();
        res.status(200).send('Receta eliminada correctamente');
    }
    catch(e){next(e)}
})  */

module.exports = router;
