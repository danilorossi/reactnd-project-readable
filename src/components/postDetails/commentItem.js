import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

class CommentItem extends Component {

  render() {
    const comment = this.props.comment;

    return (
        <div className="ui comments">
          <div className="comment">
          <a className="avatar">
           <img src="/assets/defaultUserAvatar.small.png" />
         </a>
            <div className="content">
              <a className="author">@{comment.author}</a>
              <div className="metadata">
               <div className="date"><TimeAgo date={comment.timestamp} /></div>
             </div>
              <div className="text">

                <span>VOTES: {comment.voteScore} - </span>

                {comment.body}
              </div>
              <div className="actions">
                <a className="edit">Edit</a>
                <a className="reply">Delete</a>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default CommentItem;
