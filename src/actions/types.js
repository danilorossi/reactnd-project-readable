/****** Categories actions ******/
export const UPDATE_CURRENT_CATEGORY = Symbol('UPDATE_CURRENT_CATEGORY');
export const LOAD_CATEGORIES_SUCCESS = Symbol('LOAD_CATEGORIES_SUCCESS');

/****** Posts actions ******/

export const LOAD_POSTS_SUCCESS = Symbol('LOAD_POSTS_SUCCESS');

// [delete modals visibility]
export const SHOW_DELETE_POST_MODAL = Symbol('SHOW_DELETE_POST_MODAL');
export const HIDE_DELETE_POST_MODAL = Symbol('HIDE_DELETE_POST_MODAL');

// [edit and create]
export const START_EDIT_POST = Symbol('START_EDIT_POST');
export const START_CREATE_POST = Symbol('START_CREATE_POST');
export const CANCEL_FORM_POST = Symbol('CANCEL_FORM_POST');
export const POST_FORM_UPDATED = Symbol('POST_FORM_UPDATED');

// [vote posts]
export const BEGIN_VOTE_POST = Symbol('BEGIN_VOTE_POST');
export const VOTE_POST_SUCCESS = Symbol('VOTE_POST_SUCCESS');
export const END_VOTE_POST = Symbol('END_VOTE_POST');

// [deleting posts]
export const START_DELETING_POST = Symbol('START_DELETING_POST');
export const DELETE_POST_SUCCESS = Symbol('DELETE_POST_SUCCESS');
export const END_DELETING_POST = Symbol('END_DELETING_POST');

export const UPDATE_COMMENTS_COUNT = Symbol('UPDATE_COMMENTS_COUNT');

// [saving posts]
export const START_SAVING_POST = Symbol('START_SAVING_POST');
export const SAVING_POST_SUCCESS = Symbol('SAVING_POST_SUCCESS');
export const END_SAVING_POST = Symbol('END_SAVING_POST');
/****** Comments actions ******/

export const LOAD_COMMENTS_BY_PARENT_SUCCESS = Symbol('LOAD_COMMENTS_BY_PARENT_SUCCESS');

// [vote comments]
export const BEGIN_VOTE_COMMENT = Symbol('BEGIN_VOTE_COMMENT');
export const VOTE_COMMENT_SUCCESS = Symbol('VOTE_COMMENT_SUCCESS');
export const END_VOTE_COMMENT = Symbol('END_VOTE_COMMENT');

// [create comment form]
export const START_CREATE_COMMENT = Symbol('START_CREATE_COMMENT');
export const START_EDIT_COMMENT = Symbol('START_EDIT_COMMENT');
export const CANCEL_FORM_COMMENT = Symbol('CANCEL_FORM_COMMENT');
export const COMMENT_FORM_UPDATED = Symbol('COMMENT_FORM_UPDATED');

// [delete modals visibility]
export const SHOW_DELETE_COMMENT_MODAL = Symbol('SHOW_DELETE_COMMENT_MODAL');
export const HIDE_DELETE_COMMENT_MODAL = Symbol('HIDE_DELETE_COMMENT_MODAL');

// [saving comments]
export const START_SAVING_COMMENT = Symbol('START_SAVING_COMMENT');
export const SAVING_COMMENT_SUCCESS = Symbol('SAVING_COMMENT_SUCCESS');
export const END_SAVING_COMMENT = Symbol('END_SAVING_COMMENT');

// [deleting comments]
export const START_DELETING_COMMENT = Symbol('START_DELETING_COMMENT');
export const DELETE_COMMENT_SUCCESS = Symbol('DELETE_COMMENT_SUCCESS');
export const END_DELETING_COMMENT = Symbol('END_DELETING_COMMENT');
