/* Categories actions */
export const UPDATE_CURRENT_CATEGORY = Symbol('UpdateCurrentCategory');
export const LOAD_CATEGORIES_SUCCESS = Symbol('LoadCategoriesSuccess');

/* Posts actions */
export const LOAD_POSTS_SUCCESS = Symbol('LoadPostSuccess');

// [edit and create]
export const START_EDIT_POST = Symbol('StartEditPost');
export const START_CREATE_POST = Symbol('StartCreatePost');
export const CANCEL_FORM_POST = Symbol('CancelFromPost');

// [vote posts]
export const BEGIN_VOTE_POST = Symbol('BeginVotePost');
export const VOTE_POST_SUCCESS = Symbol('VotePostSuccess');
export const END_VOTE_POST = Symbol('EndVotePost');

/* Comments actions */
export const LOAD_COMMENTS_BY_PARENT_SUCCESS = Symbol('LoadCommentsByParentSuccess');

// [vote comments]
export const BEGIN_VOTE_COMMENT = Symbol('BeginVoteComment');
export const VOTE_COMMENT_SUCCESS = Symbol('VoteCommentSuccess');
export const END_VOTE_COMMENT = Symbol('EndVoteComment');

// [update comment]
// export const BEGIN_UPDATE_COMMENT = Symbol('BeginUpdateComment');
// export const UPDATE_COMMENT_SUCCESS = Symbol('UpdateCommentSuccess');
// export const END_UPDATE_COMMENT = Symbol('EndUpdateComment');




export const START_EDIT_COMMENT = Symbol('StartEditComment');
export const CANCEL_FORM_COMMENT = Symbol('CancelCommentForm');



export const SHOW_DELETE_POST_MODAL = Symbol('ShowDeletePostModal');
export const HIDE_DELETE_POST_MODAL = Symbol('HideDeletePostModal');

export const SHOW_DELETE_COMMENT_MODAL = Symbol('ShowDeleteCommentModal');
export const HIDE_DELETE_COMMENT_MODAL = Symbol('HideDeleteCommentModal');
