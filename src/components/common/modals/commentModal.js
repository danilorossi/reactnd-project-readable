import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { closeCommentForm, publishComment, commentFormUpdated } from '../../../actions/commentActions';

import BaseModal from './base/baseModal';
import TextField from '../forms/textField';
import TextAreaField from '../forms/textAreaField';

class CommentModal extends React.Component {

  constructor(props) {
    super(props);
    this.saveForm = this.saveForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  saveForm() {
    const { valid, data } = this.props;
    // Button will be disabled anyway
    valid && this.props.saveComment(data);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.props.updateFormData(name, value);
  }

  render() {

    const {
      show,
      closeForm,
      valid,
      data,
      saving
    } = this.props;

    const errors = this.props.errors || {};

    return (
      <BaseModal
        title="Edit comment"
        koLabel="Cancel"
        okLabel="Save changes"
        show={show}
        saving={saving}
        valid={valid}
        onFormSave={this.saveForm}
        onFormClose={closeForm}>
        <div>

          <form className="ui form">

            <TextField
              title="Author*"
              placeholder="Your name"
              name="author"
              value={data.author}
              error={errors.author}
              onChangeHandler={this.handleChange}/>

            <TextAreaField
              title="Comment*"
              placeholder="..."
              name="body"
              value={data.body}
              error={errors.body}
              onChangeHandler={this.handleChange}/>

          </form>
          
        </div>
      </BaseModal>
    );
  }

}

function mapDispatchToProps (dispatch) {
  return {
    closeForm: () => dispatch(closeCommentForm()),
    saveComment: (comment) => dispatch(publishComment(comment)),
    updateFormData: (field, value) => dispatch(commentFormUpdated(field, value))
  }
}
function mapStateToProps(state, ownProps) {
  return {
  };
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(CommentModal);
