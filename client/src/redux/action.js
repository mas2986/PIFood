import axios from 'axios';
import {GET_FOOD,GET_COPY_FOOD,GET_DIETS, GET_ID_FOOD,GET_SEARCH_FOOD,ADD_FOOD,ORDER_BY_NAME,ORDER_BY_HSCORE,FILTER_DIETS} from './constantes';
const URL = 'http://localhost:3001'

export function getFood(){
    return async function(dispatch){
        try{
            let response = await axios.get(`${URL}/recipes`);
            let food = await response.data;
            return dispatch({
                type: GET_FOOD,
                payload: food
            })            
        }
        catch(e){console.log('errorHome',e)}
    }
}

export function getDiets(){
    return async function(dispatch){
        try{
            let response = await axios.get(`${URL}/diets`);
            let diets = response.data;
            console.log('diets',diets)
            return dispatch({
                type: GET_DIETS,
                payload: diets
            })
        }
        catch(e){console.log(e.message)};
    }
}

export function getIdFood(id){
    return async function(dispatch){
        try{
            let response = await axios.get(`${URL}/recipes/${id}`);
            let idFood = await response.data;
            return dispatch({
                type: GET_ID_FOOD,
                payload: idFood
            })
        }
        catch(e){console.log(e.message)}
    }
}

export function getSearchFood(name){
    return async function(dispatch){
        try{
            console.log('food',name)
            let response = await axios.get(`${URL}/recipes?title=${name}`);
            let searchFood = await response.data;
            return dispatch({
                type: GET_SEARCH_FOOD,
                payload: searchFood
            })
        }
        catch(e){console.log('errorName',e)}
    }
}

export function addRecipe(body){
    return async function(dispatch){
        try{
            console.log('En addRecipe',body);
            let bodyFood = await axios.post(`${URL}/recipe`,body)
            console.log('body',bodyFood);
            if(bodyFood.status===201){
                dispatch({
                    type:ADD_FOOD,
                    payload: bodyFood.data
                });
                alert('Receta creada exitosamente');             
            }
       }
        catch(e){console.log(e)}
    }
}

export function getCopyFood(){
    return{
        type: GET_COPY_FOOD
    }
}
export function orderName(value){
    return{
        type:ORDER_BY_NAME,
        payload:value
    }
}

export function orderHScore(value){
    return{
        type:ORDER_BY_HSCORE,
        payload:value
    }
}

export function filterDiets(value){
    alert('Filtrado exitoso')
    return{
        type: FILTER_DIETS,
        payload: value
    }
}