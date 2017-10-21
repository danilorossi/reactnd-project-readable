import React from 'react';
import { PropTypes } from 'prop-types';
import 'semantic-ui/dist/components/modal.min.js';
import 'semantic-ui/dist/components/dimmer.min.js';
import 'semantic-ui/dist/components/transition.min.js';
import { connect } from 'react-redux';

// TODO switch to portal implementation
// https://github.com/ryanflorence/react-training/blob/gh-pages/lessons/05-wrapping-dom-libs.md#portals
class BaseModal extends React.Component {

  constructor(props) {
    super(props);
    this.onOkButtonClick = this.onOkButtonClick.bind(this);
  }

  componentWillReceiveProps(props) {
    props.show && this.activateModal();
  }

  activateModal() {
    const $modal = window.$(this.modal);
    $modal.modal('show');
    $modal.modal({
      onHide: () => {
        this.props.onFormClose()
  		}
    })
  }
  onOkButtonClick() {
    this.props.onFormSave();
    window.$(this.modal).modal('hide');
  }
  render() {

    return (
      <div ref={(modal) => { this.modal = modal; }} className={`ui modal ${this.props.modalClassNames || ''}`}>

        <i className="close icon"></i>

        <ModalHeader message={this.props.title} />
        <div className="content">
          {this.props.children}
        </div>

        <div className="actions">

          <div className="ui grey deny button">
            {this.props.koLabel || 'Cancel'}
          </div>
          <div onClick={this.onOkButtonClick} className="ui teal right labeled icon button">
            {this.props.okLabel || 'Save'}
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


export default connect (
  null,
  null
)(BaseModal);
