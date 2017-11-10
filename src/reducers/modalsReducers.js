
import * as types from '../actions/types';
import initialState from './initialState';
import { validateField, validateForm } from '../utils/postFormValidators';
import {
  validateField as validateCommandField,
  validateForm as validateCommandForm
} from '../utils/commentFormValidators';


const POST_TEMPLATE = Object.freeze({
  id: null,
  timestamp: null,
  title: '',
  body: '',
  author: '',
  category: '',
  voteScore: 0,
  deleted: false
});

const COMMENT_TEMPLATE = Object.freeze({
  id: null,
  parentId: null,
  timestamp: null,
  body: '',
  author: '',
  voteScore: 0,
  deleted: false,
  parentDeleted: false
});

export default function commentFormReducer(state = initialState.modals, action) {

  switch(action.type) {

    // show the delete comment modal and pass the required data
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

    // hide the delete comment modal
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

    // show the delete post modal and pass the required data
    case types.SHOW_DELETE_POST_MODAL:
      return {
        ...state,
        deletePost: {
          visible: true,
          // when on post details page, on delete we will head back to the home page
          redirectTo: action.redirectTo,
          data: {
            post: action.post
          }
        }
      };

    // hide the delete page modal
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

    // show the edit comment modal and pass the required data
    case types.START_EDIT_COMMENT:
      return {
        ...state,
        comment: {
          visible: true,
          data: {
            ...action.commentData
          },
          errors: {},
          formError: null,
          valid: true
        }
      };

    // init the create comment form
    case types.START_CREATE_COMMENT:
      return {
        ...state,
        comment: {
          visible: false,
          data: {
            ...COMMENT_TEMPLATE,
            parentId: action.parentId
          },
          errors: {},
          formError: null,
          valid: false
        }
      };

    // hide the comment form and initi form data
    case types.CANCEL_FORM_COMMENT:
      return {
        ...state,
        comment: {
          visible: false,
          data: {
            ...COMMENT_TEMPLATE, // avoid controlled/uncontrolled input warning
            // do not replace parentID, used in add comment form
            parentId: state.comment.data.parentId
          },
          errors: {},
          formError: null,
          valid: false
        }
      };

    // show the edit post modal and pass the required data
    case types.START_EDIT_POST:
      return {
        ...state,
        post: {
          visible: true,
          data: {
            ...action.postData
          },
          errors: {},
          formError: null,
          valid: true
        }
      };

    // show the create post modal and pass the required data
    case types.START_CREATE_POST:
      return {
        ...state,
        post: {
          visible: true,
          data: POST_TEMPLATE, // avoid controlled/uncontrolled input warning
          errors: {},
          formError: null,
          valid: false
        }
      };

    // hide the post modal
    case types.CANCEL_FORM_POST:
      return {
        ...state,
        post: {
          visible: false,
          data: {
            ...POST_TEMPLATE // avoid controlled/uncontrolled input warning
          },
          errors: {},
          formError: null,
          valid: true
        }
      };

    // update the post form field data in the redux store
    // plus check for errors and mark the form as valid or not
    case types.POST_FORM_UPDATED:
      const { field, nextValue } = action;
      const fieldResult = validateField(field, nextValue);
      const formResult = validateForm({
        ...state.post.data,
        [field]: nextValue
      });
      return {
        ...state,
        post: {
          ...state.post,
          data: {
            ...state.post.data,
            [field]: nextValue
          },
          errors: {
            ...state.post.errors,
            [field]: (fieldResult.valid ? null : fieldResult.error)
          },
          formError: (formResult.valid ? null : formResult.error),
          valid: fieldResult.valid && formResult.valid
        }
      };

    // update the comment form field data in the redux store
    // plus check for errors and mark the form as valid or not
    case types.COMMENT_FORM_UPDATED:
      const commentField = action.field;
      const commentNextValue = action.nextValue;
      const commentFieldResult = validateCommandField(commentField, commentNextValue);
      const commentFormResult = validateCommandForm({
        ...state.comment.data,
        [commentField]: commentNextValue
      });

      return {
        ...state,
        comment: {
          ...state.comment,
          data: {
            ...state.comment.data,
            [commentField]: commentNextValue
          },
          errors: {
            ...state.comment.errors,
            [commentField]: (commentFieldResult.valid ? null : commentFieldResult.error)
          },
          formError: (commentFormResult.valid ? null : commentFormResult.error),
          valid: commentFieldResult.valid && commentFormResult.valid
        }
      };

    default:
      return state;

  }

}
