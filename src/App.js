import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory'

import './App.css';

import { loadCategories } from './actions/categoryActions';

import configureStore from './store/configureStore';

import AppWrapper from './appWrapper';

const store = configureStore();


const history = createHistory()

store.dispatch(loadCategories());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <AppWrapper />
        </Router>
      </Provider>
    );
  }
}

export default App;
