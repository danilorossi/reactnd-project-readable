import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (

      <div className="ui top inverted teal fixed fluid one menu">

        <div className="header  item">
          <i className="comment icon"></i> Readable Project
        </div>

        <div className="item right aligned">

          <Link to="/new-post" className="ui vertical right  floated teal animated button" tabIndex="0">
            <div className="hidden content">
            <i className="plus icon"></i>
            </div>
            <div className="visible content">
              New Post
            </div>
          </Link>

        </div>

      </div>

    );
  }
}

export default Navbar;
