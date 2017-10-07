import * as types from '../actions/types';
import initialState from './initialState';

//export default function postReducer(state = initialState.postsByCategory, action) {
export default function postReducer(state = initialState.posts, action) {

    switch(action.type) {

        case types.LOAD_POSTS_SUCCESS:

          return {
            ...state,
            store: {
              ...state.store,
              ...action.posts
            },
            byCategory: {
              ...state.byCategory,
              [action.category]: Object.keys(action.posts)
            }
          };

        case types.VOTE_POST_SUCCESS:
          return {
            ...state,
            store: {
              ...state.store,
              [action.post.id]: action.post
            }
          }

        default:
            return state;

    }

}
