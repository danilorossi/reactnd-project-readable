import * as types from './types';
import CommentApi from '../api/mock/commentApi';


export function loadCommentsByParentSuccess(parentId, comments) {
  return { type: types.LOAD_COMMENTS_BY_PARENT_SUCCESS, parentId, comments };
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
