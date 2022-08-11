import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link,useHistory} from 'react-router-dom';
import {getSearchFood,showLoading} from '../redux/action';
import '../style/NavBar.css'

export default function NavBar({openSideBar}){


    return(  
        <nav>
            <ul className="container">
                <div className="icon" onClick={openSideBar}>
                    <li><i className="ri-menu-fill"></i></li>                                        
                </div>                
                <div className="container-left">
                    <Link to='/home' className="text">
                        <li>Home</li>
                    </Link>
                    <Link to='/create' className="text">
                        <li>New Recipe</li>
                    </Link>
                    <Link to='/' className="text">
                        <li>LogOut</li>
                    </Link>
                </div>
{/*               
 */}            </ul>
        </nav>

    )
}