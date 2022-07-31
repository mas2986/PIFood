import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link,useHistory} from 'react-router-dom';
import {getSearchFood} from '../redux/action';
import '../style/NavBar.css'

export default function NavBar(){
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
            history.push(`/?search=${input}`);
            setInput('');
        }
        else alert('Ingrese un nombre para realizar la búsqueda');
    }

    return(  
        <nav>
            <ul className="container">
                <Link to='/' className="text">
                    <li>INICIO</li>
                </Link>
                <Link to='/home' className="text">
                    <li>HOME</li>
                </Link>
                <Link to='/create' className="text">
                    <li>CREAR FOOD</li>
                </Link>
                <div>
                    <input 
                    value={input}
                    onChange={handleInput} 
                    type="text"
                    placeholder='Búsqueda por nombre de comida'/>
                    <input className="btnSubmit" type='submit' onClick={handleSubmit}  value="BUSCAR"/>
                </div>
            </ul>
        </nav>

    )
}