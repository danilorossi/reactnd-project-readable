import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { hideDeleteCommentModal } from '../../../actions/commentActions';

import ConfirmModal from './base/confirmModal';

class DeleteCommentModal extends React.Component {

  constructor(props) {
    super(props);
    this.deleteComment = this.deleteComment.bind(this);
  }

  deleteComment() {
    console.log('DELETE COMMENT ID ', this.props.commentId);
  }

  render() {
    return (
      <ConfirmModal
        onConfirm={this.deleteComment}
        onCloseForm={this.props.hideModal}
        show={this.props.show}
        title="DELETE COMMENT"
        message="Are you sure you want to delete this comment?"/>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    hideModal: () => dispatch(hideDeleteCommentModal()),
  }
}

export default connect (
  null,
  mapDispatchToProps
)(DeleteCommentModal);
// export default DeleteCommentModal;
