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
      data: {
        id: null,
        timestamp: null,
        title: '',
        body: '',
        author: '',
        category: '',
        voteScore: 0,
        deleted: false
      },
      errors: {},
      formError: null,
      valid: true
    },
    comment: {
      visible: false,
      data: {
        id: null,
        parentId: null,
        timestamp: null,
        body: '',
        author: '',
        voteScore: 0,
        deleted: false,
        parentDeleted: false
      }
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
