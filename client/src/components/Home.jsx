import React, {useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getFood,getDiets,getCopyFood} from '../redux/action';
import FoodCard from './FoodCard';
import Paginado from './Paginado';
import Order from './Order';
import Filter from './Filter';
import s from '../style/Home.module.css'

export default function Home(){
    let foods = useSelector(state=>state.food);
    const diets = useSelector(state=>state.diets);
    const dispatch = useDispatch();

    //Paginado
    const [foodPerPage,setFoodPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
    const indexLast = currentPage * foodPerPage;
    const indexFirst = indexLast - foodPerPage;
    const currentFood = foods.slice(indexFirst,indexLast);

    const [order,setOrder] = useState('');

    useEffect(()=>{
        if(foods.length===0) {
            dispatch(getFood());
        };
        if(diets.length===0){
            dispatch(getDiets())
        }
        return()=>{
            dispatch(getCopyFood())
            };
    },[dispatch])

    
    return(
        <div className={s.container}>
            {console.log('Home',foods)}
            <Paginado 
                food={foods.length}
                setCurrentPage={setCurrentPage}
                currentPage = {currentPage}
                foodPerPage={foodPerPage}
            />
            <Order setOrder={setOrder} setCurrentPage={setCurrentPage}/>
            <Filter setCurrentPage={setCurrentPage} diets={diets}/>
            {currentFood.length&&currentFood.map(el=>
                <FoodCard
                    key={el.id}
                    id = {el.id}
                    title = {el.title}
                    image = {el.image}                    
                    diets = {el.diets}
                />)}
        </div>
    )
}