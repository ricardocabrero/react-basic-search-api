import React, { Component } from 'react';

import './App.css';
import 'bulma/css/bulma.css'

import { Switch, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { Detail } from './pages/Detail'
import { Results } from './pages/Results'
import { NotFound } from './pages/NotFound'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/detail/:movieId' component={Detail}/>
          <Route path='/results' component={Results}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    )
  }
}

export default App;
