import * as types from './types';
import CommentApi from '../api/commentApi';


function loadCommentsByParentSuccess(parentId, comments) {
  return { type: types.LOAD_COMMENTS_BY_PARENT_SUCCESS, parentId, comments };
}
function beginVoteComment(commentId) {
  return { type: types.BEGIN_VOTE_COMMENT, commentId };
}
function voteCommentSuccess(comment) {
  return { type: types.VOTE_COMMENT_SUCCESS, comment };
}
function endVoteComment(commentId) {
  return { type: types.END_VOTE_COMMENT, commentId };
}
function startEditComment(commentData) {
  return {
    type: types.START_EDIT_COMMENT,
    commentData
  };
}
function cancelFormComment() {
  return { type: types.CANCEL_FORM_COMMENT };
}
function startSavingComment(commentId) {
  return { type: types.START_SAVING_COMMENT, commentId };
}
function savingCommentSuccess(comment) {
  return { type: types.SAVING_COMMENT_SUCCESS, comment };
}
function endSavingComment(commentId) {
  return { type: types.END_SAVING_COMMENT, commentId };
}
function startDeletingComment(comment) {
  return { type: types.START_DELETING_COMMENT, comment };
}
function deleteCommentSuccess(comment) {
  return { type: types.DELETE_COMMENT_SUCCESS, comment };
}
function endDeletingComment(comment) {
  return { type: types.END_DELETING_COMMENT, comment };
}
function incrementCommentsCount(postId, amount) {
  return { type: types.UPDATE_COMMENTS_COUNT, postId, amount };
}

/** Init new comment form */
export function startCreateComment(parentId) {
  return {
    type: types.START_CREATE_COMMENT,
    parentId
  };
}
/** Update the comment form state */
export function commentFormUpdated(field, nextValue) {
  return { type: types.COMMENT_FORM_UPDATED, field, nextValue };
}
/** Show delete comment modal */
export function showDeleteCommentModal(comment) {
 return { type: types.SHOW_DELETE_COMMENT_MODAL, comment };
}
/** Hide delete comment modal */
export function hideDeleteCommentModal() {
 return { type: types.HIDE_DELETE_COMMENT_MODAL };
}

// THUNKs

/** Delete a comment */
export function deleteComment(comment) {
  return function(dispatch) {
    // ajax status
    dispatch(startDeletingComment(comment));
    CommentApi
      // server API
      .deleteComment(comment)
        // update store
        .then(({ comment }) => dispatch(deleteCommentSuccess(comment)))
        .then(() => dispatch(incrementCommentsCount(comment.parentId, -1)))
        // ajax status
        .then(() => dispatch(endDeletingComment(comment)))
        // hide modal
        .then(() => dispatch(hideDeleteCommentModal()))
        .catch(error => {
            throw(error);
        });
  };
}

/** Load all the comments for the give post */
export function loadCommentsByParent(parentId) {
    return function(dispatch) {
      CommentApi
        // server API
        .getByParent(parentId)
        // update store
        .then(result => {
          dispatch(loadCommentsByParentSuccess(parentId, result[parentId]));
        }).catch(error => {
            throw(error);
        });

    };

}

/** Vote a comment UP */
export function voteUp(commentId) {
  return function(dispatch) {
    // ajax status
    dispatch(beginVoteComment(commentId));
    CommentApi
      // server API
      .voteCommentUp(commentId)
        // update store
        .then(({ comment }) => dispatch(voteCommentSuccess(comment)))
        // ajax status
        .then(() => dispatch(endVoteComment(commentId)))
        .catch(error => {
            throw(error);
        });
  };
}

/** Vote a comment DOWN */
export function voteDown(commentId) {
  return function(dispatch) {
    // ajax status
    dispatch(beginVoteComment(commentId));
    CommentApi
      // server API
      .voteCommentDown(commentId)
        // update store
        .then(({ comment }) => dispatch(voteCommentSuccess(comment)))
        // ajax status
        .then(() => dispatch(endVoteComment(commentId)))
        .catch(error => {
            throw(error);
        });
  };
}

/** Save/update a comment */
export function publishComment(comment) {
  return function(dispatch) {
    // ajax status
    dispatch(startSavingComment(comment.id));
    CommentApi
      // server API
      .publishComment(comment)
        // update store
        .then(({ comment }) => dispatch(savingCommentSuccess(comment)))
        .then(() => dispatch(incrementCommentsCount(comment.parentId, 1)))
        // ajax status
        .then(() => dispatch(endSavingComment(comment.id)))
        // hide modal
        .then(() => dispatch(closeCommentForm()))
        .catch(error => {
            throw(error);
        });
  };
}

/** Show edit comment form */
export function editComment(commentData) {
  return function(dispatch) {
    dispatch(startEditComment(commentData));
  };
}

/** Hide edit comment form */
export function closeCommentForm() {
  return function(dispatch) {
    dispatch(cancelFormComment());
  };
}
