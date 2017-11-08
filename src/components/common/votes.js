import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  margin: 0 !important;
  background: transparent !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  padding-right: ${props => (props['data-left'] && props.type === 'normal') ? '3px' : '-'} !important;
  padding-left: ${props => (props['data-right'] && props.type === 'normal') ? '3px' : '-'} !important;
`;

const Wrapper = styled.div`
  display: inline-block;
  textAlign: center;
`;

const getScoreLabel = score => {
  if(score >= 10) {
    return '> 9'
  } else if(score <= -10) {
    return '< -9'
  } else {
    return score;
  }
};

const getMainColor = score => {
  if(score === 0) {
    return 'grey';
  } else if(score < 0) {
    return 'red';
  } else {
    return 'green';
  }
}

const getCounterPadding = (voteScore, loading, type) => {
  switch(type) {

    case 'vertical':
      if(+voteScore >= 10) {
        return '5px';
      } else if(+voteScore <= -10) {
        return '5px';
      } else {
        return `${loading?'2px':'3px'} ${loading?'5px':'10px'}`;
      }

    default:
      return `${loading?'4px':'5px'} 7px`;
  }
}

const Votes = ({ className, type, voteScore, style, loading, voteUp, voteDown, postId }) => {

  const showIcon = type !== 'vertical';
  const score = getScoreLabel(voteScore);
  const mainColor = getMainColor(voteScore);

  const CounterWrapper = styled.div`
    margin: 0;
    verticalAlign: middle;
    padding: ${getCounterPadding(voteScore, loading, type)} !important;
  `;

  const SpinnerWrapper = styled.div`
    display: inline-block !important;
    marginRight: ${type === 'vertical' ? '0' : '6px'} !important;
  `;

  const buttonExtraAttrs = {
    [loading ? 'disabled':'enabled']: true,
    type: type || 'normal'
  };

  return (
    <Wrapper className={`${className} right floated`}>

      <StyledButton data-left
        {...buttonExtraAttrs}
        title="Vote up"
        onClick={() => voteUp(postId)}
        className="ui icon mini button">
        <i className={`plus ${mainColor} icon`}></i>
      </StyledButton>

      <CounterWrapper
        title={`${voteScore} votes`}
        className={`ui basic mini button ${mainColor}`}>

        {!loading && showIcon && <i className="heart icon"></i>}
        {loading && <SpinnerWrapper className={`ui active mini ${mainColor} centered inline loader`}></SpinnerWrapper>}
        {!loading && score}

      </CounterWrapper>

      <StyledButton data-right
        {...buttonExtraAttrs}
        title="Vote down"
        onClick={() => voteDown(postId)}
        className="ui icon mini button">
        <i className={`minus ${mainColor} icon`}></i>
      </StyledButton>

    </Wrapper>

  )
}

export default Votes;
