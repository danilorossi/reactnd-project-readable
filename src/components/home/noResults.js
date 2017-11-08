import React from 'react';
import styled from 'styled-components';

const NoResultsWrapper = styled.div`
  padding-top: 10%;
`;

const NoResults = ({ categoryId }) => {
  return (
    <NoResultsWrapper>

      <div className="ui center aligned container">

        <h2 className="ui sub header">
          Sorry!
        </h2>
        <span>
          No posts found
          { categoryId !== 'all' &&
            (<span> in <strong>#{categoryId}</strong></span>)
          }
        </span>

      </div>

    </NoResultsWrapper>
  );
}
export default NoResults;
