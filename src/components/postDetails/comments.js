import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import CommentItem from './commentItem';
import Loader from '../common/loader';

class Comments extends Component {

  render() {

    const commentVoteScoreAttrs = {
      voteUp: this.props.voteUp,
      voteDown: this.props.voteDown,
      loadingStatus: this.props.loadingStatus
    };
    return (
      <div>

        <h4 className="ui dividing header">{this.props.comments === null ? '-' : this.props.comments.length} comment(s)</h4>

        {!this.props.comments && <Loader message={"Loading"} />}

        <div className="ui comments">

          {this.props.comments && this.props.comments.length == 0 &&
            <h3>NO COMMENTS</h3>
          }

          {this.props.comments && this.props.comments.map(comment => (
            <CommentItem
              {...commentVoteScoreAttrs}
              key={comment.id}
              comment={comment} />
          ))}

        </div>
        {this.props.comments &&
            <div>
          <h4 className="ui dividing header">Leave a comment:</h4>

          <form className="ui reply form">
            <div className="field">
              <textarea placeholder="Your comment here!" rows="3"></textarea>
            </div>
            <div className="field">
             <input type="text" placeholder="Leave your name!" name="name" />
            </div>
            <div className="ui teal labeled submit icon button">
              <i className="icon save"></i> Add comment
            </div>
          </form>
            </div>
        }

      </div>
    );
  }
}

export default Comments;
