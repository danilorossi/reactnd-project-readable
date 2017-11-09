import React from 'react';
import TimeAgo from 'react-timeago';

import Votes from '../common/votes';

const CommentItem = ({ comment, voteDown, voteUp, loadingStatus, onEdit, onDelete }) => {

  return (

    <div className="comment">

      <div className="avatar" style={{ margin: '0' }}>

        <Votes
          type="vertical"
          postId={comment.id}
          voteDown={voteDown}
          voteUp={voteUp}
          loading={loadingStatus[comment.id]}
          voteScore={comment.voteScore}
        />

      </div>

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
          <a onClick={() => onEdit(comment)}>Edit</a>
          <a onClick={() => onDelete(comment)}>Delete</a>
        </div>

      </div>

    </div>
  );
}

export default CommentItem;
