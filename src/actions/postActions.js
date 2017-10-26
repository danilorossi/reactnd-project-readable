import * as types from './types';
import PostApi from '../api/mock/postApi';


function loadPostsByCategorySuccess(category, posts) {
  return { type: types.LOAD_POSTS_SUCCESS, category, posts };
}
function beginVotePost(postId) {
  return { type: types.BEGIN_VOTE_POST, postId };
}
function endVotePost(postId) {
  return { type: types.END_VOTE_POST, postId };
}
function votePostSuccess(post) {
  return { type: types.VOTE_POST_SUCCESS, post };
}
function startEditPost(postData) {
  return { type: types.START_EDIT_POST, postData };
}
function startCreatePost() {
  return { type: types.START_CREATE_POST };
}
function cancelFormPost() {
  return { type: types.CANCEL_FORM_POST };
}

export function showDeletePostModal(post, redirectTo) {
  return { type: types.SHOW_DELETE_POST_MODAL, post, redirectTo };
}
export function hideDeletePostModal() {
  return { type: types.HIDE_DELETE_POST_MODAL };
}

function startDeletingPost(post) {
  return { type: types.START_DELETING_POST, post };
}
function deletePostSuccess(post) {
  return { type: types.DELETE_POST_SUCCESS, post };
}
function endDeletingPost(post) {
  return { type: types.END_DELETING_POST, post };
}

// THUNKs

export function deletePost(post) {
  return function(dispatch) {
    dispatch(startDeletingPost(post));
    PostApi
      .deletePost(post)
        .then(({ post }) => dispatch(deletePostSuccess(post)))
        .then(() => dispatch(endDeletingPost(post)))
        .then(() => dispatch(hideDeletePostModal()))
        .catch(error => {
            throw(error);
        });
  };
}



export function loadPostsByCategory(category = 'all') {
    return function(dispatch) {
      const postsPromise = category === 'all' ? PostApi.getAllPosts() : /* TODO */ PostApi.getPostsByCategory(category);
      postsPromise.then(result => {
          dispatch(loadPostsByCategorySuccess(category, result));
      }).catch(error => {
          throw(error);
      });

    };
}

export function voteUp(postId) {
  return function(dispatch) {
    dispatch(beginVotePost(postId));
    PostApi
      .votePostUp(postId)
        .then(({ post }) => dispatch(votePostSuccess(post)))
        .then(() => dispatch(endVotePost(postId)))
        .catch(error => {
            throw(error);
        });
  };
}

export function voteDown(postId) {
  return function(dispatch) {
    dispatch(beginVotePost(postId));
    PostApi
      .votePostDown(postId)
        .then(({ post }) => dispatch(votePostSuccess(post)))
        .then(() => dispatch(endVotePost(postId)))
        .catch(error => {
            throw(error);
        });
  };
}

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
