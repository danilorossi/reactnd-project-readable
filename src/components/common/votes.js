import React from 'react';

const Votes = ({ type, voteScore, style, loading, voteUp, voteDown, postId }) => {

  let counterStyle = {};
  let buttonLeft = {};
  let buttonRight = {};
  let showIcon = true;
  let score = +voteScore;
  let mainColor = 'green';
  if(score === 0) {
    mainColor = 'grey';
  } else if(score < 0) {
    mainColor = 'red';
  }

  switch(type) {

    case 'vertical':
      buttonLeft = { padding: '0' };
      buttonRight = { padding: '0' };
      showIcon = false;
      if(score > 100) {
        counterStyle = { padding: '5px' };
        score = '> 99';
      } else if(score < -100) {
        counterStyle = { padding: '5px' };
        score = '< 99';
      } else {
        counterStyle = { padding: `${loading?'2px':'3px'} ${loading?'5px':'10px'}`  };
      }
      break;

    default:
      counterStyle = { padding: `${loading?'4px':'5px'} 7px`};
      buttonLeft = { paddingRight: '3px' };
      buttonRight = { paddingLeft: '3px' };

  }

  const spinnerStyle={
    display: 'inline-block',
    marginRight: type === 'vertical' ? '0' : '6px'
  };

  const buttonExtraAttrs = {};
  if(loading) buttonExtraAttrs.disabled = true;

  return (
    <div className="right floated" style={{ display: 'inline-block', textAlign: 'center', ...(style || {}) }}>

    <button
      {...buttonExtraAttrs}
      title="Vote up"
      onClick={() => voteUp(postId)}
      style={{
        margin: '0',
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
        background: 'transparent',
        ...buttonLeft
      }}
      className="ui icon mini button">
      <i className={`plus ${mainColor} icon`}></i>
    </button>

      <div
        title={`${voteScore} votes`}
        style={{
          margin: '0',
          verticalAlign: 'middle',
          ...counterStyle,
        }}
        className={`ui basic mini button ${mainColor}`}>
        {!loading && showIcon && <i className="heart icon"></i>}
        {loading && <div style={spinnerStyle} className={`ui active mini ${mainColor} centered inline loader`}></div>}
        {!loading && score}
        {loading && showIcon && '-'}

      </div>

      <button
        {...buttonExtraAttrs}
        title="Vote down"
        onClick={() => voteDown(postId)}
        style={{
          margin: '0',
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
          background: 'transparent',
          ...buttonRight
        }}
        className="ui icon mini button">
        <i className={`minus ${mainColor} icon`}></i>
      </button>

    </div>

  )
}

export default Votes;
