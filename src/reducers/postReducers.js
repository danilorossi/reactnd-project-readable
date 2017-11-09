import * as types from '../actions/types';
import initialState from './initialState';

export default function postReducer(state = initialState.posts, action) {

    switch(action.type) {

        // normalize the list of posts by category
        case types.LOAD_POSTS_SUCCESS:
          return {
            ...state,
            store: {
              ...state.store,
              ...action.posts
            },
            byCategory: {
              ...state.byCategory,
              // specific category posts  IDs
              [action.category]: Object.keys(action.posts)
            }
          };

        // replace a post with the updated voteScore
        case types.VOTE_POST_SUCCESS:
          return {
            ...state,
            store: {
              ...state.store,
              [action.post.id]: action.post
            }
          }

        // update the nubmer of comments for a specific post
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

        // update the posts store and byCategory section on post creation/update
        case types.SAVING_POST_SUCCESS:

          // wheter is new or not (saving or updating)
          const isNewPost = !state.store[action.post.id];

          // if new post, add ID in byCategory section, otherwise create if new category
          const newByCategory = isNewPost ?
            [...(state.byCategory[action.post.category] || [])].concat(action.post.id) :
            (state.byCategory[action.post.category] || []);

          // if new post, update also 'all' category
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
              all: newAllCategory
            }
          }

        // update the normalized store after a post is deleted
        case types.DELETE_POST_SUCCESS:
          const newStore = { ...state.store };
          delete newStore[action.post.id];
          return {
            ...state,
            store: {
              ...newStore
            },
            byCategory: {
              ...state.byCategory,
              // update byCategory for deleted post category
              [action.post.category]: (state.byCategory[action.post.category] ?
                  state.byCategory[action.post.category].filter(postId => postId !== action.post.id) : []),
              // update 'all' category section
              all: (state.byCategory['all'] || []).filter(postId => postId !== action.post.id)
            }
          }

        default:
            return state;

    }

}
