import uuid from 'js-uuid';
import { AUTH_HEADER, JSON_CONTENT_HEADER } from './globals';

class PostApi {

  static getAllPosts() {
    return new Promise((resolve, reject) => {
      fetch('/api/posts', { headers: { ...AUTH_HEADER } })
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

  static getPostDetails(postId) {
    return new Promise((resolve, reject) => {
      fetch(`/api/posts/${postId}`, { headers: { ...AUTH_HEADER } })
      .then(data => data.json()) // Convert result to json
      .then(jsonData => resolve(jsonData))
      .catch(error => reject(error)); // Or reject with error
    })
  };

  static getPostsByCategory(category) {
    return new Promise((resolve, reject) => {
      fetch(`/api/${category}/posts`, { headers: { ...AUTH_HEADER } })
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
      fetch(`/api/posts/${post.id}`, { method: 'DELETE', headers: { ...AUTH_HEADER } })
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
      })
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

    // saving new post
    if(!post.id) {

      return new Promise((resolve, reject) => {
        fetch(`/api/posts`, {
          method: 'POST',
          headers: new Headers({ ...AUTH_HEADER, ...JSON_CONTENT_HEADER }),
          body: JSON.stringify({
        		...post,
            id: uuid.v1(), // add unique ID
            timestamp: Date.now() // and timestamp
        	})
        })
        .then(data => data.json()) // Convert result to json
        .then(post => {
          resolve({ post });
        })
        .catch(error => reject(error)); // Or reject with error
      })

    } else { // updating exiting post

      return new Promise((resolve, reject) => {
        fetch(`/api/posts/${post.id}`, {
          method: 'PUT',
          headers: new Headers({ ...AUTH_HEADER, ...JSON_CONTENT_HEADER }),
          body: JSON.stringify({
        		...post,
            lastModified: Date.now() // adding a last modified field
        	})
        })
        .then(data => data.json()) // Convert result to json
        .then(post => {
          resolve({ post });
        })
        .catch(error => reject(error)); // Or reject with error
      })

    }

  }

}

export default PostApi;
