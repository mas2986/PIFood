import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {NavLink,useLocation} from 'react-router-dom';
import {getSearchFood,showLoading} from '../redux/action';
import '../style/NavBar.css'

export default function NavBar({openSideBar}){
    const location = useLocation();
    console.log('pathnameNav',location.pathname);

    return(  
        <nav>
            <ul className="container">
                {location.pathname==='/home'||location.pathname==='/search'?                
                    <div className="icon" onClick={openSideBar}>
                        <li><i className="ri-menu-fill"></i></li>                                        
                    </div>  
                    :
                    <div>
                        
                    </div>
                }              
                <div className="container-left">
                    <NavLink exact={true} to='/home'activeClassName="active" className="text">
                        <li>Home</li>
                    </NavLink>
                    <NavLink exact={true} to='/create' activeClassName="active" className="text">
                        <li>New Recipe</li>
                    </NavLink>
                    <NavLink exact={true} to='/' activeClassName="active" className="text">
                        <li>LogOut</li>
                    </NavLink>
                </div>
{/*               
 */}            </ul>
        </nav>

    )
}