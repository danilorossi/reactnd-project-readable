import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

import { loadCategories } from './actions/categoryActions';
import { loadPostsByCategory } from './actions/postActions';
import configureStore from './store/configureStore';

import HomePage from './components/home/homePage';

const store = configureStore();

store.dispatch(loadCategories());
store.dispatch(loadPostsByCategory('all'));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route path='/new-post' render={() => <h3>FORM</h3>} />
            <Route path='/post/:postId' render={({match}) => <h3>POST {match.params.postId} DETAILS</h3>} />
            <Route exact path='/' render={() => <Redirect to="/posts/all"/>} />
            <Route path="/posts" component={HomePage} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
