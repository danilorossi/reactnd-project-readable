import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';

import Votes from '../common/votes';

class ListItem extends Component {
  render() {

    const postData = this.props.data;

    const authorStyle = {
      fontSize: '0.9em',
      margin: '0 0 1em'
    };

    // voteUp={this.props.voteUp}
    // voteDown={this.props.voteDown}
    // loading
    //
    return (

        <div className="item">

          <div className="content">

            <a className="header">
              {postData.title}

            </a>

            <Votes
              postId={postData.id}
              voteDown={this.props.voteDown}
              voteUp={this.props.voteUp}
              loading={this.props.loading}
              voteScore={postData.voteScore}/>

            <div className="meta" style={authorStyle}>


              <span className="cinema">@{postData.author},</span>
              <span className="cinema"><TimeAgo date={postData.timestamp} /></span>

              {this.props.currentCategoryId === 'all' &&
                <span>in <Link to={`/posts/${postData.category}`}>#{postData.category}</Link></span>

              }

            </div>




            <div className="ui message">
              <p>{postData.body}</p>
            </div>


            <div className="extra">

              <Link to={`/post/${postData.id}`} className="ui left floated mini orange button">
                View post
              </Link>

            </div>
          </div>
        </div>

    );
  }
}

export default ListItem;
