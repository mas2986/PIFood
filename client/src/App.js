import React from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Henry Food</h1>
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/home' component={Home}/>
    </div>
  );
}

export default App;
