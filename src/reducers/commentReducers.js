import * as types from '../actions/types';
import initialState from './initialState';

export default function postReducer(state = initialState.commentsByParentId, action) {

    switch(action.type) {

      // update comments list
      case types.LOAD_COMMENTS_BY_PARENT_SUCCESS:
        return {
          ...state,
          [action.parentId]: action.comments
        };

      // replace the voted comment with the updated one returned by the server
      case types.VOTE_COMMENT_SUCCESS:
        return {
          ...state,
          [action.comment.parentId]: state[action.comment.parentId].map(item => item.id === action.comment.id ? action.comment : item)
        };

      // replace the updated comment with the updated one returned by the server
      case types.SAVING_COMMENT_SUCCESS:
        return {
          ...state,
          [action.comment.parentId]:
            state[action.comment.parentId]
              .filter(item => item.id !== action.comment.id)
              .concat(action.comment)
        };

      // remove the deleted comment
      case types.DELETE_COMMENT_SUCCESS:
        return {
          ...state,
          [action.comment.parentId]:
            state[action.comment.parentId]
              .filter(item => item.id !== action.comment.id)
        };

      // delete all comments in the store if parent is deleted
      case types.DELETE_POST_SUCCESS:
        const newState = {
          ...state
        };
        delete newState[action.post.id];
        return {
          ...newState
        };

      default:
          return state;

    }

}
