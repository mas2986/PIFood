import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getIdFood, showLoading, clearDetail } from '../redux/action';
import NavBar from './NavBar';
import Loading from './Loading';
import '../style/Detail.css'

export default function Detail({ match }) {
    const idFood = useSelector(state => state.idFood);
    const loading = useSelector(state => state.showLoading);
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
        <>
        <div id="container">
            {loading&&<Loading/>}
            <div className="product-details">

                <h1>{idFood.title}</h1>
                <div className="hint-star star">
                    <h3>Steps</h3>
                </div>
                {idFood.steps ? <p className="information">{idFood.steps && idFood.steps.map(e => e)}</p> : <p className="information">Sin datos sobre steps</p>}
                <div className="control">
                    <button className="btn">
                        <span className="price">HSCORE</span>
                        <span className="shopping-cart">ID</span>
                        <span className="buy">{idFood.healthScore}</span>
                    </button>
                </div>
            </div>
            <div className="product-image">
                <img src={idFood.image} alt="" />
                <div className="info">
                    <h2> DIETS</h2>
                    <ul>
                        {idFood.diets && idFood.diets.map((e, i) => <li><strong>Diets {i + 1} : </strong>{e} </li>)}

                        {/* <li><strong>Shade : </strong>Olive green</li>
		                <li><strong>Decoration: </strong>balls and bells</li>
		                <li><strong>Material: </strong>Eco-Friendly</li> */}
                    </ul>
                    <h2>DISHTYPES</h2>
                    <ul>
                        {idFood.dishTypes && idFood.dishTypes.map((e, i) => <li><strong>DishTypes {i + 1} : </strong>{e} </li>)}

                        {/* <li><strong>Shade : </strong>Olive green</li>
		                <li><strong>Decoration: </strong>balls and bells</li>
		                <li><strong>Material: </strong>Eco-Friendly</li> */}
                    </ul>
                </div>
            </div>
        </div>
        <div className="containerSelect">
            <Link to="/home">
                <button className="btnHome" >GO TO HOME</button>
            </Link>
        </div>
     </>
     </>
    )

}