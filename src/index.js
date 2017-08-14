import styles from './scss/index.scss';
import createSagaMiddleware from 'redux-saga';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import MainLayout from './layouts/MainLayout/MainLayout';
import { Authentication } from './layouts/Authentication/Authentication';
import rootSaga from './sagas/index';
import DeviceList from './pages/DeviceList/DeviceList';
import DevicePage from './pages/DevicePage/DevicePage';
import Builder from './pages/Builder/Builder';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import LocationList from './pages/LocationList/LocationList';
import { NotFound } from './components/NotFound/NotFound';
import { config } from './config/config';
import AsyncComponent from './components/AsyncComponent/AsyncComponent';
import Register from './pages/Register/Register';

// import Login from './pages/Login/Login';

export const ws = new WebSocket(`ws://${config.origin}/`);

const composeEnhancers = config.isProd ?
  compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeEnhancers(),
  applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);


const Login = AsyncComponent(() => import('./pages/Login/Login'));


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/auth' component={() => (
          <Authentication>
            <Switch>
              <Route
                exact path='/auth'
                component={Login} />
              <Route
                exact path='/auth/login'
                component={Login} />
              <Route
                exact path='/auth/register'
                component={Register} />
            </Switch>
          </Authentication>
        )} />
        <Route path='/' component={(props) => (
          <MainLayout history={props.history}>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/devices/device/:id' component={DevicePage} />
              <Route exact path='/devices' component={DeviceList} />
              <Route path='/devices/:location' component={LocationList} />
              <Route path='/builder' component={Builder} />
              <Route exact path='/user' component={Profile} />
              <Route path='/device/edit/:id' component={Builder} />
              <Route component={NotFound}/>
            </Switch>
          </MainLayout>
        )} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
