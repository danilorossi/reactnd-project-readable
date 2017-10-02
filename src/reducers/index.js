// Root reducer
// for multiple reducers in the same app
import { combineReducers } from 'redux';

import categories from './categoryReducers';
import postsByCategory from './postReducers';
import commentsByParentId from './commentReducers';
import postForm from './postFormReducers';
import ajaxStatus from './ajaxStatusReducers';

const rootReducer = combineReducers({
  categories,
  postsByCategory,
  commentsByParentId,
  postForm,
  ajaxStatus
});

export default rootReducer;
