// Root reducer
// for multiple reducers in the same app
import { combineReducers } from 'redux';

import categories from './categoryReducers';
// import authors from './authorReducers';
// import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    categories,
    // authors,
    // ajaxCallsInProgress
});

export default rootReducer;
