// Root reducer
// for multiple reducers in the same app
import { combineReducers } from 'redux';

import categories from './categoryReducers';
import posts from './postReducers';
// import authors from './authorReducers';
// import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    categories,
    posts
    // ajaxCallsInProgress
});

export default rootReducer;
