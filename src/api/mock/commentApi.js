
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


}

export default CommentApi;
