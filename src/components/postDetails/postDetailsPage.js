import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';

import PostDetailsHeader from './postDetailsHeader';

class PostDetailsPage extends Component {

  render() {
    const authorStyle = {
      fontSize: '0.9em',
      margin: '0 0 1em'
    };
    const postDetails = this.props.postDetails[0];
    return (
      <div style={{ padding: '60px 40px'}}>
        <PostDetailsHeader />

        <h3 className="ui dividing header">{postDetails.title}</h3>

        <div className="meta" style={authorStyle}>
          <span className="cinema">@{postDetails.author}, </span>
          <span className="cinema"><TimeAgo date={postDetails.timestamp} />.</span>
        </div>

        <p>{postDetails.body}</p>



        <h4 className="ui dividing header">Comments</h4>
        <pre>{JSON.stringify(postDetails, null, 2)}</pre>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return { // TODO if not, GET /post/:id
      postDetails: state.postsByCategory.all.filter(post => (post.id === ownProps.postId && post.deleted === false))
  };
}

export default connect (
  mapStateToProps
)(PostDetailsPage);
// export default PostDetailsPage;
