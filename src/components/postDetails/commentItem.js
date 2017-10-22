import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { connect } from 'react-redux';

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
      <div className="ui comments">
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

           </div>

            <div className="text">
              <p>{comment.body}</p>
            </div>

            <div className="actions">
              <a onClick={() => this.props.onEditComment(comment)}>Edit</a>
              <a onClick={() => this.props.deleteComment(comment.id)}>Delete</a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
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
