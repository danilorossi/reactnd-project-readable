export default {

  // manage categories, and current selected category
  categories: {
    current: 'all', // current shown category
    list: [] // a list of valid categories
  },
  posts: {
    // normalized store for posts
    store: {
      // 'postId': { ...postDetails },
    },
    // list of posts IDs by category
    byCategory: {
      // 'all': [id1, id2, id3],
      // 'redux': [id1],
    }
  },

  // list of comments by post id
  commentsByParentId: {},

  // manage modals
  modals: {

    // post modal (edit and create)
    post: {
      visible: false,
      // NOTE we use this in a form, if we do not initialize here
      // react will trigger a warning as we would be turnin an uncontrolled
      // component into a controlled one
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
      errors: {}, // fields errors
      formError: null, // form level error
      valid: true
    },
    comment: {
      visible: false,
      // NOTE we use this in a form, if we do not initialize here
      // react will trigger a warning as we would be turnin an uncontrolled
      // component into a controlled one
      data: {
        id: null,
        parentId: null,
        timestamp: null,
        body: '',
        author: '',
        voteScore: 0,
        deleted: false,
        parentDeleted: false
      },
      errors: {}, // fields errors
      formError: null, // form level error
      valid: true
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

  // ajax calls status
  ajaxStatus: {
    postVotes: {}, // will have a postId > boolean to indicate that the vote is being saved
    commentVotes: {}, // will have a commentId > boolean to indicate that the vote is being saved
    savingPost: false,
    savingComment: false,
    deletingPost: false,
    deletingComment: false
  }
}
