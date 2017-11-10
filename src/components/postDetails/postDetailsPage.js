import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  loadCommentsByParent,
} from '../../actions/commentActions';

import {
  voteUp as votePostUpAPI,
  voteDown as votePostDownAPI,
  editPost,
  loadPostDetails,
  showDeletePostModal
} from '../../actions/postActions';

import PostDetailsHeader from './postDetailsHeader';
import Comments from './comments';
import PostData from './postData';
import Votes from '../common/votes';

const Wrapper = styled.div`
  padding: 60px 40px;
`;

const VoteWrapper = styled(Votes)`
  position: absolute;
  right: 0;
  top: 37px;
`;

const Grid = ({ children }) => {
  return <div className="ui grid">{ children }</div>
}
const Column = ({ children, size }) => {
  return <div className={`${size} wide column`}>{ children }</div>
}

class PostDetailsPage extends Component {

  componentDidMount() {
    const postId = this.props.postDetails ? this.props.postDetails.id : this.props.postId;

    if(!this.props.postDetails) {
      this.props.loadPost(postId);
    }

    this.props.loadComments(postId);
  }


  componentWillReceiveProps(nextProps) {
    if( this.props.postDetails === null && nextProps.postDetails && Object.keys(nextProps.postDetails).length === 0) {
      // TODO this should managed from rest service api
      this.props.history.replace('/not-found');
    }
  }

  render() {

    const postDetails = this.props.postDetails;

    return (
      <Wrapper>

      {postDetails &&

        <Grid>

          <Column size="three">

             <VoteWrapper
              postId={postDetails.id}
              voteDown={this.props.votePostDown}
              voteUp={this.props.votePostUp}
              loading={this.props.votesAjaxStatus.postVotes[postDetails.id] || false}
              voteScore={postDetails.voteScore}
            />

          </Column>

          <Column size="ten">

            <PostDetailsHeader
              post={postDetails}
              onEditPost={this.props.startEditPost}
              onDeletePost={this.props.deletePost}/>

            <PostData data={postDetails} />

            <br />

            <Comments
              loadingStatus={this.props.votesAjaxStatus.commentVotes}
              postId={postDetails.id}
            />

          </Column>

        </Grid>
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
    loadPost: (postId) => dispatch(loadPostDetails(postId)),
    loadComments: (parentId) => dispatch(loadCommentsByParent(parentId)),
    startEditPost: (postData) => dispatch(editPost(postData)),
    deletePost: (data) => dispatch(showDeletePostModal(data, '/')),
    votePostUp: (postId) => dispatch(votePostUpAPI(postId)),
    votePostDown: (postId) => dispatch(votePostDownAPI(postId)),
  }
}




export default connect (
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PostDetailsPage));
