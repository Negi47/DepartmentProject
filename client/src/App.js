import React, { Component } from 'react';
import Signup from './components/Auth/Signup'
import Header from './components/Header/Header'
import TeachingDiary from './components/Modules/TeachingDiary';
import {Route, Switch} from 'react-router-dom';
import Login from './components/Auth/Login';
import TeachingTiming from './components/Modules/TeachingTiming';
import { AuthContext } from './Context/Context';
import SelectDepartment from './components/Modules/SelectDepartment';
import Home from './components/Auth/Home';
import Fortnightly from './components/Modules/Fortnightly';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      isSession: sessionStorage.getItem('username') ? true : false,
      selected_dept: null
    }
  }

  


  handleSessionUpdate = () => {
    this.setState({isSession: true})
  }

  removeSession = () => this.setState({isSession: false})


  changeDept = (d) => {
    this.setState({selected_dept: d})
  }

  render() {   


    return (
      <AuthContext.Provider value={{
        isSession: this.state.isSession,
        handleSessionUpdate: this.handleSessionUpdate,
        removeSession: this.removeSession,
        changeDept: this.changeDept,
        selected_dept: this.state.selected_dept,
        history: this.props.history
      }}>
        <div>
          <Header removeSession={this.removeSession} history={this.props.history} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} /> 
            <Route path="/selectdepartment" exact component={SelectDepartment} />
            <Route path="/teaching" exact component={TeachingDiary} />
            <Route path="/teachingtiming" exact component={TeachingTiming} />
            <Route path="/fortnightly" exact component={Fortnightly} />
          </Switch>
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
