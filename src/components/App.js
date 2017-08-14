import React, { Component } from 'react';

import ProjectSummary from './ProjectSummary';
import AddEditProject from './AddEditProject';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row jumbotron">
          <h1>Abhay Talreja!</h1>
          <p>Welcome to the project management app, get started by creating a project</p>

        </div>
        <div className="row">
          <Router>
            <Switch>
              <Route exact path='/' component={ProjectSummary} />
              <Route path='/addEdit/:id?' component={AddEditProject} /> 
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
