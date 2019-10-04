import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from "./component/layout/Navbar";
import Dashboard from "./component/layout/Dashboard";
import Pokemon from './component/pokemon/Pokemon';

import backgroundImage from './pokePatternMiniM.jpg'


 class App extends Component {
  render() {
    return (
      <Router>
          <div className="App" style={{ background: `url(${backgroundImage})`}}>
            <NavBar />
            <div className="container-fluid">
              <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route exact path="/pokemon/:pokemonIndex" component={Pokemon}/>
              </Switch>
            </div>
          </div>
      </Router>

    )
  }
}



export default App;
