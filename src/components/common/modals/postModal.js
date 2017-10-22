import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { closePostForm } from '../../../actions/postActions';
import 'semantic-ui/dist/components/dropdown.min.js';

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
  componentDidMount() {
    window.$(this.dropdown).dropdown();
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
    console.log('saving post form');
  }

  render() {
    const { show, closeForm, categories } = this.props;
    const { formData } = this.state;

    console.warn('TODO select preselect category');

    return (
      <BaseModal
        title={formData.id ? 'Edit post' : 'New post'}
        koLabel="Cancel"
        okLabel={formData.id ? 'Save changes' : 'Publish'}
        show={show}
        onFormSave={this.saveForm}
        onFormClose={closeForm}>
        <div>
          <pre style={{fontSize:'8px'}}>{JSON.stringify(formData, null, 2)}</pre>
          <form className="ui form">
            <div className="two fields">
              <div className="field">
                <label>Your name</label>
                <input onChange={this.handleChange} value={formData.author} type="text" name="author" placeholder="Don't be shy..."/>
              </div>
              <div className="field">
                <label>Category</label>
                  <select
                    value={formData.category}
                    name="category"
                    onChange={this.handleChange}
                    ref={(dropdown) => { this.dropdown = dropdown; }}
                    className="ui categories search dropdown">
                    {categories.map((cat, i) => <option key={i} value={cat.path}>#{cat.name}</option>)}
                  </select>
              </div>
            </div>
            <div className="field">
              <label>Title</label>
              <input onChange={this.handleChange} value={formData.title} type="text" name="title" placeholder="Awesome title for your awesome post!"/>
            </div>
            <div className="field">
              <label>Text</label>
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
    closeForm: () => dispatch(closePostForm())
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
