import React from 'react';

const Votes = ({ voteScore }) => {
  return (
    <div className="right floated" style={{ display: 'inline-block'}}>

    <button
      style={{
        margin: '0',
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0'
      }}
      className="ui icon mini button">
      <i className="minus icon"></i>
    </button>

      <a
        style={{
          margin: '0',
          borderRadius: '0',
          paddingLeft: '10px',
          paddingRight: '10px',
          verticalAlign: 'middle'
        }}
        className="ui basic mini teal button">
        <i className="heart icon"></i>
        {voteScore}
      </a>

      <button
        style={{
          margin: '0',
          borderTopLeftRadius: '0',
          borderBottomLeftRadius: '0'
        }}
        className="ui icon mini button">
        <i className="plus icon"></i>
      </button>

    </div>

  )
}

export default Votes;
