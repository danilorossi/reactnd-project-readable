import React from 'react';
import { PropTypes } from 'prop-types';

const NoResults = ({ categoryId }) => {
  return (
    <div>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

      <div className="ui center aligned container">

        <h2 className="ui sub header">
          Sorry!
        </h2>
        <span>No posts found in <strong># {categoryId}</strong></span>

      </div>

    </div>
  );
}
export default NoResults;
