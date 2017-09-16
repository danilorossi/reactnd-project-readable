import * as types from '../actions/types';
import initialState from './initialState';

export default function postReducer(state = initialState.postsByCategory, action) {

    switch(action.type) {

        case types.LOAD_POSTS_SUCCESS:
          return {
            ...state,
            [action.category]: action.posts
          };

        default:
            return state;

    }

}
