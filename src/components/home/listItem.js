import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';

import Votes from '../common/votes';

const StyledItem = styled.div`
  :not(:first-child) {
    border-top: 1px solid rgb(27, 28, 29) !important;
  }
`;

const StyledMeta = styled.div`
  fontSize: 0.9em;
  margin: 0 0 1em;
`;

const ListItem = ({
  data,
  voteDown,
  voteUp,
  loading,
  voteScore,
  currentCategoryId,
  onEditButtonClick,
  onDeletePostButtonClick
}) => {

  return (

      <StyledItem className="item">

        <div className="content">

          <Link to={`/${data.category}/${data.id}`} title="View post details" className="header">
            {data.title}
          </Link>

          <Votes
            postId={data.id}
            voteDown={voteDown}
            voteUp={voteUp}
            loading={loading}
            voteScore={data.voteScore}/>

          <StyledMeta className="meta">

            <span className="cinema">@{data.author},</span>
            <span className="cinema"><TimeAgo date={data.timestamp} /></span>

            {currentCategoryId === 'all' &&
              <span>in <Link to={`/${data.category}`}>#{data.category}</Link></span>
            }

            <span className="cinema" title={`${data.commentCount || 0} comment(s) in this post`}> - {data.commentCount || 0} <i className="medium comment outline icon"/></span>

          </StyledMeta>

          <div className="ui message">
            <p>{data.body}</p>
          </div>

          <div className="extra">

            <Link to={`/${data.category}/${data.id}`} className="ui left floated mini orange button">
              View
            </Link>

            <button onClick={onEditButtonClick} title="Edit post" className="left floated circular mini basic  ui icon button">
              <i className="pencil icon"></i>
            </button>

            <button onClick={onDeletePostButtonClick} title="Delete post" className="left floated circular mini basic ui icon button">
              <i className="trash icon"></i>
            </button>

          </div>
        </div>

      </StyledItem>

  );
}

export default ListItem;
