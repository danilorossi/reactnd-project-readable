import React from 'react';
import { PropTypes } from 'prop-types';

const Loader = ({ message }) => {
  return (
    <div className="ui blurring segment" style={{ minHeight: '100px' }}>
      <div className="ui active inverted dimmer">
        <div className="ui text loader">{message}</div>
      </div>
    </div>
  );
}
export default Loader;
