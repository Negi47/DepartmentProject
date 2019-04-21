import React, { Component } from 'react';
import Signup from './components/Auth/Signup'
import Header from './components/Header/Header'
import TeachingDiary from './components/Modules/TeachingDiary';
import {Route, Switch} from 'react-router-dom'
import Login from './components/Auth/Login'
import TeachingTiming from './components/Modules/TeachingTiming';


class App extends Component {

  state = {
    email: '',
    password: ''
  }

  render() {     
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} /> 
          <Route path="/teaching" exact component={TeachingDiary} />
          <Route path="/teachingtiming" exact component={TeachingTiming} />
        </Switch>
      </div>
    );
  }
}

export default App;
