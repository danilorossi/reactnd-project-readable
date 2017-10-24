import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { connect } from 'react-redux';

import {
  showDeleteCommentModal,
  editComment
} from '../../actions/commentActions';

// import { updateComment } from '../../actions/commentActions';
import Votes from '../common/votes';

class CommentItem extends Component {

  // constructor(props) {
  //   super(props);
  // }
  //
  //
  render() {
    const comment = this.props.comment;

    return (

      <div className="comment">
        <a className="avatar" style={{ margin: '0' }}>
        <Votes
          type="vertical"
          postId={comment.id}
          voteDown={this.props.voteDown}
          voteUp={this.props.voteUp}
          loading={this.props.loadingStatus[comment.id]}
          voteScore={comment.voteScore}
        />
       </a>
          <div className="content">

            <div className="metadata" style={{ marginLeft: '0' }}>
            <a className="author">@{comment.author},</a>
            <div className="date"><TimeAgo date={comment.timestamp} /></div>
            {comment.lastModified && <span className="date"> (last modified <TimeAgo date={comment.lastModified} />)</span>}

           </div>

            <div className="text">
              <p>{comment.body}</p>
            </div>

            <div className="actions">
              <a onClick={() => this.props.startEditComment(comment)}>Edit</a>
              <a onClick={() => this.props.deleteComment(comment)}>Delete</a>
            </div>

          </div>
        </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    deleteComment: (comment) => dispatch(showDeleteCommentModal(comment)),
    startEditComment: (commentData) => dispatch(editComment(commentData))
    // update: (commentId, body) => dispatch(updateComment(commentId, body)),
  }
}
function mapStateToProps(state, ownProps) {
  return {
    // updateCommentAjaxStatus: state.ajaxStatus.commentBodies[ownProps.comment.id] || false
  };
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(CommentItem);
// export default CommentItem;
