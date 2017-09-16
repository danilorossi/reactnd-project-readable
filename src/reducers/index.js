// Root reducer
// for multiple reducers in the same app
import { combineReducers } from 'redux';

import categories from './categoryReducers';
import postsByCategory from './postReducers';
// import authors from './authorReducers';
// import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    categories,
    postsByCategory // NOTE looks like this must match the initial state key 
    // ajaxCallsInProgress
});

export default rootReducer;
