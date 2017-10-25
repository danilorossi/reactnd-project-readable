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
        post: null
      }
    },
    deleteComment: {
      visible: false,
      data: {
        comment: null
      }
    }
  },
  ajaxStatus: {
    postVotes: {},
    commentVotes: {},
    savingPost: false,
    savingComment: false,
    deletingPost: false,
    deletingComment: false
    //commentBodies: {}
  }
}
