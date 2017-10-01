import React, { Component } from 'react';
import {
  Router,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory'

import './App.css';

import { loadCategories } from './actions/categoryActions';

import configureStore from './store/configureStore';

import HomePage from './components/home/homePage';
import PostDetailsPage from './components/postDetails/postDetailsPage';

const store = configureStore();


const history = createHistory()

store.dispatch(loadCategories());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            {/*<Route exact path='/manage/:postId' render={({match}) => <h3>FORM for post {match.params.postId}</h3>} />*/}
            {/*<Route path='/post/:postId' render={({match}) => <h3>POST {match.params.postId} DETAILS</h3>} />*/}
            <Route path='/post/:postId'  render={({match}) => <PostDetailsPage postId={match.params.postId}/>}/>
            <Route exact path='/' render={() => <Redirect to="/posts/all"/>} />
            {/*<Route path="/posts" component={withRouter(HomePage)} />*/}
            <Route path="/posts" component={HomePage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
