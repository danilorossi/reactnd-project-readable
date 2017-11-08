import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import styled from 'styled-components';

import {
  loadCommentsByParent,
} from '../../actions/commentActions';

import {
  voteUp as votePostUpAPI,
  voteDown as votePostDownAPI,
  editPost,
  loadPostDetails
} from '../../actions/postActions';

import PostDetailsHeader from './postDetailsHeader';
import Comments from './comments';
// import PostForm from '../common/postForm';
import Votes from '../common/votes';

const Wrapper = styled.div`
  padding: 60px 40px;
`;
const StyledMeta = styled.div`
  fontSize: 0.9em;
  margin: 0 0 1em;
`;

const VoteWrapper = styled(Votes)`
  position: absolute;
  right: 0;
  top: 37px;
`;

class PostDetailsPage extends Component {

  constructor(props) {
    super(props);
    this.onEditPost = this.onEditPost.bind(this);
  }
  componentDidMount() {
    const postId = this.props.postDetails ? this.props.postDetails.id : this.props.postId;

    if(!this.props.postDetails) {
      this.props.loadPost(postId);
    }

    this.props.loadComments(postId);
  }

  onEditPost() {
    this.props.startEditPost(Object.assign({}, this.props.postDetails));
  }

  componentWillReceiveProps(nextProps) {
    if( this.props.postDetails === null && nextProps.postDetails && Object.keys(nextProps.postDetails).length === 0) {
      // TODO this should managed from rest service api
      this.props.history.replace('/');
    }
  }
  render() {

    const postDetails = this.props.postDetails;

    return (
      <Wrapper>

      {postDetails &&

        <div className="ui grid">

        <div className="three wide column">

           <VoteWrapper
            postId={postDetails.id}
            voteDown={this.props.votePostDown}
            voteUp={this.props.votePostUp}
            loading={this.props.votesAjaxStatus.postVotes[postDetails.id] || false}
            voteScore={postDetails.voteScore}
          />

        </div>

          <div className="ten wide column">

            <PostDetailsHeader post={postDetails} onEditPost={this.onEditPost}/>


            <h3 className="ui dividing header">
              {postDetails.title}
            </h3>

            <StyledMeta className="meta">
              <span className="cinema">@{postDetails.author}, </span>
              <span className="cinema"><TimeAgo date={postDetails.timestamp} /></span>
              <span> in <Link to={`/${postDetails.category}`}>#{postDetails.category}</Link></span>
            </StyledMeta>

            <div className="ui message">{postDetails.body}</div>

            <br />
            <Comments
              loadingStatus={this.props.votesAjaxStatus.commentVotes}
              postId={postDetails.id}

            />


          </div>
        </div>
      }

      </Wrapper>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return { // TODO if not, GET /post/:id
      postDetails: state.posts.store[ownProps.postId] || null,
      votesAjaxStatus: state.ajaxStatus
  };
}

function mapDispatchToProps (dispatch) {
  return {
    loadComments: (parentId) => dispatch(loadCommentsByParent(parentId)),
    startEditPost: (postData) => dispatch(editPost(postData)),
    votePostUp: (postId) => dispatch(votePostUpAPI(postId)),
    votePostDown: (postId) => dispatch(votePostDownAPI(postId)),
    loadPost: (postId) => dispatch(loadPostDetails(postId)),
  }
}




export default connect (
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostDetailsPage));
