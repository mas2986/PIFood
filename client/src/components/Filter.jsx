import React,{useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {filterDiets} from '../redux/action';
import '../style/Select.css'

export default function Filter({setCurrentPage,diets}){
    const dispatch = useDispatch();

    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(filterDiets(e.target.value));
        setCurrentPage(1);
    }

    return(
        <div className="content-select">
            <div className="select-box">
                <span className="label">Filter by:</span>
                <select onChange={handleFilter}>
                    <option selected value="" hidden>Diets</option>
                    <option value="allDiets">All</option>
                    {diets&&diets.map(el=><option value={el} key={el}>{el}</option>)}
                </select>
                <i class="ri-arrow-down-s-fill"></i>
            </div>
        </div>
    )
}
