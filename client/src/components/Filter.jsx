import React,{useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {filterDiets} from '../redux/action';
//import {filterOrigin} from '../redux/action';
import '../style/Select.css'

export default function Filter({setCurrentPage,diets}){
    const dispatch = useDispatch();

    const handleFilterDiets = (e) => {
        e.preventDefault();
        dispatch(filterDiets(e.target.value));
        setCurrentPage(1);
    }


    return(
         <div className="content-select">
            <div className="select-box">
                <span className="label">Filter by:</span>
                <select onChange={handleFilterDiets}>
                    <option selected value="" hidden>Diets</option>
                    <option value="allDiets">All</option>
                    {diets&&diets.map(el=><option value={el} key={el}>{el}</option>)}
                </select>
                <i class="ri-arrow-down-s-fill"></i>
            </div>
        </div> 
/*         <div className="content-select">
        <div className="select-box">
            <span className="label">Filter by:</span>
            <select onChange={handleFilterOrigin}>
                <option selected value="" hidden>Origin</option>
                <option value="API">API</option>
                <option value="DB">DB</option>
                <option value="all">All</option>
            </select>
            <i class="ri-arrow-down-s-fill"></i>
        </div>
    </div> */
    )
}
