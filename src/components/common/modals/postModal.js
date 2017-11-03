import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { closePostForm, publishPost } from '../../../actions/postActions';

import BaseModal from './base/baseModal';

class PostModal extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.saveForm = this.saveForm.bind(this);
  }
  state = {
    formData: {}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      formData: {...nextProps.data}
    });
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

  saveForm() {
    const { formData } = this.state;
    this.props.savePost(formData);
  }

  render() {
    const { show, closeForm, categories } = this.props;
    const { formData } = this.state;

    return (
      <BaseModal
        title={formData.id ? 'Edit post' : 'New post'}
        koLabel="Cancel"
        okLabel={formData.id ? 'Save changes' : 'Publish'}
        show={show}
        saving={this.props.saving}
        onFormSave={this.saveForm}
        onFormClose={closeForm}>
        <div>

          <form className="ui form">
            <div className="two fields">
              <div className="field">
                <label>Author*</label>
                <input onChange={this.handleChange} value={formData.author} type="text" name="author" placeholder="Your name"/>
              </div>
              <div className="field">

                <label>Category*</label>
                  <select
                    value={formData.category}
                    name="category"
                    onChange={this.handleChange}
                    ref={(dropdown) => { this.dropdown = dropdown; }}
                    className="ui categories search dropdown">
                    {categories.map(
                      (cat, i) => <option key={i} value={cat.path}>#{cat.name}</option>)
                    }
                  </select>
              </div>
            </div>
            <div className="field">
              <label>Title*</label>
              <input onChange={this.handleChange} value={formData.title} type="text" name="title" placeholder="Awesome title for your awesome post!"/>
            </div>
            <div className="field">
              <label>Text*</label>
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
    closeForm: () => dispatch(closePostForm()),
    savePost: (post) => dispatch(publishPost(post)),
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
