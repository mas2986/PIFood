import React,{useState,useEffect} from 'react';
import NavBar from './NavBar';
import {useDispatch,useSelector} from 'react-redux';
import {getDiets,addRecipe} from '../redux/action';
import {useHistory} from 'react-router-dom';
import '../style/CreateFood.css';


function validate(input){
    let errors = {}
    console.log('input',input);    
    if(input.title==='') errors.title = 'Este campo es obligatorio';
    //else if(/^([a-zA-Z]+)(\s[a-zA-Z]+)*$/.test(input.title)) errors.title = 'Este campo no acepta números';
    if(input.summary==='') errors.summary = 'Este campo es obligatorio';
    if(input.healthScore<0) errors.healthScore = 'Este campo no puede ser inferior a cero';
    if(input.healthScore>100) errors.healthScore = 'Este campo no puede ser superior a 100';
    if(input.diets?.length) errors.diets = 'Este campo es obligatorio';
    console.log('errors',errors);
    return errors;
}

export default function CreateFood(){
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector(state=>state.diets);
    
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        title:'',
        summary:'',
        healthScore:0,
        steps: '',
        diets: []
    })

    useEffect(()=>{
        if(diets.length===0) dispatch(getDiets())
    },[])

    const handleInput = (e) =>{
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        let errorsValidate = validate({input,[e.target.name]:e.target.value});
        setErrors(()=>errorsValidate);
    }

    const handleSelect = (e) =>{        
        setInput({
            ...input,
            diets:[...input.diets,e.target.value]
        })
    }

    const deleteDiets = (e)=>{
        e.preventDefault();
        console.log('Haciendo click',e.target.value);
        setInput({
            ...input,
            diets: input.diets.filter(el=>el!==e.target.value)
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!input.title||!input.summary||input.diets.length===0) return alert('Complete los datos obligatorios');
        let body = input;
        console.log(body);
        body.healthScore = parseInt(input.healthScore);
        console.log(typeof body.healthScore);
        dispatch(addRecipe(body));
        history.push('/home')
    }

    return(
        <>
        <NavBar/>
<div class="form">
  <div class="form-toggle"></div>
  <div class="form-panel one">
    <div class="form-header">
      <h1>NEW RECIPE</h1>
    </div>
    <div class="form-content">
      <form>
        <div class="form-group">
            <label>Title </label>
            <input type="text"
                name = "title"
                className="title"
                value={input.title}
                // placeholder = 'Ingrese el nombre de su receta'
                onChange = {handleInput}
            />
            {errors.title?<p className = "danger">{errors.title}</p>:null}
        </div>
        <div class="form-group">
            <label>Summary</label>
            <input type="textarea"
                name="summary"
                className="textarea"
                value={input.summary} 
                // placeholder = 'Escribe un breve resumen de su plato'   
                onChange = {handleInput}
            />
            {errors.summary?<p className="danger">{errors.summary}</p>:null}
        </div>
        <div class="form-group">
            <label>Steps</label>
            <input type="textarea"
                name="steps"
                className="textarea"
                value={input.steps}
                // placeholder = 'Pasos de su receta'
                onChange = {handleInput}
            />
            {errors.steps?<p className="danger">{errors.steps}</p>:null}
        </div>
        <div class="form-group">
            <label>HealthScore</label>
            <input type="number" 
                name="healthScore"
                className="healthScore"
                value={input.healthScore}
                // placeholder='Nivel de comida saludable de su plato'
                onChange = {handleInput}
            />
            {errors.healthScore?<p className="danger">{errors.healthScore}</p>:null}
        </div>
        <div class="form-group">
            <label>Diets</label>
            <select name="diets" onChange = {handleSelect}>
                <option selected value="" hidden>Choice Diets</option>
                {diets&&diets.map(el=><option key={el} value={el}>{el}</option>)}
            </select>
            <ul>
                {input.diets&&input.diets.map(el=>
                <li key={el} value={el}>                            
                            <p>{el}</p>
                            <button value={el} onClick={deleteDiets}>
                                <i class="ri-delete-bin-fill"></i>
                            </button>  

                    {/* <button className="noselect">
                        <span className="text">{el}</span>
                        <div  className="icon">
                            <i onClick={deleteDiets}class="ri-delete-bin-fill"></i>
                        </div>
                    </button> */}
                </li>)}
            </ul>
        </div>
        
        <div class="form-group">
            <button type="submit" onClick = {handleSubmit}>CREATE</button>
        </div>
      </form>
    </div>
  </div>
  <div class="form-panel two">        
  </div>
</div>
      {/*   <NavBar/>
        <form>
            <h4>New Recipe</h4>
            <div>
                <label>Title: </label>
                <input type="text"
                    name = "title"
                    className="title"
                    value={input.title}
                    placeholder = 'Ingrese el nombre de su receta'
                    onChange = {handleInput}
                />
                {errors.title?<p className = "danger">{errors.title}</p>:null}
            </div>            
            <div>
                <label>Summary:</label>
                <input type="textarea"
                    name="summary"
                    className="textarea"
                    value={input.summary} 
                    placeholder = 'Escribe un breve resumen de su plato'   
                    onChange = {handleInput}
                />
                {errors.summary?<p className="danger">{errors.summary}</p>:null}
            </div>
            <div>
                <label>HealthScore:</label>
                <input type="number" 
                    name="healthScore"
                    className="healthScore"
                    value={input.healthScore}
                    placeholder='Nivel de comida saludable de su plato'
                    onChange = {handleInput}
                />
                {errors.healthScore?<p className="danger">{errors.healthScore}</p>:null}
            </div>
            <div>
                <label>Steps:</label>
                <input type="textarea"
                    name="steps"
                    className="textarea"
                    value={input.steps}
                    placeholder = 'Pasos de su receta'
                    onChange = {handleInput}
                />
            </div>
            <div>
                <label>Diets</label>
                <select name="diets" onChange = {handleSelect}>
                    <option selected value="" hidden>Choice Diets</option>
                    {diets&&diets.map(el=><option key={el} value={el}>{el}</option>)}
                </select>
                <ul>
                    <li>
                    {input.diets&&input.diets.map(el=>
                        <>
                            <p>{el}</p>
                            <button value={el} onClick={deleteDiets}>X</button>  
                        </>
                        )}                    
                    </li>    
                </ul>
            </div>         
            <button type="submit" onClick = {handleSubmit}>CREATE</button>
        </form>
 */}        </>
    )
}



