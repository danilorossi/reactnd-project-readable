import React from 'react';

const Votes = ({ size, voteScore }) => {

  let counterStyle = {};

  switch(size) {

    case 'small':
      counterStyle = { padding: '3px 7px' };
      break;

    default:
      counterStyle = {
        paddingLeft: '10px',
        paddingRight: '10px',
      }

  }

  return (
    <div className="right floated" style={{ display: 'inline-block'}}>

    <button
      style={{
        margin: '0',
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
        background: 'transparent',
        paddingRight: '3px'
      }}
      className="ui icon mini button">
      <i className="minus teal icon"></i>
    </button>

      <a
        style={{
          margin: '0',
          verticalAlign: 'middle',
          ...counterStyle,
        }}
        className="ui basic mini teal button">
        <i className="heart icon"></i>
        {voteScore}
      </a>

      <button
        style={{
          margin: '0',
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0',
          background: 'transparent',
          paddingLeft: '3px'
        }}
        className="ui icon mini button">
        <i className="plus teal icon"></i>
      </button>

    </div>

  )
}

export default Votes;
