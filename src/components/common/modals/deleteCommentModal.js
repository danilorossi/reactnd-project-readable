import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { hideDeleteCommentModal, deleteComment } from '../../../actions/commentActions';

import ConfirmModal from './base/confirmModal';

class DeleteCommentModal extends React.Component {

  constructor(props) {
    super(props);
    this.showDeleteCommentModal = this.showDeleteCommentModal.bind(this);
  }

  showDeleteCommentModal() {
    this.props.startDeleteComment(this.props.comment)
  }

  render() {
    return (
      <ConfirmModal
        onConfirm={this.showDeleteCommentModal}
        onCloseForm={this.props.hideModal}
        show={this.props.show}
        saving={this.props.saving}
        title="DELETE COMMENT"
        message="Are you sure you want to delete this comment?"/>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    hideModal: () => dispatch(hideDeleteCommentModal()),
    startDeleteComment: (comment) => dispatch(deleteComment(comment)),
  }
}

export default connect (
  null,
  mapDispatchToProps
)(DeleteCommentModal);
// export default DeleteCommentModal;
