require('dotenv').config();
const { Router } = require('express');
const {Recipe, Type} = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const URL = 'https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true'
const {apiKey} = process.env;

const router = Router();
//https://api.spoonacular.com/recipes/complexSearch?apiKey=1bd36b11dedd4b2eaeb261378b86aa5f
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getRecipeApi = async () =>{
    let recipeApi = await axios.get(`${URL}&apiKey=${apiKey}&number=100`);
    recipeApi = await recipe.data.results;    
    recipeApi.map(recipe=>{
        return{
            id:recipe.id,
            title:recipe.title,
            summary:recipe.summary,
            healthScore:recipe.healthScore,
            weightWatcherSmartPoints:recipe.weightWatcherSmartPoints,
            image: recipe.image,
            dishTypes: recipe.dishTypes,
            diets: recipe.diets,
            steps: recipe.analyzedInstructions[0].steps
        }
    })
}

const getRecipeDb = async ()=>{
    let recipeDb = await Recipe.findAll({
        include:{
            model:Type,
            atributtes:['name'],
            through:{
                atributtes:[]
            }
        }
    });
    recipeDb = recipeDb.map(e=>e.toJSON());
    return recipeDb;
}

const getAllRecipe = async()=>{
    let recipeApi = getRecipeApi();
    let recipeDb = getRecipeDb();
    return recipeApi.concat(recipeDb);
}

router.get('/recipes',async (req,res,next)=>{
    //buscar receta por nombre
    let {title} = req.query;
    try{
        let allRecipe = await getAllRecipe();
        if(!title) return res.status(200).json(allRecipe);
        let recipeTitle = allRecipe.filter(e=>e.title.toUpperCase.includes(title.toUpperCase));
        if(recipeTitle) res.status(200).json(recipeTitle);
    }
    catch(e){next(e)}
})

router.get('/recipes/:id',async (req,res,next)=>{
    //buscar recetas por id
    let {id} = req.params;
    try{
        let allRecipe = await getAllRecipe();
        if(id) let recipeId = allRecipe.filter(e=>e.id==id);
        if(recipeId) return res.status(200).json(recipeId);
    }
    catch(e){next(e)}
})

router.get('/types',async (req,res,next)=>{
    try{
        let allRecipe = await getAllRecipe();
        let diets = allRecipe.map(e=>e.diets).flat();
        let setDiets = new Set(diets);
        diets = [...setDiets];
        diets = diets.filter(Boolean);
        let promises = diets.map(e=>Type.findOrCreate({
            where:{
                name:e
            }
        }))
        await Promise.all(promises);
        return res.status(201).json(diets);
    }
    catch(e){next(e)}
})

router.post('/recipe',async (req,res)=>{
    
})

module.exports = router;
