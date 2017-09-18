import * as types from '../actions/types';
import initialState from './initialState';

export default function postReducer(state = initialState.commentsByParentId, action) {

    switch(action.type) {

        case types.LOAD_COMMENTS_BY_PARENT_SUCCESS:
          return {
            ...state,
            [action.parentId]: action.comments
          };

        default:
            return state;

    }

}
