import React, {useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {useHistory,Link} from 'react-router-dom';
import {getSearchFood, showLoading} from '../redux/action';
import Order from './Order';
import Filter from './Filter';
import '../style/SideBar.css';

export default function SideBar({sideBar,setOrder,setCurrentPage}){
    const [input,setInput] = useState('');
    
    const diets = useSelector(state=>state.diets);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleInput = (e) => {
        e.preventDefault();
        setInput(()=>e.target.value);
    }

   

    const handleSubmit = (e) => {
        e.preventDefault();
        if(input!=='') {
            dispatch(getSearchFood(input));
            history.push(`/search?title=${input}`);
            setInput('');            
            dispatch(showLoading(true));
        }
        else alert('Ingrese un nombre para realizar la búsqueda');
    }


    return(
        <div className={sideBar?"sideBar sideBar-open":"sideBar"}>
            <div className="buscar"> 
                <input 
                value={input}
                onChange={handleInput} 
                type="text"
                placeholder='Search Recipes'/>
                <div className="btnSearch" onClick={handleSubmit}>
                    <i className="ri-search-line"></i>
                </div>
            </div>                   
            <li><Order setOrder={setOrder} setCurrentPage={setCurrentPage}/></li>
            <li className="filter"><Filter setCurrentPage={setCurrentPage} diets={diets}/></li>
            <li className="github">
                <a href="https://github.com/mas2986" target="_blank">
                    <i class="ri-github-fill"></i>            
                </a>
                <span>GitHub</span> 
            </li>
            <li className="linkedIn">
                <a href="https://www.linkedin.com/in/marcos-alexis-saac-086380248/" target="_blank">
                    <i class="ri-linkedin-box-fill"></i>
                </a>
                <span>LinkedIn</span>
            </li>
        </div>
    )
}