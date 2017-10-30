import { AUTH_HEADER, JSON_CONTENT_HEADER } from './globals';


// TODO remove
import MockedPostAPI from './mock/postApi';

class PostApi {

  static getAllPosts() {
    return new Promise((resolve, reject) => {
      fetch('/api/posts', { headers: { ...AUTH_HEADER } }) // GET the expected route
      .then(data => data.json()) // Convert result to json
      .then(jsonData => {
        resolve(jsonData.reduce((prev, curr) => {
          return {
            ...prev,
            [curr.id]: curr
          }
        }, {}));  // Resolve object
      })
      .catch(error => reject(error)); // Or reject with error
    })
  };

  static getPostsByCategory(category) {
    return new Promise((resolve, reject) => {
      fetch(`/api/${category}/posts`, { headers: { ...AUTH_HEADER } }) // GET the expected route
      .then(data => data.json()) // Convert result to json
      .then(jsonData => {
        resolve(jsonData.reduce((prev, curr) => {
          return {
            ...prev,
            [curr.id]: curr
          }
        }, {}));  // Resolve object
      })
      .catch(error => reject(error)); // Or reject with error
    })
  }

  static deletePost(post) {
    return new Promise((resolve, reject) => {
      fetch(`/api/posts/${post.id}`, { method: 'DELETE', headers: { ...AUTH_HEADER } }) // GET the expected route
      .then(data => data.json()) // Convert result to json
      .then(post => {
        resolve({ post });
      })
      .catch(error => reject(error)); // Or reject with error
    })
  }

  static votePost(vote, postId) {
    return new Promise((resolve, reject) => {
      fetch(`/api/posts/${postId}`, {
        method: 'POST',
        headers: new Headers({ ...AUTH_HEADER, ...JSON_CONTENT_HEADER }),
        body: JSON.stringify({
      		option: vote
      	})
      }) // GET the expected route
      .then(data => data.json()) // Convert result to json
      .then(post => {
        resolve({ post });
      })
      .catch(error => reject(error)); // Or reject with error
    })
  }

  static votePostUp(postId) {
    return PostApi.votePost('upVote', postId);
  }

  static votePostDown(postId) {
    return PostApi.votePost('downVote', postId);
  }

  static publishPost(post) {
    return MockedPostAPI.publishPost(post);

    if(!post.id) {
      // SAVE NEW
    } else {
      // UPDATE EXISTING
    }

    /*
      if(!post.id) {
        post.id = uuid.v1();
        DEFAULT_DATA[post.id] = {
          ...post,
        };
      } else {
        DEFAULT_DATA[post.id] = {
          ...(DEFAULT_DATA[post.id]),
          author: post.author,
          title: post.title,
          body: post.body,
          category: post.category,
          lastModified: Date.now()
        };
      }
    */
  }

}

export default PostApi;
