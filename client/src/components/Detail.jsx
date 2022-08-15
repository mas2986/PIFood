import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getIdFood, showLoading, clearDetail } from '../redux/action';
import NavBar from './NavBar';
import Error from './Error';
import Loading from './Loading';
import '../style/Detail.css'

export default function Detail({ match }) {
    const idFood = useSelector(state => state.idFood);
    const loading = useSelector(state => state.showLoading);
    const loadingLocal = useState(true);
    const error = useSelector(state=>state.error);
    const dispatch = useDispatch();
    const { id } = useParams();




    useEffect(() => {
        console.log('Mi id es' + id);
        if (id){
            dispatch(getIdFood(id));
            dispatch(showLoading(true));
        }
        return () => { dispatch(clearDetail()) }
    }, [dispatch]);

    return (
        <>
        <NavBar/>        
        {loading&&loadingLocal?<Loading/>:
        <>
        {error?<Error/>:
        <>
        <div id="container">
            <div className="product-details">
                <h1>{idFood.title}</h1>
                <div className="hint-star star">
                    <h3>Steps</h3>
                </div>
                {idFood.steps ? <p className={idFood.steps.join().length<600?"informationBig":null}>{idFood.steps && idFood.steps.map(e => e)}</p> : <p className="informationBig">Sin datos sobre steps</p>}
                <div className="control">
                    <button className="btn">
                        <span>HSCORE</span>
                        <span className="buy">{idFood.healthScore}</span>
                    </button>
                </div>
            </div>
            <div className="product-image">
                <img src={idFood.image} alt="" />
                <div className="info">
                    <h2> DIETS</h2>
                    <ul>
                        {idFood.diets ? idFood.diets.map((e, i) => <li><strong>Diets {i + 1} : </strong>{e} </li>):<li><strong>No especificado</strong></li>}                        
                    </ul>
                    <h2>DISHTYPES</h2>
                    <ul>
                        {idFood.dishTypes ? idFood.dishTypes.map((e, i) => <li><strong>DishTypes {i + 1} : </strong>{e} </li>):<li><strong>No especificado</strong></li>}                  
                    </ul>                                    
                </div>
            </div>
        </div>
        <div className="containerSummary">
            <h2>SUMMARY</h2>
            <p>{idFood.summary&&idFood.summary.replace(/<[^>]+>/g,"")}</p>
            <br/>
        </div>
        <div className="containerSelect">
            <Link to="/home">
            <button className="btnHome">
                    <span className="label">Go to HOME</span>
                    <span className="icon">
                        <i class="ri-arrow-right-line"></i>
                    </span>
                </button>
            </Link>
        </div>
        <br/>
        </>
        }
        </>
        }
        </>
    )

}