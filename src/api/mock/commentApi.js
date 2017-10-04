
import { MOCKED_API_DELAY } from './delay';

const DEFAULT_DATA = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  },
  "xxu4bsun805n8un48veas": {
    id: 'xxu4bsun805n8un48veas',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'This is a fake comment!',
    author: 'thingone',
    voteScore: 101,
    deleted: false,
    parentDeleted: false
  },
  "xxxxxx": {
    id: 'xxxxxx',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'This is another fake comment!',
    author: 'thingone',
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  },
  "yyyyyy": {
    id: 'yyyyyy',
    parentId: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1469479767190,
    body: 'This is a fake comment!',
    author: 'thingone',
    voteScore: -101,
    deleted: false,
    parentDeleted: false
  }



};


class CommentApi {

  static getByParent(postId) {

    return new Promise((resolve, reject) => setTimeout(
        () => {
          const comments = Object.keys(DEFAULT_DATA)
            .map(key => DEFAULT_DATA[key])
            .filter(comment => comment.parentId === postId && comment.deleted === false  && comment.parentDeleted === false);
          resolve({ [postId]: comments });
        }, MOCKED_API_DELAY)
    );

  };

  static voteCommentUp(commentId) {
    console.warn('TODO: commentApi.voteCommentUp...');
    return new Promise((resolve, reject) => setTimeout(
        () => resolve('TODO: testing API...'), MOCKED_API_DELAY)
    );
  }

  static voteCommentDown(commentId) {
    console.warn('TODO: commentApi.voteCommentDown...');
    return new Promise((resolve, reject) => setTimeout(
        () => resolve('TODO: testing API...'), MOCKED_API_DELAY)
    );
  }


}

export default CommentApi;
