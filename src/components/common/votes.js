import React from 'react';

const Votes = ({ type, voteScore, style }) => {

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
      counterStyle = { padding: '3px 10px' };
      buttonLeft = { padding: '0' };
      buttonRight = { padding: '0' };
      showIcon = false;
      if(score > 100) {
        counterStyle = { padding: '5px' };
        score = '99+';
      }
      break;

    default:
      counterStyle = { padding: '5px 7px' };
      buttonLeft = { paddingRight: '3px' };
      buttonRight = { paddingLeft: '3px' };

  }

  return (
    <div title={`${voteScore} votes`} className="right floated" style={{ display: 'inline-block', textAlign: 'center', ...(style || {}) }}>

    <button
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

      <a
        style={{
          margin: '0',
          verticalAlign: 'middle',
          ...counterStyle,
        }}
        className={`ui basic mini button ${mainColor}`}>
        {showIcon && <i className="heart icon"></i>}
        {score}
      </a>

      <button
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
