import * as types from '../actions/types';
import initialState from './initialState';

export default function ajaxStatusReducer(state = initialState.ajaxStatus, action) {

    switch(action.type) {

        case types.BEGIN_VOTE_POST:
          return {
            ...state,
            postVotes: {
              ...state.postVotes,
              [action.postId]: true
            }
          };

        case types.VOTE_POST_SUCCESS:
          return {
            ...state,
            postVotes: {
              ...state.postVotes,
              [action.postId]: false
            }
          };

        case types.BEGIN_VOTE_COMMENT:
          return {
            ...state,
            commentVotes: {
              ...state.commentVotes,
              [action.commentId]: true
            }
          };

        case types.VOTE_COMMENT_SUCCESS:
          return {
            ...state,
            commentVotes: {
              ...state.commentVotes,
              [action.commentId]: false
            }
          };

        default:
          return state;

    }

}
