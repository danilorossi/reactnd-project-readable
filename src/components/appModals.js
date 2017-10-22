import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import CommentModal from './common/modals/commentModal';
import PostModal from './common/modals/postModal';
import DeletePostModal from './common/modals/deletePostModal';
import DeleteCommentModal from './common/modals/deleteCommentModal';

class AppModals extends Component {

  render() {
    const { postModal, commentModal, deletePostModal, deleteCommentModal } = this.props;
    return (
      <div>
        <CommentModal commentModal={postModal.visible} commentModal={postModal.data}/>
        <PostModal show={postModal.visible} data={postModal.data}/>
        <DeletePostModal show={deletePostModal.visible} postId={deletePostModal.data.postId}/>
        <DeleteCommentModal show={deleteCommentModal.visible} commentId={deleteCommentModal.data.commentId}/>
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {
    postModal: state.modals.post,
    commentModal: state.modals.comment,
    deletePostModal: state.modals.deletePost,
    deleteCommentModal: state.modals.deleteComment,
  };
}

export default connect (
  mapStateToProps
)(AppModals);
