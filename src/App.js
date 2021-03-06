import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import createHistory from 'history/createBrowserHistory'

import configureStore from './store/configureStore';

import { loadCategories } from './actions/categoryActions';

import AppModals from './components/appModals';
import HomePage from './components/home/homePage';
import PostDetailsPage from './components/postDetails/postDetailsPage';
import ErrorPage from './ErrorPage';

const store = configureStore();

const history = createHistory()

store.dispatch(loadCategories());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>

            <Switch>
              <Route exact path="/not-found" component={ErrorPage} />
              <Route exact path='/:category/:postId' render={({match}) => <PostDetailsPage postId={match.params.postId}/>}/>
              <Route exact path='/' render={() => <Redirect to="/all"/>} />
              <Route exact path="/:category" component={HomePage} />
            </Switch>

            <AppModals />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
