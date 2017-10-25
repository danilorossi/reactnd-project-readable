
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

    case types.SHOW_DELETE_COMMENT_MODAL:
      return {
        ...state,
        deleteComment: {
          visible: true,
          data: {
            comment: action.comment
          }
        }
      };

    case types.HIDE_DELETE_COMMENT_MODAL:
      return {
        ...state,
        deleteComment: {
          visible: false,
          data: {
            comment: null
          }
        }
      };

    case types.SHOW_DELETE_POST_MODAL:
      return {
        ...state,
        deletePost: {
          visible: true,
          data: {
            post: action.post
          }
        }
      };

    case types.HIDE_DELETE_POST_MODAL:
      return {
        ...state,
        deletePost: {
          visible: false,
          data: {
            post: null
          }
        }
      };

    case types.START_EDIT_COMMENT:
      return {
        ...state,
        comment: {
          visible: true,
          data: {
            ...action.commentData
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
