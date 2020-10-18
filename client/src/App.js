import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/Profile';
import Home from './components/Home';
import EditProfile from './components/EditProfile';
import CreateProfile from './components/CreateProfile';
import { loadUser } from './actions/auth';
import setAuthToken from './setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}


const App = () => { 
  
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path= '/' component ={Landing} />
        <Switch>
          <Route exact path = '/register' component = {Register} />
          <Route exact path = '/login' component = {Login} />
          <PrivateRoute exact path = '/home' component = {Home} />
          <PrivateRoute exact path = '/create-profile' component = {CreateProfile} />
          <PrivateRoute exact path = '/edit-profile' component = {EditProfile} />
          <PrivateRoute exact path = '/profile' component = {Profile} />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
)};

export default App;
