import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
// import { hideConfirmModal } from '../../actions/confirmFormActions';

import BaseModal from './baseModal';

class ConfirmModal extends React.Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <BaseModal
        title={this.props.title}
        koLabel="No"
        okLabel="Yes"
        show={this.props.show}
        redirectTo={this.props.redirectTo}
        saving={this.props.saving}
        onFormSave={this.props.onConfirm}
        onFormClose={this.props.onCloseForm}
        modalClassNames="mini"
      >
        <br/>
        <p>{this.props.message}</p>
        <br/>
      </BaseModal>
    );
  }

}

// function mapDispatchToProps (dispatch) {
//   return {
//     closeForm: () => dispatch(hideConfirmModal())
//   }
// }
//
// export default connect (
//   null,
//   mapDispatchToProps
// )(ConfirmModal);

export default ConfirmModal;
