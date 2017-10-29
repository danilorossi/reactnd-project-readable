
import uuid from 'js-uuid';
import { MOCKED_API_DELAY } from './delay';
import CommentAPI from './commentApi';

let DEFAULT_DATA = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 4
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
  },
  "aaaaaaaa": {
    id: 'aaaaaaaa',
    timestamp: 1468479767190,
    title: 'A new fake post!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'unknown',
    category: 'redux',
    voteScore: 2,
    deleted: false,
    commentCount: 2
  },
  "bbbbbbbb": {
    id: 'bbbbbbbb',
    timestamp: 1509188349283,
    title: 'A new fake post!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'unknown',
    category: 'udacity',
    voteScore: 0,
    deleted: false,
    commentCount: 1
  },
  "xxxxxx": {
    id: 'xxxxxx',
    timestamp: 1509188341888,
    title: 'A new fake post!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'unknown',
    category: 'routing',
    voteScore: -1,
    deleted: false,
    commentCount: 0
  }
}

// TODO this is not managing the DELETE prop
class PostApi {

  static publishPost(post) {

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

    return new Promise((resolve, reject) => setTimeout(
        () => resolve({ post: DEFAULT_DATA[post.id]}), MOCKED_API_DELAY)
    );

  }

  static getAllPosts() {

    const newDefaultData = Object.keys(DEFAULT_DATA)
      .map(key => DEFAULT_DATA[key])
      .filter(post => !post.deleted)
      .reduce((prev, curr) => {
        return {
          ...prev,
          [curr.id]: curr
        };
      }, {});

    DEFAULT_DATA = { ...newDefaultData };

    return new Promise((resolve, reject) => setTimeout(
        () => resolve(DEFAULT_DATA), MOCKED_API_DELAY)
    );

  };

  static getPostsByCategory(category) {

    const posts = Object.keys(DEFAULT_DATA)
      .map(key => DEFAULT_DATA[key])
      .filter(post => !post.deleted)
      .filter(post => ( category === 'all' ? true : post.category === category ))
      .reduce((prev, curr) => {
        return {
          ...prev,
          [curr.id]: curr
        };
      }, {});
    return new Promise((resolve, reject) => setTimeout(
        () => resolve(posts), MOCKED_API_DELAY)
    );

    // return new Promise((resolve, reject) => setTimeout(
    //     () => {
    //
    //       const keys = Object.keys(DEFAULT_DATA);
    //
    //       switch(category) {
    //         case 'all':
    //           resolve(DEFAULT_DATA);
    //           break;
    //
    //         case 'react':
    //           resolve({ [keys[0]]: DEFAULT_DATA[keys[0]] });
    //           break;
    //
    //         case 'redux':
    //           // resolve(DEFAULT_DATA['6ni6ok3ym7mf1p33lnez']);
    //           resolve({ [keys[1]]: DEFAULT_DATA[keys[1]] });
    //           break;
    //
    //         default: resolve([]);
    //       }
    //
    //     }, MOCKED_API_DELAY)
    // );

  }

  static deletePost(post) {
    DEFAULT_DATA[post.id] = {
      ...(DEFAULT_DATA[post.id]),
      deleted: true,
      lastModified: Date.now()
    };

    return new Promise((resolve, reject) => setTimeout(
        () => CommentAPI.deleteAllCommentsByPostId(post.id).then(() => resolve({ post })), MOCKED_API_DELAY)
    );
  }

  static votePostUp(postId) {
    const oldScore = DEFAULT_DATA[postId].voteScore;
    const newData = Object.assign({}, DEFAULT_DATA, {
      [postId]: {
        ...DEFAULT_DATA[postId],
        voteScore: (oldScore + 1)
      }
    });
    DEFAULT_DATA = {...newData};
    return new Promise((resolve, reject) => setTimeout(
        () => resolve({ post: DEFAULT_DATA[postId]}), MOCKED_API_DELAY)
    );
  }

  static votePostDown(postId) {
    const oldScore = DEFAULT_DATA[postId].voteScore;
    const newData = Object.assign({}, DEFAULT_DATA, {
      [postId]: {
        ...DEFAULT_DATA[postId],
        voteScore: (oldScore - 1)
      }
    });
    DEFAULT_DATA = {...newData};
    return new Promise((resolve, reject) => setTimeout(
      () => resolve({ post: DEFAULT_DATA[postId]}), MOCKED_API_DELAY)
    );
  }
}

export default PostApi;
