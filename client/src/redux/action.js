import axios from 'axios';
import {SHOW_LOADING,GET_FOOD,GET_COPY_FOOD,GET_DIETS, GET_ID_FOOD,CLEAR_DETAIL,GET_SEARCH_FOOD,ADD_FOOD,ORDER_BY_NAME,ORDER_BY_HSCORE,FILTER_DIETS} from './constantes';
const URL = 'http://localhost:3001'

export function getFood(){
    return async function(dispatch){
        try{
            let response = await axios.get(`${URL}/recipes`);
            dispatch({type:SHOW_LOADING,payload:false})
            let food = await response.data;
            return dispatch({
                type: GET_FOOD,
                payload: food
            })            
        }
        catch(e){
            dispatch({type:SHOW_LOADING,payload:false})
            alert('No se pudo cargar los datos')
        }      
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
            dispatch({type:SHOW_LOADING,payload:false})
            let idFood = await response.data;
            return dispatch({
                type: GET_ID_FOOD,
                payload: idFood
            })
        }
        catch(e){
            dispatch({type:SHOW_LOADING,payload:false})
            console.log(e.message)
        }
    }
}

export function getSearchFood(name){
    return async function(dispatch){
        try{
            console.log('food',name)
            let response = await axios.get(`${URL}/recipes?title=${name}`);
            dispatch({type:SHOW_LOADING,payload:false})
            let searchFood = await response.data;
            return dispatch({
                type: GET_SEARCH_FOOD,
                payload: searchFood
            })
        }
        catch(e){
            dispatch({type:SHOW_LOADING,payload:false})
            console.log('errorName',e)
        }
        
    }
}

export function addRecipe(body){
    return async function(dispatch){
        try{
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

export function clearDetail(){
    return{
        type: CLEAR_DETAIL
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

export function showLoading(status){
    return{
        type: SHOW_LOADING,
        payload: status
    }
}