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
    /* https://www.freejpg.com.ar/imagenes/premium/1198500404/patrr-n-sin-costura-de-vector-de-alimentos-cocina-fondo-de-pantalla-cafr-de-comida-rr-pida-con-iconos-gastronr-micos-textura-de-color-verde-esmeralda-textil-decorativo-diser-o-de-papel-de-envoltura-fondo-brillante-para-el-menr-recibos */
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
