import React from 'react';
import { connect } from 'react-redux';
import { closePostForm, publishPost, postFormUpdated } from '../../../actions/postActions';

import BaseModal from './base/baseModal';
import TextField from '../forms/textField';
import TextAreaField from '../forms/textAreaField';
import SelectField from '../forms/selectField';

class PostModal extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.saveForm = this.saveForm.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.props.updateFormData(name, value);
  }

  saveForm() {
    const { valid, data } = this.props;
    // Button will be disabled anyway
    valid && this.props.savePost(data);
  }

  render() {
    const {
      show,
      closeForm,
      categories,
      valid,
      data,
      saving
    } = this.props;

    const errors = this.props.errors || {};

    return (
      <BaseModal
        title={data.id ? 'Edit post' : 'New post'}
        koLabel="Cancel"
        okLabel={data.id ? 'Save changes' : 'Publish'}
        show={show}
        saving={saving}
        onFormSave={this.saveForm}
        valid={valid}
        onFormClose={closeForm}>
        <div>

          <form className="ui form">
            <div className="two fields">

              <TextField
                title="Author*"
                placeholder="Your name"
                name="author"
                value={data.author}
                error={errors.author}
                onChangeHandler={this.handleChange}/>

              <SelectField
                title="Category*"
                name="category"
                classNames="categories search"
                value={data.category}
                error={errors.category}
                onChangeHandler={this.handleChange}>
                {categories.map(
                  (cat, i) => <option key={i} value={cat.path}>#{cat.name}</option>)
                }
              </SelectField>

            </div>

            <TextField
              title="Title*"
              placeholder="Post title"
              name="title"
              value={data.title}
              error={errors.title}
              onChangeHandler={this.handleChange}/>

            <TextAreaField
              title="Body*"
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
    closeForm: () => dispatch(closePostForm()),
    savePost: (post) => dispatch(publishPost(post)),
    updateFormData: (field, value) => dispatch(postFormUpdated(field, value))
  }
}
function mapStateToProps(state, ownProps) {
  return {
    categories: state.categories.list,
  };
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(PostModal);
