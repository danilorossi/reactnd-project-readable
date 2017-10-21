import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
  Route,
  Redirect
} from 'react-router-dom';

import HomePage from './components/home/homePage';
import PostDetailsPage from './components/postDetails/postDetailsPage';


import CommentModal from './components/common/commentModal';
import PostModal from './components/common/postModal';
import ConfirmModal from './components/common/confirmModal';

class AppWrapper extends Component {

  render() {
    return (
      <div>

        <div>
          <Route path='/post/:postId' render={({match}) => <PostDetailsPage postId={match.params.postId}/>}/>
          <Route exact path='/' render={() => <Redirect to="/posts/all"/>} />
          <Route path="/posts" component={HomePage} />
        </div>

        <CommentModal show={this.props.showCommentModal}/>
        <PostModal {...this.props.postModal}/>
        <ConfirmModal show={this.props.showConfirmModal} {...this.props.confirmDialogData}/>

      </div>
    );
  }

}


function mapStateToProps(state, ownProps) {
    return {
      showCommentModal: state.commentForm.visible,
      postModal: {
        show: state.postForm.visible,
        data: state.postForm.data || null
      },
      showConfirmModal: state.confirmForm.visible,
      confirmDialogData: state.confirmForm.data
    };
}

export default connect (
  mapStateToProps
)(AppWrapper);
