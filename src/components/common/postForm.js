import React from 'react';
import { PropTypes } from 'prop-types';
import 'semantic-ui/dist/components/modal.min.js';
import 'semantic-ui/dist/components/dimmer.min.js';
import 'semantic-ui/dist/components/transition.min.js';
import { connect } from 'react-redux';
import { closePostForm } from '../../actions/postFormActions';

// https://github.com/ryanflorence/react-training/blob/gh-pages/lessons/05-wrapping-dom-libs.md#portals
class PostForm extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    var modal = window.$(this.modal).modal('show');
    window.$(this.modal).modal({
      onHide: () => {
        // this.props.closePostForm()
  		}
    })
  }

  render() {

    return (
      <div ref={(modal) => { this.modal = modal; }} className="ui modal">
        <i className="close icon"></i>
        <div className="header">
          Profile Picture
        </div>
        <div className="content">
          <div className="ui medium image">
            <img src="/images/avatar/large/chris.jpg" />
          </div>
          <div className="description">
            <div className="ui header">We have auto-chosen a profile image for you.</div>
            <p>We have grabbed the following image from the <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your registered e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </div>
        </div>
        <div className="actions">
          <div className="ui black deny button">
            Nope
          </div>
          <div className="ui positive right labeled icon button">
            Yep, that is me
            <i className="checkmark icon"></i>
          </div>
        </div>
      </div>
    );
  }

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
