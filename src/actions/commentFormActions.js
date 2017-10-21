import * as types from './types';
// import PostApi from '../api/mock/postApi';

// export function startEditPost(postData) {
//   return {
//     type: types.START_EDIT_POST,
//     postData
//   };
// }
export function startCreateComment() {
  return { type: types.START_CREATE_COMMENT };
}
export function cancelFormComment() {
  return { type: types.CANCEL_COMMENT_POST };
}



// THUNKs
// export function editPost(postData) {
//   return function(dispatch) {
//     dispatch(startEditPost(postData));
//   };
// }
export function createComment() {
  return function(dispatch) {
    dispatch(startCreateComment());
  };
}
export function closeCommentForm() {
  return function(dispatch) {
    dispatch(cancelFormComment());
  };
}
