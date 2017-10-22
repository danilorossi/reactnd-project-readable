// Root reducer
// for multiple reducers in the same app
import { combineReducers } from 'redux';

import categories from './categoryReducers';
import posts from './postReducers';
import commentsByParentId from './commentReducers';
// import postForm from './postFormReducers';
// import commentForm from './commentFormReducers';
// import confirmForm from './confirmModalReducers';
import modals from './modalsReducers';
import ajaxStatus from './ajaxStatusReducers';

const rootReducer = combineReducers({
  categories,
  posts,
  commentsByParentId,
  // postForm,
  // commentForm,
  // confirmForm,
  modals,
  ajaxStatus
});

export default rootReducer;
