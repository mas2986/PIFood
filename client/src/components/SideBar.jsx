import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {getSearchFood, showLoading} from '../redux/action';
import Order from './Order';
import Filter from './Filter';
import '../style/SideBar.css';

export default function SideBar({sideBar}){
    const [input,setInput] = useState('');
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
          <div>
                    <i class="ri-search-line"></i>
                    <input 
                    value={input}
                    onChange={handleInput} 
                    type="text"
                    placeholder='Búsqueda por nombre de comida'/>

                    <input className="btnSubmit" type='submit' onClick={handleSubmit}  value="BUSCAR"/>
                </div>
            <li><Order/></li>
            <li><Filter/></li>
        </div>
    )
}