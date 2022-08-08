require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const {Recipe, Diet} = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const URL = 'https://api.spoonacular.com/recipes'
const flag = '/complexSearch?addRecipeInformation=true';
const {apiKey} = process.env;
//apiKey = 5bfe94162e3d4dfcbcc9a43e61f54f17 para el ENV
//apiKey = 1bd36b11dedd4b2eaeb261378b86aa5f
//apiKey = 26b4cc93a1dd452aba27a49817280738



const router = Router();
//https://api.spoonacular.com/recipes/complexSearch?apiKey=1bd36b11dedd4b2eaeb261378b86aa5f
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getRecipeApi = async () =>{
    let recipeApi = await axios.get(`${URL}${flag}&apiKey=${apiKey}&number=100`);
    recipeApi = await recipeApi.data.results;    
    recipeApi = recipeApi.map(recipe=>{
        return{
            id:recipe.id,
            title:recipe.title,
            //summary:recipe.summary,
            healthScore:recipe.healthScore,
            //weightWatcherSmartPoints:recipe.weightWatcherSmartPoints,
            image: recipe.image,
            //dishTypes: recipe.dishTypes,
            diets: recipe.diets,
            //steps: recipe.analyzedInstructions[0]?.steps
        }
    })
    return recipeApi;
}

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

const getAllRecipe = async()=>{
    let recipeApi = await getRecipeApi();
    let recipeDb = await getRecipeDb();
    return recipeApi.concat(recipeDb);
}

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

const getRecipeDbId = async (id)=>{
    try{
        console.log('DBid',id);
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
        console.log('recipeId',recipeId)
        return recipeId;
    }
    catch(e){return null}
}

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

router.get('/recipes/:id',async (req,res,next)=>{
    //buscar recetas por id
    let {id} = req.params;
    try{
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

router.get('/diets',async (req,res,next)=>{
    try{
        let allRecipe = await getAllRecipe();
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
        return res.status(200).json(diets);
    }
    catch(e){next(e)}
})

router.post('/recipe',async (req,res,next)=>{
    let {title,diets,summary} = req.body;
    if(!title||!diets||!summary) return res.status(404).send('Faltan datos obligatorios');
    try{
        let promises = diets.map(el=>Diet.findOne({where:{name:el}}));
        let idDiets = await Promise.all(promises)
        let recipe = await Recipe.create(req.body);    
        if(recipe) {
            await recipe.addDiets(idDiets);
            //let diet = await Diet.findByPk(idDiets)
            recipe.dataValues.diets = diets//
            console.log('recipe',recipe);
            //console.log('diet',diet)
        }
        return res.status(201).json(recipe);
    }    
    catch(e){next(e)}
})

module.exports = router;
