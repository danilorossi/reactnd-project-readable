
import * as types from '../actions/types';
import initialState from './initialState';

export default function categoryReducer(state = initialState.categories, action) {

    switch(action.type) {

        case types.UPDATE_CURRENT_CATEGORY:
            return {
              ...state,
              current: action.category
            };

        case types.LOAD_CATEGORIES_SUCCESS:
          return {
            ...state,
            list: action.categories
          };

        default:
            return state;

    }

}
