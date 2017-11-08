import React from 'react';
import styled from 'styled-components';

const StyledContentWrapper = styled.div`
  width: calc(100% - 260px);
  margin-top: 48px;
`;

const ContentWrapper = ({ children }) => {
  return (
    <StyledContentWrapper className="pusher">
      { children }
    </StyledContentWrapper>
  );
}

export default ContentWrapper;
