import {SHOW_LOADING, GET_FOOD,GET_COPY_FOOD,GET_DIETS, GET_ID_FOOD,CLEAR_DETAIL, GET_SEARCH_FOOD,ADD_FOOD,ORDER_BY_NAME,ORDER_BY_HSCORE,FILTER_DIETS} from './constantes';
const initialState = {
    food:[],
    copyFood:[],
    diets:[],
    searchFood: [],
    idFood:{},
    showLoading: false
}

const rootReducer = (state = initialState, action) =>{
    switch (action.type){
        case GET_FOOD:
            return{
                ...state,
                food:[...action.payload],
                copyFood:[...action.payload]
            }
        case GET_COPY_FOOD:
            return{
                ...state,
                food:state.copyFood
            }
        case CLEAR_DETAIL:
            return{
                ...state,
                idFood:{}
            }
        case GET_DIETS:
            return{
                ...state,
                diets:[...action.payload]
            }
        case GET_ID_FOOD:
            return{
                ...state,
                idFood: action.payload
            }
        case GET_SEARCH_FOOD:
            console.log(action.payload);
            return{
                ...state,
                food: action.payload
            }
        case ADD_FOOD:
            console.log('Añadiendo receta');
            return{
                ...state,
                 food: [...state.food,action.payload],
                copyFood: [...state.food,action.payload]               
            }
        case ORDER_BY_NAME:
            let orderFood = state.copyFood;
            orderFood = orderFood.sort(function(a,b){
                if(a.title>b.title) return 1;
                if(a.title<b.title) return -1;
                return 0;
            })
            if(action.payload !== 'AZ') orderFood = orderFood.reverse();
            console.log('OrderName',orderFood)            
            return{
                ...state,
                food: orderFood
            }
        case ORDER_BY_HSCORE:
            let orderHScore = state.copyFood;
            orderHScore = orderHScore.sort(function(a,b){
                if(a.healthScore>b.healthScore) return 1;
                if(a.healthScore<b.healthScore) return -1;
                return 0;
            });
            console.log('OrderHScore',orderHScore);
            if (action.payload!='menor') orderHScore = orderHScore.reverse();
            return{
                ...state,
                food: orderHScore
            }
        case FILTER_DIETS:
            let filterDiets = state.copyFood;
            if(action.payload!=='allDiets'){
                filterDiets = filterDiets.filter(el=>el.diets.includes(action.payload));                                
            }
            console.log('filter',filterDiets);
            return{
                ...state,
                food: filterDiets
            }
        case SHOW_LOADING:
            return{
                ...state,
                showLoading: action.payload
            }

        default: return {...state}
    }
}

export default rootReducer;