export default {
  categories: {
    current: 'all',
    list: []
  },
  posts: {
    store: {
      // 'postId': { ...postDetails },
    },
    byCategory: {
      // 'all': [id1, id2, id3],
      // 'redux': [id1],
    }
  },
  commentsByParentId: {},
  postForm: {
    visible: false,
    data: {}
  },
  ajaxStatus: {
    postVotes: {},
    commentVotes: {}
  }
}
