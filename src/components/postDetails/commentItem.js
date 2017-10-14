import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { connect } from 'react-redux';
import { RIETextArea } from 'riek';

import { updateComment } from '../../actions/commentActions';
import Votes from '../common/votes';

class CommentItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      futureCommentText: '',
      commentText: (props.comment && props.comment.body ) || ''
    }
    this.updateComment = this.updateComment.bind(this);
  }
 
  updateComment(data) {
    console.log('######### TODO > future comment text?', data)
    this.setState({
      commentText: data.commentText
    }, () => this.props.update(this.props.comment.id, data.commentText));
  }
  render() {
    const comment = this.props.comment;

    return (
        <div className="ui comments">
          <div className="comment">
          <a className="avatar" style={{ margin: '0' }}>
          <Votes
            type="vertical"
            postId={this.props.comment.id}
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

                {this.props.updateCommentAjaxStatus &&
                  <div>
                  <i className={`ui active mini inline loader`}> </i>
                  <span style={{ color: 'grey' }}> {this.state.commentText}</span>
                  </div>
                }

                {!this.props.updateCommentAjaxStatus &&
                  <RIETextArea
                    rows="4"
                    className="riei-field"
                    value={this.state.commentText}
                    change={this.updateComment}
                    propName='commentText'
                    validate={(newValue) => (newValue && newValue.length > 0)}
                  />
                }
                </div>

              <div className="actions">

                  <a className="reply">Delete</a>

              </div>

            </div>
          </div>
        </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    update: (commentId, body) => dispatch(updateComment(commentId, body)),
  }
}
function mapStateToProps(state, ownProps) {
  return {
    updateCommentAjaxStatus: state.ajaxStatus.commentBodies[ownProps.comment.id] || false
  };
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(CommentItem);
// export default CommentItem;
