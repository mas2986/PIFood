import React from 'react';
import {Link} from 'react-router-dom';
import '../style/LandingPage.css'

export default function LandingPage(){
    return(
        <div className="landingPage">
        <h2>Bienvenidos a Henry Food</h2>
        <Link to='/home'>
            <button>INGRESAR</button>
        </Link>
        </div>
    )
}