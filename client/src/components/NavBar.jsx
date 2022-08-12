import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {NavLink,useHistory} from 'react-router-dom';
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