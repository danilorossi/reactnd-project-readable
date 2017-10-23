import * as types from './types';
import CommentApi from '../api/mock/commentApi';


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
// function startCreateComment(parentId) {
//   return { type: types.START_CREATE_COMMENT, parentId };
// }
function cancelFormComment() {
  return { type: types.CANCEL_FORM_COMMENT };
}

export function showDeleteCommentModal(commentId) {
  return { type: types.SHOW_DELETE_COMMENT_MODAL, commentId };
}
export function hideDeleteCommentModal() {
  return { type: types.HIDE_DELETE_COMMENT_MODAL };
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
// // NOTE note used anymore?
// function beginUpdateComment(commentId) {
//   return { type: types.BEGIN_UPDATE_COMMENT, commentId };
// }// NOTE note used anymore?
//
// function updateCommentSuccess(comment) {
//   return { type: types.UPDATE_COMMENT_SUCCESS, comment };
// }// NOTE note used anymore?
//
// function endUpdateComment(commentId) {
//   return { type: types.END_UPDATE_COMMENT, commentId };
// }



// THUNKs
export function loadCommentsByParent(parentId) {
    return function(dispatch) {
      CommentApi
        .getByParent(parentId)
        .then(result => {
          dispatch(loadCommentsByParentSuccess(parentId, result[parentId]));
        }).catch(error => {
            throw(error);
        });

    };

}




export function voteUp(commentId) {
  return function(dispatch) {
    dispatch(beginVoteComment(commentId));
    CommentApi
      .voteCommentUp(commentId)
        .then(({ comment }) => dispatch(voteCommentSuccess(comment)))
        .then(() => dispatch(endVoteComment(commentId)))
        .catch(error => {
            throw(error);
        });
  };
}

export function voteDown(commentId) {
  return function(dispatch) {
    dispatch(beginVoteComment(commentId));
    CommentApi
      .voteCommentDown(commentId)
        .then(({ comment }) => dispatch(voteCommentSuccess(comment)))
        .then(() => dispatch(endVoteComment(commentId)))
        .catch(error => {
            throw(error);
        });
  };
}


// export function updateComment(commentId, body) {
//   return function(dispatch) {
//     dispatch(beginUpdateComment(commentId));
//     CommentApi
//       .updateComment(commentId, body)
//         .then(({ comment }) => dispatch(updateCommentSuccess(comment)))
//         .then(() => dispatch(endUpdateComment(commentId)))
//         .catch(error => {
//             throw(error);
//         });
//   };
// }


export function publishComment(comment) {
  return function(dispatch) {
    dispatch(startSavingComment(comment.id));
    CommentApi
      .publishComment(comment)
        .then(({ comment }) => dispatch(savingCommentSuccess(comment)))
        .then(() => dispatch(endSavingComment(comment.id)))
        .catch(error => {
            throw(error);
        });
  };
}

export function editComment(commentData) {
  return function(dispatch) {
    dispatch(startEditComment(commentData));
  };
}
// export function createComment(parentId) {
//   return function(dispatch) {
//     dispatch(startCreateComment(parentId));
//   };
// }
export function closeCommentForm() {
  return function(dispatch) {
    dispatch(cancelFormComment());
  };
}
