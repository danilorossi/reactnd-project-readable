import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { closeCommentForm } from '../../../actions/commentActions';

import BaseModal from './base/baseModal';

class CommentModal extends React.Component {

  constructor(props) {
    super(props);
    this.saveForm = this.saveForm.bind(this);
  }
  saveForm() {
    console.log('saving comment form');
  }

  render() {
    return (
      <BaseModal
        title="Edit comment"
        koLabel="Cancel"
        okLabel="Save changes"
        show={this.props.show}
        onFormSave={this.saveForm}
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
