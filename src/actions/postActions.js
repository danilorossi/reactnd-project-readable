import * as types from './types';
import PostApi from '../api/mock/postApi';


export function loadPostsByCategorySuccess(category, posts) {
  return { type: types.LOAD_POSTS_SUCCESS, category, posts };
}

// THUNKs
export function loadPostsByCategory(category = 'all') {
    return function(dispatch) {

      const postsPromise = category === 'all' ? PostApi.getAllPosts() : /* TODO */ PostApi.getPostsByCategory(category);

      postsPromise.then(result => {
          dispatch(loadPostsByCategorySuccess(category, Object.values(result)));
      }).catch(error => {
          throw(error);
      });

    };
}
