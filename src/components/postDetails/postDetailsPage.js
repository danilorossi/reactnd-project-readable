import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';

import { loadCommentsByParent } from '../../actions/commentActions';

import PostDetailsHeader from './postDetailsHeader';
import Comments from './comments';

class PostDetailsPage extends Component {

  componentDidMount() {
    this.props.loadComments(this.props.postDetails.id);
  }
  render() {

    const authorStyle = {
      fontSize: '0.9em',
      margin: '0 0 1em'
    };
    const postDetails = this.props.postDetails;

    return (
      <div style={{ padding: '60px 40px'}}>


        <div className="ui two column centered grid">
          <div className="column">

            <PostDetailsHeader />

            <h3 className="ui dividing header">
              ({postDetails.voteScore}) {postDetails.title}
              <Link to={`/posts/${postDetails.category}`} className="ui teal small label"># {postDetails.category}</Link>

            </h3>

            <div className="meta" style={authorStyle}>

              <span className="cinema">@{postDetails.author}, </span>
              <span className="cinema"><TimeAgo date={postDetails.timestamp} />.</span>
            </div>

            <p>{postDetails.body}</p>

            <Comments postId={postDetails.id} comments={this.props.comments}/>


          </div>
        </div>


      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return { // TODO if not, GET /post/:id
      postDetails: state.postsByCategory.all.filter(post => (post.id === ownProps.postId))[0] || null,
      comments: state.commentsByParentId[ownProps.postId] || null
  };
}

function mapDispatchToProps (dispatch) {
  return {
    loadComments: (parentId) => dispatch(loadCommentsByParent(parentId))
  }
}




export default connect (
  mapStateToProps,
  mapDispatchToProps
)(PostDetailsPage);
// export default PostDetailsPage;
