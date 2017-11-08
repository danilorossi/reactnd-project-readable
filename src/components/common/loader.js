import React from 'react';
import styled from 'styled-components';

const StyledLoader = styled.div`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100px;
`;

const Loader = ({ message }) => {
  return (
    <StyledLoader className="ui blurring segment">
      <div className="ui active inverted dimmer">
        <div className="ui text loader">{message}</div>
      </div>
    </StyledLoader>
  );
}
export default Loader;
