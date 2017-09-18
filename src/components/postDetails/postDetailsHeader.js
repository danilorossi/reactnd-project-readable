import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class PostDetailsHeader extends Component {
  render() {
    return (

      <div className="ui top inverted teal fixed fluid one menu">

      <div className="item left aligned">

        <Link to="/" className="ui vertical right  floated teal animated button" tabIndex="0">
          <div className="hidden content">
          <i className="chevron left icon"></i>
          </div>
          <div className="visible content">
            Back
          </div>
        </Link>

      </div>

        <div className="item right aligned">

        <Link to="/new-post" className="ui vertical right  floated teal animated button" tabIndex="0">
          <div className="hidden content">
          <i className="edit icon"></i>
          </div>
          <div className="visible content">
            Edit
          </div>
        </Link>

        </div>

        <div className="item">

          <Link to="/new-post" className="ui red icon button" tabIndex="2">
            <i className="delete icon"></i> Delete
          </Link>

        </div>

      </div>

    );
  }
}

export default PostDetailsHeader;
