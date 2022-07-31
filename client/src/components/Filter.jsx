import React,{useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {filterDiets} from '../redux/action';

export default function Filter({setCurrentPage,diets}){
    const dispatch = useDispatch();

    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(filterDiets(e.target.value));
        setCurrentPage(1);
    }

    return(
        <>
        <select onChange={handleFilter}>
            <option selected value="" hidden>Filtrar por tipo de dieta</option>
            <option value="allDiets">Todas las dietas</option>
            {diets&&diets.map(el=><option value={el} key={el}>{el}</option>)}
        </select>
        </>
    )
}
