import React, {useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useLocation, useHistory} from 'react-router-dom';
import {getFood,getDiets,getSearchFood,showLoading,getCopyFood} from '../redux/action';
import FoodCard from './FoodCard';
import Paginado from './Paginado';
import Order from './Order';
import Filter from './Filter';
import Loading from './Loading';
import NavBar from './NavBar';
import SideBar from './SideBar';
import s from '../style/Home.module.css'

export default function Home(){
    let foods = useSelector(state=>state.food);
    let searchFood = useSelector(state=>state.searchFood);
    const diets = useSelector(state=>state.diets);
    const loading = useSelector(state=>state.showLoading);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const [search, setSearch] = useState(false);
    const [sideBar, setSideBar] = useState(false);

    //Paginado
    const [foodPerPage,setFoodPerPage] = useState(9);
    const [currentPage, setCurrentPage] = useState(1);
    const indexLast = currentPage * foodPerPage;
    const indexFirst = indexLast - foodPerPage;
    let currentFood = foods.slice(indexFirst,indexLast);
    let lengthFood = foods.length

    const [order,setOrder] = useState('');
    const handleSideBar = ()=>setSideBar((prevState)=>!prevState);

    function searchToHome(e){
        e.preventDefault();
        dispatch(getCopyFood());
        history.push('/home');
    }

    useEffect(()=>{
        if(foods.length===0) {
            dispatch(getFood());
            dispatch(showLoading(true))
        };
        if(location.pathname==='/search'){
            console.log(location)
            dispatch(getSearchFood(location.search.split('=')[1]))
            setSearch(()=>true)
            dispatch(showLoading(true));
        };
        if(diets.length===0){
            dispatch(getDiets())
        }
        return()=>{
            dispatch(getCopyFood())
            };
    },[dispatch])

    return(
        <>
        <NavBar openSideBar={handleSideBar}/>
        <SideBar sideBar={sideBar} setOrder={setOrder} setCurrentPage={setCurrentPage}/>
        <div className={s.container}>
            <Paginado 
                food={lengthFood}
                setCurrentPage={setCurrentPage}
                currentPage = {currentPage}
                foodPerPage={foodPerPage}
            />
            {/* <div className={s.containerSelect}>
                <Order setOrder={setOrder} setCurrentPage={setCurrentPage}/>
                <Filter setCurrentPage={setCurrentPage} diets={diets}/>
            </div> */}
            {loading&&<Loading/>} 
            <div className={s.containerSelect}>
                {search&&!loading?<h4>{lengthFood} Resultados para tu búsqueda</h4>: null}
            </div>
            <div className={s.containerFood}>
                {currentFood.length&&currentFood.map(el=>
                    <FoodCard
                        key={el.id}
                        id = {el.id}
                        title = {el.title}
                        image = {el.image}                    
                        diets = {el.diets}
                    />)}
            </div>
            <div className={s.containerSelect}>
                {search?<button className={s.btnHome} onClick={searchToHome}>GO TO HOME</button>:null}
            </div>            
        </div>  
        </>              
    )
}