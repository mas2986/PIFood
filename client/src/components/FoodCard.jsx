import React from 'react';
import {Link} from 'react-router-dom';
import '../style/FoodCard.css'

export default function FoodCard({id,title,image, diets}){
    return(
        <>            
  <div className="wrapper">
    <div className="pic">
        <img src={image} alt={title}/>
    </div>
    <p className="header">
      {title}
    </p>
    <p className="content">DIETS 😁
      <br/><br/> 
      <ul className="descriptionUl">
        {diets?diets.map(el=><li key={el} className="descriptionLi">{el}</li>):<li className="descriptionLi">Sin dietas</li>}                    
      </ul>
      <br/><br/> 
    </p>
    <Link to={`/detail/${id}`}>
      <div className="button-center">
        <div className="leesmeer"><b>DETAIL </b> <i className="fas fa-angle-right"></i></div>
      </div>
    </Link>
  </div>

        </>
  /*       <div className={s.product}>
        <div className={s.productPhoto}>
            <div className={s.photoContainer}>
                <div className={s.photoMain}>
                   <div className={s.controls}>
                        <FaRegHeart className={s.icon}/>
                        <FaShareAlt className={s.icon}/>
                    </div>
                    <img className={s.photoMainImg} src={image} alt="image nout found"/>
                </div>
                <div className={s.photoAlbum}>
                 <Link to={`/detalle/${id}`} className={s.photoAlbumUl}>
                    <button className={s.buyBtn}>VER DETALLE</button>                      
                </Link>
            </div>
        </div>
    </div>
    <div className={s.productInfo}>
        <div>
            <h1 className={s.titleH1}>{title}</h1>
            <span className={s.titleSpan}>ID: {id}</span>
        </div>
        <div className={s.price}>
            Peso {weight.length===2?<span className={s.priceSpan}>{`${weight[0]} ${weight[1]}`}</span>:"No especificado"}
        </div>          
        <div className={s.description}>
            <h3 className={s.descriptionH3}>DIETS</h3>
            <ul className={s.descriptionUl}>
                {diets?diets.map(el=><li key={el} className={s.descriptionLi}>{el}</li>):<li className={s.descriptionLi}>Sin dietas</li>}                    
            </ul>
        </div>
        
    </div>
</div> */
       /*  <div className={s.foodCard}>
            <div className={s.foodCardImage}>
                <img src={image}/>
            </div>
            <div className={s.foodCardContent}>
                <div className={s.foodCardFoodName}>
                    <h3>{title}</h3>
                </div>
                <div className={s.foodCardArtistName}>
                    <h5>ID <a>{id}</a></h5>
                </div>
                <div className={s.foodCardAbout}>
                    <h4>DIETS</h4>
                    {diets&&diets.map(el=><p key={el}>{el}</p>)}          
                </div>          
                <Link to = {`/detail/${id}`}>
                    <button className={s.detailBtn}>VER DETALLE</button>
                </Link>          
            </div>
        </div> */
      /*   <div className={s.product}>
            <div className={s.productPhoto}>
                <div className={s.photoContainer}>
                    <div className={s.photoMain}>                        
                        <img className={s.photoMainImg} src={image} alt="image nout found"/>
                    </div>
                    <div className={s.photoAlbum}>
                    <Link to={`/detalle/${id}`} className={s.photoAlbumUl}>
                        <button className={s.buyBtn}>VER DETALLE</button>                      
                    </Link>
                </div>
            </div>
        </div>
        <div className={s.productInfo}>
            <div>
                <h1 className={s.titleH1}>{title}</h1>
                <span className={s.titleSpan}>ID: {id}</span>
            </div>
            <div className={s.price}>
                DishTypes {dishTypes.length?<span className={s.priceSpan}>{dishTypes}</span>:"No especificado"}
            </div>          
            <div className={s.description}>
                <h3 className={s.descriptionH3}>DIETS</h3>
                <ul className={s.descriptionUl}>
                    {diets?diets.map(el=><li key={el} className={s.descriptionLi}>{el}</li>):<li className={s.descriptionLi}>Sin dietas</li>}                    
                </ul>
            </div>
            
        </div>
    </div> */
    )
}