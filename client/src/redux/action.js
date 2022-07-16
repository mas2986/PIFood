import axios from 'axios';
import {GET_FOOD} from './constantes';
const URL = 'http://localhost:3001'

export function getFood(){
    return async function(dispatch){
        let food = await axios.get(`${URL}/recipes`);
        food = await food.data;
        console.log('action',food);
        return dispatch({
            type: GET_FOOD,
            payload: food
        })
    }
}