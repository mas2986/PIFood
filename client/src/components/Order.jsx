import React from 'react';
import {useDispatch} from 'react-redux';
import {orderName,orderHScore} from '../redux/action'

export default function Order({setOrder,setCurrentPage}){
    const dispatch = useDispatch();

    const handleName = (e)=>{
        e.preventDefault();
        dispatch(orderName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }

    const handleHScore = (e) => {
        e.preventDefault();
        dispatch(orderHScore(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)
    }

    return(
        <>
        <select onChange = {handleName}>
            <option selected value="" hidden>Ordenar alfabéticamente</option>
            <option value="AZ">De A a Z</option>
            <option value="ZA">De Z a A</option>
        </select>
        <select onChange = {handleHScore}>
            <option selected value="" hidden>Ordenar por HealthScore</option>
            <option value="menor">De menor a mayor</option>
            <option value="mayor">De mayor a menor</option>
        </select>
        </>
    )
}