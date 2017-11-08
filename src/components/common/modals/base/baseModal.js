import React from 'react';
import 'semantic-ui/dist/components/modal.min.js';
import 'semantic-ui/dist/components/dimmer.min.js';
import 'semantic-ui/dist/components/transition.min.js';

import Loader from '../../loader';

// TODO switch to portal implementation
// https://github.com/ryanflorence/react-training/blob/gh-pages/lessons/05-wrapping-dom-libs.md#portals
class BaseModal extends React.Component {

  constructor(props) {
    super(props);
    this.onOkButtonClick = this.onOkButtonClick.bind(this);
  }

  componentWillReceiveProps(props) {
    !this.props.show && props.show && this.activateModal();
    this.props.show && !props.show && this.closeModal();
  }

  closeModal() {
     window.$(this.modal).modal('hide');
  }
  activateModal() {
    const $modal = window.$(this.modal);
    $modal.modal({
        closable: false,
        onHide: () => {
          this.props.onFormClose()
    		}
     })
     .modal('show');

  }
  onOkButtonClick() {
    if(!this.props.saving) {
      this.props.onFormSave && this.props.onFormSave();
    //  window.$(this.modal).modal('hide');
    }
  }
  render() {
    const { children } = this.props;
    const buttonsClass = this.props.saving ? 'disabled' : '';
    const saveButtonClass = (typeof this.props.valid !== 'undefined' && !this.props.valid) ? 'disabled' : '';
    return (
      <div ref={(modal) => { this.modal = modal; }} className={`ui modal ${this.props.modalClassNames || ''}`}>

        {!this.props.saving && <i className="close icon"></i>}

        <ModalHeader message={this.props.title} />

        <div className="content" style={{position:'relative'}}>
          {this.props.saving && <Loader message="Please wait" />}
          {children}
        </div>

        <div className="actions">

          <div className={`ui grey deny button ${buttonsClass}`}>
            {this.props.koLabel || 'Cancel'}
          </div>
          <div onClick={this.onOkButtonClick} className={`ui teal right labeled icon button ${buttonsClass} ${saveButtonClass}`}>
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


export default BaseModal;
