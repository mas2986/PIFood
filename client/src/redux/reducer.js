import {GET_FOOD} from './constantes';
const initialState = {
    food:[]
}

const rootReducer = (state = initialState, action) =>{
    switch (action.type){
        case GET_FOOD:
            return{
                ...state,
                food:[...action.payload]
            }

        default: return {...state}
    }
}

export default rootReducer;