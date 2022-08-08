import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link,useHistory} from 'react-router-dom';
import {getSearchFood,showLoading} from '../redux/action';
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
            history.push(`/search?title=${input}`);
            setInput('');
            dispatch(showLoading(true));
        }
        else alert('Ingrese un nombre para realizar la búsqueda');
    }

    return(  
        <nav>
            <ul className="container">
                <Link to='/' className="text">
                    <li>Inicio</li>
                </Link>
                <Link to='/home' className="text">
                    <li>Home</li>
                </Link>
                <Link to='/create' className="text">
                    <li>Crear Receta</li>
                </Link>
{/*                 <div>
                    <input 
                    value={input}
                    onChange={handleInput} 
                    type="text"
                    placeholder='Búsqueda por nombre de comida'/>
                    <input className="btnSubmit" type='submit' onClick={handleSubmit}  value="BUSCAR"/>
                </div>
 */}            </ul>
        </nav>

    )
}