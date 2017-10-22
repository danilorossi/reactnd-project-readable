import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { closeCommentForm } from '../../../actions/commentActions';

import BaseModal from './base/baseModal';

class CommentModal extends React.Component {

  state = {
    formData: {}
  }

  constructor(props) {
    super(props);
    this.saveForm = this.saveForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  saveForm() {
    console.log('saving comment form');
  }
  handleChange(event) {
    this.setState({
      ...this.state,
      formData: {
        ...this.state.formData,
        [event.target.name]: event.target.value
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      formData: {...nextProps.data}
    });
  }

  render() {
    const { formData } = this.state;
    return (
      <BaseModal
        title="Edit comment"
        koLabel="Cancel"
        okLabel="Save changes"
        show={this.props.show}
        onFormSave={this.saveForm}
        onFormClose={this.props.closeForm}>
        <div>
          <pre style={{fontSize:'8px'}}>{JSON.stringify(formData, null, 2)}</pre>
          <form className="ui form">
            <div className="field">
              <label>Author</label>
              <input onChange={this.handleChange} value={formData.author} type="text" name="author" placeholder="..."/>
            </div>
            <div className="field">
              <label>Comment</label>
              <textarea onChange={this.handleChange} name="body" value={formData.body} placeholder="..." rows="4"></textarea>
            </div>
          </form>
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
