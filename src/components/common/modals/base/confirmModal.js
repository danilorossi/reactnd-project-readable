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
        onFormSave={this.props.onConfirm}
        onFormClose={this.props.onCloseForm}
        modalClassNames="mini"
      >
        <p>{this.props.message}</p>
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
