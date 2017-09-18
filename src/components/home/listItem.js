import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

class ListItem extends Component {
  render() {

    const postData = this.props.data;

    const authorStyle = {
      fontSize: '0.9em',
      margin: '0 0 1em'
    };

    return (

        <div className="item">

          <div className="content">

            <a className="header">
              {postData.title}
            </a>


            <div className="counter">

              <a><i className="chevron up grey icon"></i></a>
              <a className="tiny orange ui label">2</a>
              <a><i className="chevron down grey icon"></i></a>
            </div>

            <div className="meta" style={authorStyle}>
              <span className="cinema">@{postData.author}, </span>
              <span className="cinema"><TimeAgo date={postData.timestamp} />.</span>
            </div>




                        <div className="description">
                          <p>{postData.body}</p>
                        </div>


            <div className="extra">
            {this.props.currentCategoryId === 'all' &&
              <Link to={`/posts/${postData.category}`} className="ui teal small label"># {postData.category}</Link>
            }


              <Link to={`/post/${postData.id}`} className="ui right floated basic very tiny orange button">
                Read
              </Link>

            </div>
          </div>
        </div>

    );
  }
}

export default ListItem;
