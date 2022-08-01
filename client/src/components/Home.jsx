import React, {useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';
import {getFood,getDiets,getCopyFood} from '../redux/action';
import FoodCard from './FoodCard';
import Paginado from './Paginado';
import Order from './Order';
import Filter from './Filter';
import s from '../style/Home.module.css'
import index from 'axios';

export default function Home(){
    let foods = useSelector(state=>state.food);
    let searchFood = useSelector(state=>state.searchFood);
    const diets = useSelector(state=>state.diets);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [search, setSearch] = useState(false);

    //Paginado
    const [foodPerPage,setFoodPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
    const indexLast = currentPage * foodPerPage;
    const indexFirst = indexLast - foodPerPage;
    let currentFood = foods.slice(indexFirst,indexLast);
    let lengthFood = foods.length

    const [order,setOrder] = useState('');

    function searchToHome(e){
        e.preventDefault();
        dispatch(getCopyFood());
        history.push('/home');
    }

    useEffect(()=>{
        if(location.pathname==='/search'){
            setSearch(()=>true)
        };
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
            {console.log('Search',search)}
            <Paginado 
                food={lengthFood}
                setCurrentPage={setCurrentPage}
                currentPage = {currentPage}
                foodPerPage={foodPerPage}
            />
            <Order setOrder={setOrder} setCurrentPage={setCurrentPage}/>
            <Filter setCurrentPage={setCurrentPage} diets={diets}/>
            {search?<h4>{lengthFood} Resultados para tu búsqueda</h4>:null}
            {currentFood.length&&currentFood.map(el=>
                <FoodCard
                    key={el.id}
                    id = {el.id}
                    title = {el.title}
                    image = {el.image}                    
                    diets = {el.diets}
                />)}
            {search?<button onClick={searchToHome}>GO TO HOME</button>:null}
        </div>
    )
}