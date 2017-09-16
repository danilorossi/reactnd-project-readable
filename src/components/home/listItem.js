import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListItem extends Component {
  render() {
    return (

        <div className="item">
          <div className="content">

            <div className="counter">

              <a><i className="chevron up grey icon"></i></a>
              <a className="tiny orange ui label">2</a>
              <a><i className="chevron down grey icon"></i></a>
            </div>


            <a className="header">12 Years a Slave</a>

            <div className="meta">
              <span className="cinema">Union Square 14</span>
            </div>
            <div className="description">
              <p></p>
            </div>

            <div className="extra">
            {this.props.currentCategoryId === 'all' &&
              <Link to="/posts/redux" className="ui teal small label"># redux</Link>
            }


              <Link to="/post/23" className="ui right floated basic very tiny orange button">
                Read
              </Link>

            </div>
          </div>
        </div>

    );
  }
}

export default ListItem;
