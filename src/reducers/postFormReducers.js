
import * as types from '../actions/types';
import initialState from './initialState';

const POST_TEMPLATE = {
  id: -1,
  timestamp: null,
  title: '',
  body: '',
  author: '',
  category: '',
  voteScore: 0,
  deleted: false
};

export default function postFormReducer(state = initialState.postForm, action) {

    switch(action.type) {

        case types.START_EDIT_POST:
            return {
              ...state,
              visible: true,
              data: {
                ...action.postData
              }
            };

        case types.START_CREATE_POST:
          return {
            ...state,
            visible: true,
            data: {
              ...POST_TEMPLATE
            }
          };

        case types.CANCEL_FORM_POST:
            return {
              ...state,
              visible: false,
              data: {}
            };

        default:
            return state;

    }

}
