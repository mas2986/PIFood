import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {orderName,orderHScore} from '../redux/action';
import '../style/Select.css';

export default function Order({setOrder,setCurrentPage}){
    const dispatch = useDispatch();

    const handleName = (e)=>{
        e.preventDefault();
        dispatch(orderName(e.target.value));
        setCurrentPage(1);
        console.log('Segun Title')
        setOrder(`Ordenado ${e.target.value}`);
    }

    const handleHScore = (e) => {
        e.preventDefault();
        dispatch(orderHScore(e.target.value));
        setCurrentPage(1);
        console.log('Segun HealthScore');
        setOrder(`Ordenado ${e.target.value}`)
    }

    return(
        <>
        <div className="content-select">
            <div className="select-box">
                <span className="label">Sort by:</span>
                <select onChange = {handleName}>
                    <option selected value="" hidden>Title</option>
                    <option value="AZ">De A a Z</option>
                    <option value="ZA">De Z a A</option>
                </select>
                <i class="ri-arrow-down-s-fill"></i>
            </div>
        </div>
        <div className="content-select">
            <div className="select-box">        
                <span className="label">Sort by:</span>
                <select onChange = {handleHScore}>
                    <option selected value="" hidden>HealthScore</option>
                    <option value="menor">Ascendente</option>
                    <option value="mayor">Descendente</option>
                </select>
                <i class="ri-arrow-down-s-fill"></i>
            </div>
        </div>
        </>
    )
}