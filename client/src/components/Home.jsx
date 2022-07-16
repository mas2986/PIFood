import React, {useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getFood} from '../redux/action';
import FoodCard from './FoodCard';
import Paginado from './Paginado';
import s from '../style/Home.module.css'

export default function Home(){
    const foods = useSelector(state=>state.food);
    const dispatch = useDispatch();

    //Paginado
    const [foodPerPage,setFoodPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
    const indexLast = currentPage * foodPerPage;
    const indexFirst = indexLast - foodPerPage;
    const currentFood = foods.slice(indexFirst,indexLast);

    useEffect(()=>{
        if(foods.length===0) {
            console.log('Despachando mi getFood')
            dispatch(getFood());
        }
    },[])

    
    return(
        <div className={s.container}>
            <Paginado 
                food={foods.length}
                setCurrentPage={setCurrentPage}
                currentPage = {currentPage}
                foodPerPage={foodPerPage}
            />
            {currentFood.length&&currentFood.map(el=>
                <FoodCard
                    key={el.id}
                    id = {el.id}
                    title = {el.title}
                    image = {el.image}
                    dishTypes =  {el.dishTypes}
                    diets = {el.diets}
                />)}
        </div>
    )
}