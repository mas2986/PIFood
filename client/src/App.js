import React from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Detail from './components/Detail';
import CreateFood from './components/CreateFood';
import Error from './components/Error';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route path='/search' render={(location)=><Home location={location}/>}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/detail/:id' render={(match)=><Detail match={match}/>}/>
      <Route exact path='/create' component={CreateFood}/>
      {/* <Route exact path='edit/:id' render={(match)=><CreateFood match={match}/>}/> */}
      {/* <Route path='/*' component={Error}/>       */}
    </div>
  );
}

export default App;
