import React, { Component } from 'react';

import CommentItem from './commentItem';
import Loader from '../common/loader';
import CommentForm from './commentForm';

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



        <div style={{ position: 'relative'}} className="ui comments">

          {!this.props.comments && <Loader message={"Loading"} />}

          {this.props.comments && this.props.comments.length === 0 &&
            <h3>NO COMMENTS</h3>
          }

          {this.props.comments && this.props.comments.map(comment => (
            <CommentItem
              {...commentVoteScoreAttrs}
              deleteComment={this.props.deleteComment}
              onEditComment={this.props.onEditComment}
              key={comment.id}
              comment={comment} />
          ))}

        </div>

        <CommentForm parentId={this.props.postId}/>

      </div>
    );
  }
}

export default Comments;
