import * as types from './types';
import CategoryApi from '../api/mock/categoryApi';

export function updateCurrentCategory(category) {
  return {
    type: types.UPDATE_CURRENT_CATEGORY,
    category
  };
}

export function loadCategoriesSuccess(categories) {
  return { type: types.LOAD_CATEGORIES_SUCCESS, categories };
}



// THUNKs
export function loadCategories() {
    return function(dispatch) {
        // return promise
        return CategoryApi.getAllCategories().then(result => {
            dispatch(loadCategoriesSuccess(result.categories));
        }).catch(error => {
            throw(error);
        });
    };
}
