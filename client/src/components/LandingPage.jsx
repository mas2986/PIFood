import React from 'react';
import {Link} from 'react-router-dom';
import '../style/LandingPage.css'

export default function LandingPage(){
    return(
        <div className="hero">
            <h2>Welcome Henry Food</h2>
            <Link to='/home'>
                <button>
                    <span>ENTER</span>
                </button>
            </Link>
        </div>
    )
}