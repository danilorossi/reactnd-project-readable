import uuid from 'js-uuid';
import { AUTH_HEADER, JSON_CONTENT_HEADER } from './globals';

class CommentApi {

  static getByParent(postId) {
    return new Promise((resolve, reject) => {
      fetch(`/api/posts/${postId}/comments`, { headers: { ...AUTH_HEADER } })
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
      })
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
      fetch(`/api/comments/${comment.id}`, { method: 'DELETE', headers: { ...AUTH_HEADER } })
      .then(data => data.json()) // Convert result to json
      .then(comment => {
        resolve({ comment });
      })
      .catch(error => reject(error)); // Or reject with error
    })
  }

  static publishComment(comment) {

    // saving new comment
    if(!comment.id) {

      return new Promise((resolve, reject) => {
        fetch(`/api/comments`, {
          method: 'POST',
          headers: new Headers({ ...AUTH_HEADER, ...JSON_CONTENT_HEADER }),
          body: JSON.stringify({
        		...comment,
            timestamp: Date.now(), // adding timestamp
            id: uuid.v1() // generating ID
        	})
        })
        .then(data => data.json()) // Convert result to json
        .then(comment => {
          resolve({ comment });
        })
        .catch(error => reject(error)); // Or reject with error
      })

    } else { // updating existing entity

      return new Promise((resolve, reject) => {
        fetch(`/api/comments/${comment.id}`, {
          method: 'PUT',
          headers: new Headers({ ...AUTH_HEADER, ...JSON_CONTENT_HEADER }),
          body: JSON.stringify({
        		...comment,
            lastModified: Date.now() // adding a last modified field
        	})
        })
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
