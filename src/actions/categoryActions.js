import * as types from './types';
import CategoryApi from '../api/categoryApi';

/** Change the current selected category */
export function updateCurrentCategory(category) {
  return {
    type: types.UPDATE_CURRENT_CATEGORY,
    category
  };
}

/** Update the state with the list of categories */
export function loadCategoriesSuccess(categories) {
  return { type: types.LOAD_CATEGORIES_SUCCESS, categories };
}

// THUNKs

/** Load the categories from the server */
export function loadCategories() {
    return function(dispatch) {
        return CategoryApi
            // server API
            .getAllCategories()
            // update state
            .then(result => {
              dispatch(loadCategoriesSuccess(result.categories));
            }).catch(error => {
              throw(error);
            });
    };
}
