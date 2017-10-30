import uuid from 'js-uuid';
import { AUTH_HEADER, JSON_CONTENT_HEADER } from './globals';

class CommentApi {

  static getByParent(postId) {
    return new Promise((resolve, reject) => {
      fetch(`/api/posts/${postId}/comments`, { headers: { ...AUTH_HEADER } }) // GET the expected route
      .then(data => data.json()) // Convert result to json
      .then(jsonData => {
        resolve({ [postId]: jsonData });
      })
      .catch(error => reject(error)); // Or reject with error
    })
  };

  static voteComment(vote, commentId) {
    return new Promise((resolve, reject) => {
      fetch(`/api/comments/${commentId}`, {
        method: 'POST',
        headers: new Headers({ ...AUTH_HEADER, ...JSON_CONTENT_HEADER }),
        body: JSON.stringify({
      		option: vote
      	})
      }) // GET the expected route
      .then(data => data.json()) // Convert result to json
      .then(comment => {
        resolve({ comment });
      })
      .catch(error => reject(error)); // Or reject with error
    })
  }

  static voteCommentUp(commentId) {
    return CommentApi.voteComment('upVote', commentId);
  }

  static voteCommentDown(commentId) {
    return CommentApi.voteComment('downVote', commentId);
  }

  static deleteComment(comment) {
    return new Promise((resolve, reject) => {
      fetch(`/api/comments/${comment.id}`, { method: 'DELETE', headers: { ...AUTH_HEADER } }) // GET the expected route
      .then(data => data.json()) // Convert result to json
      .then(comment => {
        resolve({ comment });
      })
      .catch(error => reject(error)); // Or reject with error
    })
  }

  static publishComment(comment) {
    if(!comment.id) {

      comment.id = uuid.v1();
      comment.timestamp = Date.now();
      return new Promise((resolve, reject) => {
        fetch(`/api/comments`, {
          method: 'POST',
          headers: new Headers({ ...AUTH_HEADER, ...JSON_CONTENT_HEADER }),
          body: JSON.stringify({
        		...comment
        	})
        }) // GET the expected route
        .then(data => data.json()) // Convert result to json
        .then(comment => {
          resolve({ comment });
        })
        .catch(error => reject(error)); // Or reject with error
      })

    } else {

      comment.lastModified = Date.now();
      return new Promise((resolve, reject) => {
        fetch(`/api/comments/${comment.id}`, {
          method: 'PUT',
          headers: new Headers({ ...AUTH_HEADER, ...JSON_CONTENT_HEADER }),
          body: JSON.stringify({
        		...comment
        	})
        }) // GET the expected route
        .then(data => data.json()) // Convert result to json
        .then(comment => {
          resolve({ comment });
        })
        .catch(error => reject(error)); // Or reject with error
      })

    }

  }

}

export default CommentApi;
