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

        // case types.LOAD_POST_DETAILS_SUCCESS:
        //
        //   console.log('POST REDUCERS ', action);
        //   return state;
        //   break;

        case types.VOTE_POST_SUCCESS:
          return {
            ...state,
            store: {
              ...state.store,
              [action.post.id]: action.post
            }
          }

        case types.UPDATE_COMMENTS_COUNT:
          return {
            ...state,
            store: {
              ...state.store,
              [action.postId]: {
                ...state.store[action.postId],
                commentCount: (state.store[action.postId].commentCount + action.amount)
              }
            }
          }

        case types.SAVING_POST_SUCCESS:

          const isNewPost = !state.store[action.post.id];
          const newByCategory = isNewPost ?
            [...(state.byCategory[action.post.category] || [])].concat(action.post.id) :
            (state.byCategory[action.post.category] || []);
          const newAllCategory = isNewPost ?
            [...(state.byCategory['all'] || [])].concat(action.post.id) :
            (state.byCategory['all'] || []);

          return {
            ...state,
            store: {
              ...state.store,
              [action.post.id]: action.post
            },
            byCategory: {
              ...state.byCategory,
              [action.post.category]: newByCategory,
              ['all']: newAllCategory
            }
          }
          // return {
          //   ...state,
          //   [action.comment.parentId]:
          //     state[action.comment.parentId]
          //       .filter(item => item.id !== action.comment.id)
          //       .concat(action.comment)
          // };

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
