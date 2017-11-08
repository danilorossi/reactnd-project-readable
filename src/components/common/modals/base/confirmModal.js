import React from 'react';

import BaseModal from './baseModal';

const ConfirmModal = ({ title, show, saving, onConfirm, onCloseForm, message }) => {

  return (
    <BaseModal
      title={title}
      koLabel="No"
      okLabel="Yes"
      show={show}
      saving={saving}
      onFormSave={onConfirm}
      onFormClose={onCloseForm}
      modalClassNames="mini"
    >
      <br/>
      <p>{message}</p>
      <br/>
    </BaseModal>
  );

}

export default ConfirmModal;
