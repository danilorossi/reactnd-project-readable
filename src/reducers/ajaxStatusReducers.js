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

        case types.END_VOTE_POST:
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

        case types.END_VOTE_COMMENT:
          return {
            ...state,
            commentVotes: {
              ...state.commentVotes,
              [action.commentId]: false
            }
          };

        case types.START_SAVING_COMMENT:
          return {
            ...state,
            savingComment: true
          };

        case types.END_SAVING_COMMENT:
          return {
            ...state,
            savingComment: false
          };

        case types.START_DELETING_COMMENT:
          return {
            ...state,
            deletingComment: true
          };

        case types.END_DELETING_COMMENT:
          return {
            ...state,
            deletingComment: false
          };

        case types.START_DELETING_POST:
          return {
            ...state,
            deletingPost: true
          };

        case types.END_DELETING_POST:
          return {
            ...state,
            deletingPost: false
          };

        // case types.BEGIN_UPDATE_COMMENT:
        //   return {
        //     ...state,
        //     commentBodies: {
        //       ...state.commentBodies,
        //       [action.commentId]: true
        //     }
        //   };
        //
        // case types.END_UPDATE_COMMENT:
        //   return {
        //     ...state,
        //     commentBodies: {
        //       ...state.commentBodies,
        //       [action.commentId]: false
        //     }
        //   };

        default:
          return state;

    }

}
