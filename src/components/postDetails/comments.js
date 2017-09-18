import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import CommentItem from './commentItem';

class Comments extends Component {

  render() {
    console.log(this.props.comments);
    return (
      <div>

        <h4 className="ui dividing header">{this.props.comments === null ? '-' : this.props.comments.length} comment(s)</h4>

        {!this.props.comments && <h3>LOADING</h3>}

        <div className="ui comments">

          {this.props.comments && this.props.comments.length == 0 &&
            <h3>NO COMMENTS</h3>
          }

          {this.props.comments && this.props.comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}

        </div>
        {this.props.comments &&
          <form className="ui reply form">
            <div className="field">
              <textarea rows="2"></textarea>
            </div>
            <div className="ui teal labeled submit icon button">
              <i className="icon save"></i> Add comment
            </div>
          </form>
        }

      </div>
    );
  }
}

export default Comments;
