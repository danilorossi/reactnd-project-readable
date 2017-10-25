import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import CommentModal from './common/modals/commentModal';
import PostModal from './common/modals/postModal';
import DeletePostModal from './common/modals/deletePostModal';
import DeleteCommentModal from './common/modals/deleteCommentModal';

class AppModals extends Component {

  render() {

    const {
      postModal,
      commentModal,
      deletePostModal,
      deleteCommentModal
    } = this.props;

    return (
      <div>

        <CommentModal
          show={commentModal.visible}
          data={commentModal.data}
          saving={commentModal.saving}
        />

        <PostModal
          show={postModal.visible}
          data={postModal.data}
          saving={postModal.saving}
        />

        <DeletePostModal
          show={deletePostModal.visible}
          post={deletePostModal.data.post}
          saving={deletePostModal.saving}
        />

        <DeleteCommentModal
          show={deleteCommentModal.visible}
          comment={deleteCommentModal.data.comment}
          saving={deleteCommentModal.saving}
        />
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {
    postModal: {
      ...state.modals.post,
      saving: state.ajaxStatus.savingPost
    },
    commentModal: {
      ...state.modals.comment,
      saving: state.ajaxStatus.savingComment
    },
    deletePostModal: {
      ...state.modals.deletePost,
      saving: state.ajaxStatus.deletingPost
    },
    deleteCommentModal: {
      ...state.modals.deleteComment,
      saving: state.ajaxStatus.deletingComment
    },

  };
}

export default connect (
  mapStateToProps
)(AppModals);
