import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { closeCommentForm } from '../../../actions/commentActions';

import BaseModal from './base/baseModal';

class CommentModal extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <BaseModal
        title="Comment modal"
        koLabel="Cancel"
        okLabel="Save comment"
        show={this.props.show}
        onFormClose={this.props.closeForm}>
        <div>
          <pre>{this.props.toString()}</pre>
        </div>
      </BaseModal>
    );
  }

}

function mapDispatchToProps (dispatch) {
  return {
    closeForm: () => dispatch(closeCommentForm())
  }
}

export default connect (
  null,
  mapDispatchToProps
)(CommentModal);
