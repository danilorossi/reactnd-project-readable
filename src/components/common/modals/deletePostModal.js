import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { hideDeletePostModal } from '../../../actions/postActions';

import ConfirmModal from './base/confirmModal';

class DeletePostModal extends React.Component {

  constructor(props) {
    super(props);
    this.deletePost = this.deletePost.bind(this);
  }

  deletePost() {
    console.log('DELETE POST ID ', this.props.postId);
  }

  render() {
    return (
      <ConfirmModal
        onConfirm={this.deletePost}
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
  }
}

export default connect (
  null,
  mapDispatchToProps
)(DeletePostModal);
// export default DeletePostModal;
