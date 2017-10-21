
import * as types from '../actions/types';
import initialState from './initialState';
//
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

export default function commentFormReducer(state = initialState.confirmForm, action) {

    switch(action.type) {

        // case types.START_EDIT_POST:
        //     return {
        //       ...state,
        //       visible: true,
        //       data: {
        //         ...action.postData
        //       }
        //     };

        case types.SHOW_CONFIRM_MODAL:
          return {
            ...state,
            visible: true,
            data: {
              ...action.data
            }
          };

        case types.HIDE_CONFIRM_MODAL:
            return {
              ...state,
              visible: false,
              //data: {}
            };

        default:
            return state;

    }

}
