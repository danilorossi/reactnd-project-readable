import React, { Component } from 'react';
import uuid from 'js-uuid';
import { connect } from 'react-redux';

import Loader from '../../components/common/loader';

import TextField from '../../components/common/forms/textField';
import TextAreaField from '../../components/common/forms/textAreaField';

import { startCreateComment, publishComment, commentFormUpdated } from '../../actions/commentActions';

class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.saveComment = this.saveComment.bind(this);
  }

  componentDidMount() {
    this.props.initForm(this.props.parentId);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.props.updateFormData(name, value);
  }

  saveComment() {

    const { valid, data } = this.props.commentForm;
    // Button will be disabled anyway
    valid && this.props.publishNewComment(data);
  }

  render() {

    const {
      show,
      closeForm,
      valid,
      data,
      saving
    } = this.props.commentForm;

    const errors = this.props.commentForm.errors || {};

    const publishButtonClass = saving || !valid ? 'disabled' : '';

    return (
      <div>
        <h4 className="ui dividing header"></h4>
        <form className="ui reply form">

            {saving && <Loader message="Publishing comment..." />}
            {!saving &&
              <div>

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

                <div onClick={this.saveComment} className={`fluid ui basic teal button ${publishButtonClass}`}>
                  Publish
                </div>
              </div>
            }



        </form>

      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    commentForm: {
      ...state.modals.comment,
      saving: state.ajaxStatus.savingComment
    },
  };
}

function mapDispatchToProps (dispatch) {
  return {
    initForm: (parentId) => dispatch(startCreateComment(parentId)),
    publishNewComment: (comment) => dispatch(publishComment(comment)),
    updateFormData: (field, value) => dispatch(commentFormUpdated(field, value))
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
