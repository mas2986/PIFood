import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getIdFood } from '../redux/action';
import '../style/Detail.css'

export default function Detail({ match }) {
    const idFood = useSelector(state => state.idFood);
    const dispatch = useDispatch();
    const { id } = useParams();


    useEffect(() => {
        console.log('Mi id es' + id);
        if (id) dispatch(getIdFood(id));
    }, [dispatch]);

    return (
        <div className="containerDetail">
        <div className="card">
            <div className="product">
                <div className="left-side">
                    <div className="container">
                        <div className="main-photo">
                            <img src={idFood.image} />
                        </div>
                        <div className="info">
                            <span>DISHTYPES</span>
                            <ul>
                                {idFood.dishTypes?.length ? idFood.dishTypes.map(el => <li key={el}>{`${el[0].toUpperCase()}${el.slice(1)}`}</li>):<li>No especificado</li>}
                            </ul>                            
                        </div>                        
                    </div>
                </div>
                <div className="right-side">
                    <div className="text">
                        <h1>{idFood.title}</h1>
                        <span>ID: {idFood.id}</span>
                    </div>
                    <div className="price">
                        <span>HScore</span>
                        <h2><strong>{idFood.healthScore}</strong></h2>
                    </div>

                    <div className="info">
                        <span>DIETS</span>
                        <ul>
                            {idFood.diets && idFood.diets.map(el => <li key={el}>{`${el[0].toUpperCase()}${el.slice(1)}`}</li>)}
                        </ul>
                    </div>                  
                    <div className="btn">
                    <Link to='/home'>
                        <button>GO TO HOME</button>
                    </Link>
                    </div>         
                </div>
            </div>
        </div>
        <div>
                <h3>SUMMARY</h3>
                <p>{idFood.summary}</p>
            </div>
            <div>
                <h3>STEPS</h3>
                <ol>
                    {idFood.steps&&idFood.steps.map(el=><li>{el}</li>)}
                </ol>
            </div>
        </div>
    )

}