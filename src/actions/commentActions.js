import * as types from './types';
import CommentApi from '../api/mock/commentApi';


export function loadCommentsByParentSuccess(parentId, comments) {
  return { type: types.LOAD_COMMENTS_BY_PARENT_SUCCESS, parentId, comments };
}


export function beginVoteComment(commentId) {
  return { type: types.BEGIN_VOTE_COMMENT, commentId };
}
export function voteCommentSuccess(commentId) {
  return { type: types.VOTE_COMMENT_SUCCESS, commentId };
}

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
      .voteCommentUp(commentId).then(() => {
        dispatch(voteCommentSuccess(commentId));
      }).catch(error => {
          throw(error);
      });
  };
}

export function voteDown(commentId) {
  return function(dispatch) {
    dispatch(beginVoteComment(commentId));
    CommentApi
      .voteCommentDown(commentId).then(() => {
        dispatch(voteCommentSuccess(commentId));
      }).catch(error => {
          throw(error);
      });
  };
}
