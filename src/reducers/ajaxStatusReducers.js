import * as types from '../actions/types';
import initialState from './initialState';

export default function ajaxStatusReducer(state = initialState.ajaxStatus, action) {

    switch(action.type) {

        case types.BEGIN_VOTE_POST:
          return {
            ...state,
            votes: {
              ...state.votes,
              [action.postId]: true
            }
          };

        case types.VOTE_POST_SUCCESS:
          // const newState = Object.assign({}, state});
          // delete newState.votes[action.postId];
          // return newState;
          return {
            ...state,
            votes: {
              ...state.votes,
              [action.postId]: false
            }
          };

        default:
          return state;

    }

}
