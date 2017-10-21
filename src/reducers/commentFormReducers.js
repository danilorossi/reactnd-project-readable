
import * as types from '../actions/types';
import initialState from './initialState';

// const COMMENT_TEMPLATE = {
//   id: null,
//   timestamp: null,
//   title: '',
//   body: '',
//   author: '',
//   category: '',
//   voteScore: 0,
//   deleted: false
// };

export default function commentFormReducer(state = initialState.commentForm, action) {

    switch(action.type) {

        // case types.START_EDIT_POST:
        //     return {
        //       ...state,
        //       visible: true,
        //       data: {
        //         ...action.postData
        //       }
        //     };

        case types.START_CREATE_COMMENT:
          return {
            ...state,
            visible: true
          };

        case types.CANCEL_COMMENT_POST:
            return {
              ...state,
              visible: false,
              //data: {}
            };

        default:
            return state;

    }

}
