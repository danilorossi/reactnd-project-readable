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

  modals: {
    post: {
      visible: false,
      data: {}
    },
    comment: {
      visible: false,
      data: {}
    },
    deletePost: {
      visible: false,
      data: {
        postId: null
      }
    },
    deleteComment: {
      visible: false,
      data: {
        commentId: null
      }
    }
  },
  ajaxStatus: {
    postVotes: {},
    commentVotes: {},
    //commentBodies: {}
  }
  // postForm: {
  //   visible: false,
  //   data: {}
  // },
  // commentForm: {
  //   visible: false,
  //   data: {}
  // },
  // confirmForm: {
  //   visible: false,
  //   data: {}
  // },
  // ajaxStatus: {
  //   postVotes: {},
  //   commentVotes: {},
  //   commentBodies: {}
  // }
}
