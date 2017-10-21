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

import './App.css';

import { loadCategories } from './actions/categoryActions';

import HomePage from './components/home/homePage';
import PostDetailsPage from './components/postDetails/postDetailsPage';

import CommentModal from './components/common/commentModal';
import PostModal from './components/common/postModal';
import ConfirmModal from './components/common/confirmModal';

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
              <Route path='/:category/:postId' render={({match}) => <PostDetailsPage postId={match.params.postId}/>}/>
              <Route exact path='/' render={() => <Redirect to="/all"/>} />
              <Route path="/:category" component={HomePage} />
            </Switch>

            <CommentModal show={this.props.showCommentModal}/>
            <PostModal {...this.props.postModal}/>
            <ConfirmModal show={this.props.showConfirmModal} {...this.props.confirmDialogData}/>

          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
