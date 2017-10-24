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

    return (

        <div className="item">

          <div className="content">

            <Link to={`/${postData.category}/${postData.id}`} title="View post details" className="header">
              {postData.title}
            </Link>

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
                <span>in <Link to={`/${postData.category}`}>#{postData.category}</Link></span>

              }

            </div>




            <div className="ui message">
              <p>{postData.body}</p>
            </div>


            <div className="extra">

              <Link to={`/${postData.category}/${postData.id}`} className="ui left floated mini orange button">
                View
              </Link>


              <button onClick={this.props.onDeletePostButtonClick} title="Delete post" className="ui right floated mini icon button">
                <i className="trash icon"></i>
              </button>

              <button onClick={this.props.onEditButtonClick} title="Edit post" className="ui right floated mini icon button">
                <i className="edit icon"></i>
              </button>


            </div>
          </div>
        </div>

    );
  }
}

export default ListItem;
