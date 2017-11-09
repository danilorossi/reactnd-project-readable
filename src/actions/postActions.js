import * as types from './types';
import PostApi from '../api/postApi';

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
function startSavingPost(postId) {
  return { type: types.START_SAVING_POST, postId };
}
function savingPostSuccess(post) {
  return { type: types.SAVING_POST_SUCCESS, post };
}
function endSavingPost(postId) {
  return { type: types.END_SAVING_POST, postId };
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

/** Update the post form state */
export function postFormUpdated(field, nextValue) {
  return { type: types.POST_FORM_UPDATED, field, nextValue };
}
/** Show the delete post modal */
export function showDeletePostModal(post, redirectTo) {
  return { type: types.SHOW_DELETE_POST_MODAL, post, redirectTo };
}
/** Hide the delete post modal */
export function hideDeletePostModal() {
  return { type: types.HIDE_DELETE_POST_MODAL };
}

// THUNKs

/** Delete a post */
export function deletePost(post) {
  return function(dispatch) {
    dispatch(startDeletingPost(post)); // ajax status
    PostApi
      // server API
      .deletePost(post)
        // update store
        .then(({ post }) => dispatch(deletePostSuccess(post)))
        // ajax status
        .then(() => dispatch(endDeletingPost(post)))
        // hide modal
        .then(() => dispatch(hideDeletePostModal()))
        .catch(error => {
            throw(error);
        });
  };
}

/** Load all posts by category */
export function loadPostsByCategory(category = 'all') {
    return function(dispatch) {
      // get posts
      const postsPromise = category === 'all' ? PostApi.getAllPosts() : PostApi.getPostsByCategory(category);
      postsPromise.then(result => {
          // update store
          dispatch(loadPostsByCategorySuccess(category, result));
      }).catch(error => {
          throw(error);
      });

    };
}

/** Load a post by id */
export function loadPostDetails(postId) {
  return function(dispatch) {
    // server API
    PostApi.getPostDetails(postId)
      .then(post => {
        // update state
        dispatch(loadPostsByCategorySuccess(post.category, { [postId]: post }));
      })
      .catch(error => {
          throw(error);
      });
  };
}

/** Vote a post UP */
export function voteUp(postId) {
  return function(dispatch) {
    // ajax status
    dispatch(beginVotePost(postId));
    PostApi
      // server API
      .votePostUp(postId)
        // update state
        .then(({ post }) => dispatch(votePostSuccess(post)))
        // ajax status
        .then(() => dispatch(endVotePost(postId)))
        .catch(error => {
            throw(error);
        });
  };
}

/** Vote a post DOWN */
export function voteDown(postId) {
  return function(dispatch) {
    // ajax status
    dispatch(beginVotePost(postId));
    PostApi
      // server API
      .votePostDown(postId)
        // update state
        .then(({ post }) => dispatch(votePostSuccess(post)))
        // ajax status
        .then(() => dispatch(endVotePost(postId)))
        .catch(error => {
            throw(error);
        });
  };
}

/** Save or update a post */
export function publishPost(post) {
  return function(dispatch) {
    // ajax status
    dispatch(startSavingPost(post.id));
    PostApi
      // server API
      .publishPost(post)
        // update state
        .then(({ post }) => dispatch(savingPostSuccess(post)))
        // ajax status
        .then(() => dispatch(endSavingPost(post.id)))
        // hide modal
        .then(() => dispatch(closePostForm()))
        .catch(error => {
            throw(error);
        });
  };
}

/** Start editing a post */
export function editPost(postData) {
  return function(dispatch) {
    dispatch(startEditPost(postData));
  };
}

/** Start a new post */
export function createPost() {
  return function(dispatch) {
    dispatch(startCreatePost());
  };
}

/** Close post modal - edit or new */
export function closePostForm() {
  return function(dispatch) {
    dispatch(cancelFormPost());
  };
}
