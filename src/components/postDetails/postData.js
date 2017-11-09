import React from 'react';
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledMeta = styled.div`
  fontSize: 0.9em;
  margin: 0 0 1em;
`;

const PostData = ({ data }) => {

  return (
    <div>
      <h3 className="ui dividing header">
        {data.title}
      </h3>

      <StyledMeta className="meta">
        <span className="cinema">@{data.author}, </span>
        <span className="cinema"><TimeAgo date={data.timestamp} /></span>
        <span> in <Link to={`/${data.category}`}>#{data.category}</Link></span>
      </StyledMeta>

      <div className="ui message">{data.body}</div>
    </div>
  );
}

export default PostData;
