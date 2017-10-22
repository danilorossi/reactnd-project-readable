
import * as types from '../actions/types';
import initialState from './initialState';

const POST_TEMPLATE = {
  id: null,
  timestamp: null,
  title: '',
  body: '',
  author: '',
  category: '',
  voteScore: 0,
  deleted: false
};

const COMMENT_TEMPLATE = {
  id: null,
  parentId: null,
  timestamp: null,
  body: '',
  author: '',
  voteScore: 0,
  deleted: false,
  parentDeleted: false
}

export default function commentFormReducer(state = initialState.modals, action) {

  switch(action.type) {

    // case types.SHOW_CONFIRM_MODAL:
    //   return {
    //     ...state,
    //     visible: true,
    //     data: {
    //       ...action.data
    //     }
    //   };
    //
    // case types.HIDE_CONFIRM_MODAL:
    //     return {
    //       ...state,
    //       visible: false,
    //       //data: {}
    //     };
    case types.SHOW_DELETE_COMMENT_MODAL:
      return {
        ...state,
        deleteComment: {
          visible: true,
          data: {
            commentId: action.commentId
          }
        }
      };

    case types.HIDE_DELETE_COMMENT_MODAL:
      return {
        ...state,
        deleteComment: {
          visible: false,
          data: {
            commentId: null
          }
        }
      };

    case types.SHOW_DELETE_POST_MODAL:
      return {
        ...state,
        deletePost: {
          visible: true,
          data: {
            postId: action.postId
          }
        }
      };

    case types.HIDE_DELETE_POST_MODAL:
      return {
        ...state,
        deletePost: {
          visible: false,
          data: {
            postId: null
          }
        }
      };

    case types.START_EDIT_COMMENT:
      return {
        ...state,
        comment: {
          visible: true,
          data: {
            ...action.postData
          }
        }
      };

    case types.START_CREATE_COMMENT:
      return {
        ...state,
        post: {
          visible: true,
          data: COMMENT_TEMPLATE,
          data: {
            parentId: action.parentId
          }
        }
      };

    case types.CANCEL_FORM_COMMENT:
      return {
        ...state,
        comment: {
          visible: false,
          data: {}
        }
      };


    case types.START_EDIT_POST:
      return {
        ...state,
        post: {
          visible: true,
          data: {
            ...action.postData
          }
        }
      };

    case types.START_CREATE_POST:
      return {
        ...state,
        post: {
          visible: true,
          data: POST_TEMPLATE
        }
      };

    case types.CANCEL_FORM_POST:
        return {
          ...state,
          post: {
            visible: false,
            data: {}
          }
        };

    default:
        return state;

  }

}
