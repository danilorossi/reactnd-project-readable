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

        case types.DELETE_POST_SUCCESS:
          const newStore = { ...state.store };
          delete newStore[action.post.id];
          return {
            ...state,
            store: {
              ...newStore
              // ...state.store,
              // [action.post.id]: state.store[action.post.id].filter(item => item.id != action.post.id)
            },
            byCategory: {
              ...state.byCategory,
              [action.post.category]: (state.byCategory[action.post.category] ?
                  state.byCategory[action.post.category].filter(postId => postId != action.post.id) : []),
              // TODO remove this?
              ['all']: (state.byCategory['all'] || []).filter(postId => postId != action.post.id)
            }
          }


        default:
            return state;

    }

}
