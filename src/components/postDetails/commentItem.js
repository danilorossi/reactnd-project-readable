import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import { RIETextArea } from 'riek';

class CommentItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commentText: (props.comment && props.comment.body ) || ''
    }
    this.updateComment = this.updateComment.bind(this);
  }

  updateComment(data) {
    this.setState({commentText: data.commentText});
    console.log('updateComment', arguments);
  }
  render() {
    const comment = this.props.comment;

    return (
        <div className="ui comments">
          <div className="comment">
          <a className="avatar">
           <img src="/assets/defaultUserAvatar.small.png" />
         </a>
            <div className="content">
              <a className="author"><span>VOTES: {comment.voteScore} - </span> @{comment.author}</a>
              <div className="metadata">
               <div className="date"><TimeAgo date={comment.timestamp} /></div>
             </div>

                <div className="text">
                  <RIETextArea
                    rows="4"
                    className="riei-field"
                    value={this.state.commentText}
                    change={this.updateComment}
                    propName='commentText'
                    validate={(newValue) => (newValue && newValue.length > 0)}
                  />
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

export default CommentItem;
