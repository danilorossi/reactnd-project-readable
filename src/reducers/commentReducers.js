import * as types from '../actions/types';
import initialState from './initialState';

export default function postReducer(state = initialState.commentsByParentId, action) {

    switch(action.type) {

        case types.LOAD_COMMENTS_BY_PARENT_SUCCESS:
          return {
            ...state,
            [action.parentId]: action.comments
          };

        case types.VOTE_COMMENT_SUCCESS:
          return {
            ...state,
            [action.comment.parentId]: state[action.comment.parentId].map(item => item.id === action.comment.id ? action.comment : item)
          };

        case types.SAVING_COMMENT_SUCCESS:

          return {
            ...state,
            [action.comment.parentId]:
              state[action.comment.parentId]
                .filter(item => item.id !== action.comment.id)
                .concat(action.comment)
          };

          // return {
          //   ...state,
          //   [action.comment.parentId]: state[action.comment.parentId].map(item => item.id === action.comment.id ? action.comment : item)
          // };

        // case types.UPDATE_COMMENT_SUCCESS:
        //   return {
        //     ...state,
        //     [action.comment.parentId]: state[action.comment.parentId].map(item => item.id === action.comment.id ? action.comment : item)
        //   };

        default:
            return state;

    }

}
