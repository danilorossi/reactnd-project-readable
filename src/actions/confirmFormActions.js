import * as types from './types';
// import PostApi from '../api/mock/postApi';

// export function startEditPost(postData) {
//   return {
//     type: types.START_EDIT_POST,
//     postData
//   };
// }
export function showConfirmModal(data) {
  return { type: types.SHOW_CONFIRM_MODAL, data };
}
export function hideConfirmModal() {
  return { type: types.HIDE_CONFIRM_MODAL };
}



// THUNKs
// export function editPost(postData) {
//   return function(dispatch) {
//     dispatch(startEditPost(postData));
//   };
// }
export function showConfirm(data) {
  return function(dispatch) {
    dispatch(showConfirmModal(data));
  };
}
export function hideConfirm() {
  return function(dispatch) {
    dispatch(hideConfirmModal());
  };
}
