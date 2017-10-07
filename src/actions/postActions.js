import * as types from './types';
import PostApi from '../api/mock/postApi';


export function loadPostsByCategorySuccess(category, posts) {
  return { type: types.LOAD_POSTS_SUCCESS, category, posts };
}
export function beginVotePost(postId) {
  return { type: types.BEGIN_VOTE_POST, postId };
}
export function endVotePost(postId) {
  return { type: types.END_VOTE_POST, postId };
}
export function votePostSuccess(post) {
  return { type: types.VOTE_POST_SUCCESS, post };
}


// THUNKs
export function loadPostsByCategory(category = 'all') {
    return function(dispatch) {

      const postsPromise = category === 'all' ? PostApi.getAllPosts() : /* TODO */ PostApi.getPostsByCategory(category);

      postsPromise.then(result => {
          dispatch(loadPostsByCategorySuccess(category, result));
      }).catch(error => {
          throw(error);
      });

    };
}

export function voteUp(postId) {
  return function(dispatch) {
    dispatch(beginVotePost(postId));
    PostApi
      .votePostUp(postId)
        .then(({ post }) => dispatch(votePostSuccess(post)))
        .then(() => dispatch(endVotePost(postId)))
        .catch(error => {
            throw(error);
        });
  };
}

export function voteDown(postId) {
  return function(dispatch) {
    dispatch(beginVotePost(postId));
    PostApi
      .votePostDown(postId)
        .then(({ post }) => dispatch(votePostSuccess(post)))
        .then(() => dispatch(endVotePost(postId)))
        .catch(error => {
            throw(error);
        });
  };
}
