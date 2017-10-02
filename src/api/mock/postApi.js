
import { MOCKED_API_DELAY } from './delay';

const DEFAULT_DATA = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  }
}

// TODO this is not managing the DELETE prop
class PostApi {

  static getAllPosts() {

    return new Promise((resolve, reject) => setTimeout(
        () => resolve(DEFAULT_DATA), MOCKED_API_DELAY)
    );

  };

  static getPostsByCategory(category) {
    return new Promise((resolve, reject) => setTimeout(
        () => {

          const keys = Object.keys(DEFAULT_DATA);

          switch(category) {
            case 'all':
              resolve(DEFAULT_DATA);
              break;

            case 'react':
              resolve({ [keys[0]]: DEFAULT_DATA[keys[0]] });
              break;

            case 'redux':
              // resolve(DEFAULT_DATA['6ni6ok3ym7mf1p33lnez']);
              resolve({ [keys[1]]: DEFAULT_DATA[keys[1]] });
              break;

            default: resolve([]);
          }

        }, MOCKED_API_DELAY)
    );

  }

  static votePostUp(postId) {

  }

  static votePostDown(postId) {

  }
}

export default PostApi;
