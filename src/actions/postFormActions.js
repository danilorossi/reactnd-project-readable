import * as types from './types';

export function startEditPost(postData) {
  return {
    type: types.START_EDIT_POST,
    postData
  };
}

export function startCreatePost() {
  return { type: types.START_CREATE_POST };
}

export function cancelFormPost() {
  return { type: types.CANCEL_FORM_POST };
}



// THUNKs
export function editPost(postData) {
  return function(dispatch) {
    dispatch(startEditPost(postData));
  };
}
export function createPost() {
  return function(dispatch) {
    dispatch(startCreatePost());
  };
}

export function closePostForm() {
  return function(dispatch) {
    dispatch(cancelFormPost());
  };
}
