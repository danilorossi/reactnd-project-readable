import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { hideDeletePostModal, deletePost } from '../../../actions/postActions';

import ConfirmModal from './base/confirmModal';

class DeletePostModal extends React.Component {

  constructor(props) {
    super(props);
    this.showDeletePostModal = this.showDeletePostModal.bind(this);
  }

  showDeletePostModal() {
    this.props.startDeletePost(this.props.post);
    this.props.redirectTo && this.props.history.replace(this.props.redirectTo);
  }

  render() {
    return (
      <ConfirmModal
        onConfirm={this.showDeletePostModal}
        onCloseForm={this.props.hideModal}
        show={this.props.show}
        saving={this.props.saving}
        title="DELETE POST"
        message="Are you sure you want to delete this post?"/>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    hideModal: () => dispatch(hideDeletePostModal()),
    startDeletePost: (post) => dispatch(deletePost(post)),
  }
}

export default connect (
  null,
  mapDispatchToProps
)(withRouter(DeletePostModal));
// export default DeletePostModal;
