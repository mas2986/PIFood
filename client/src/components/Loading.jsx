import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {Circles} from 'react-loader-spinner';
import '../style/Loading.css'

export default function Loading(){
    return(
        <div className="spinner">
            <div className="fondo">

            </div>
        </div>
       
    )
}

 {/* <div className='containerLoading'>
            <Circles  color="#00BFFF" height={50} width={50}/>
        </div> */}