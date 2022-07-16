import React from 'react';
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return(
        <>
        <h2>Bienvenidos a Henry Food</h2>
        <Link to='/home'>
            <button>Ingresar</button>
        </Link>
        </>
    )
}