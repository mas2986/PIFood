import React from 'react';
import '../style/Paginado.css'

export default function Paginate({currentPage, foodPerPage, food, setCurrentPage}){  
    let maxPages = Math.ceil(food/foodPerPage);
    let items = [];
    let leftSide = currentPage-2;
    if(leftSide <= 0 ) leftSide=1;
    let rightSide = leftSide + 2;
    if(rightSide>maxPages) rightSide = maxPages;
    for (let number = leftSide ; number <= rightSide; number++) {
      items.push(
        <div key={number} className={(number === currentPage ? 'round-effect active' : 'round-effect')} onClick={()=>{ setCurrentPage(number)}}>
          {number}
        </div>,
      );
    }
  const nextPage = () => {
    if(currentPage<maxPages){
      setCurrentPage(currentPage+1)
    }
  }
  
  const prevPage = () => {
    if(currentPage>1){
      setCurrentPage(currentPage-1)
    }
  }
      
    return ( 
        <div className="flex-container">            
            <div className="paginate-ctn">
                <div className="round-effect" onClick={prevPage}> &lsaquo; </div>
                    {items}
                <div className="round-effect" onClick={nextPage}> &rsaquo; </div>
            </div>
        </div>
    )
  }

/* export default function Paginado({handlePaginado,foodPerPage,food}){
    const page = [];
    for(let i = 1; i<=Math.ceil(food/foodPerPage);i++){
        page.push(i);
    }

    return(
        <ul className = {s.container}>
            {page&&page.map(e=><li className={s.text} key={e}>
                <a onClick={()=>handlePaginado(e)}>{e}</a>
            </li>)}
        </ul>
    )
} */