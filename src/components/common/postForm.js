import React from 'react';
import { PropTypes } from 'prop-types';
import 'semantic-ui/dist/components/modal.min.js';
import 'semantic-ui/dist/components/dimmer.min.js';
import 'semantic-ui/dist/components/transition.min.js';
import { connect } from 'react-redux';
import { closePostForm } from '../../actions/postFormActions';

// TODO switch to portal implementation
// https://github.com/ryanflorence/react-training/blob/gh-pages/lessons/05-wrapping-dom-libs.md#portals
class PostForm extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }
  componentWillReceiveProps(props) {
    props.show && console.log('PostForm modal componentWillReceiveProps: ', props);
    props.show && this.activateModal();
  }

  activateModal() {
    const $modal = window.$(this.modal);
    $modal.modal('show');
    $modal.modal({
      onHide: () => {
        this.props.closePostForm()
  		}
    })
  }

  render() {
    const postData = this.props.data;
    return (
      <div ref={(modal) => { this.modal = modal; }} className="ui modal">

        <i className="close icon"></i>

        <ModalHeader message={postData.id ? 'Edit post' : 'New post'} />

        <PostInnerForm data={postData} />

        <div className="actions">
          <div className="ui red deny button">
            Cancel
          </div>
          <div className="ui teal right labeled icon button">
            Save
            <i className="checkmark icon"></i>
          </div>
        </div>

      </div>
    );
  }

}

const ModalHeader = ({ message }) => {
  return (
    <div className="header">
      <span>{message}</span>
    </div>
  );
}

const PostInnerForm = ({ data }) => {
  return (
    <div className="content">

      <p>{data.body}</p>
      <div className="description">
         <p>{data.body}</p>
      </div>

    </div>
  );
}

function mapDispatchToProps (dispatch) {
  return {
    closePostForm: () => dispatch(closePostForm())
  }
}

export default connect (
  null,
  mapDispatchToProps
)(PostForm);
// export default PostForm;
