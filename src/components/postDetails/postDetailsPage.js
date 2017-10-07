import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { RIETextArea } from 'riek';

import {
  loadCommentsByParent,
  voteUp as voteCommentUpAPI,
  voteDown as voteCommentDownAPI
} from '../../actions/commentActions';

import {
  voteUp as votePostUpAPI,
  voteDown as votePostDownAPI
} from '../../actions/postActions';

import { editPost } from '../../actions/postFormActions';

import PostDetailsHeader from './postDetailsHeader';
import Comments from './comments';
import PostForm from '../common/postForm';
import Votes from '../common/votes';

class PostDetailsPage extends Component {

  constructor(props) {
    super(props);
    this.onEditPost = this.onEditPost.bind(this);
  }
  componentDidMount() {
    this.props.loadComments(this.props.postDetails.id);
    setTimeout(() => {
      toast.info('You can edit the post and the comments by clicking on them.');
    }, 2000);
  }

  onEditPost() {
    this.props.editPost(Object.assign({}, this.props.postDetails));
  }
  render() {

    const authorStyle = {
      fontSize: '0.9em',
      margin: '0 0 1em'
    };
    const postDetails = this.props.postDetails;

    return (
      <div style={{ padding: '60px 40px'}}>

        <ToastContainer
          position="top-right"
          type="default"
          autoClose={15000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />

        <PostForm show={this.props.postForm.visible} data={this.props.postForm.data}/>

        <div className="ui grid">

        <div className="four wide column">

          <Votes
            postId={postDetails.id}
            voteDown={this.props.votePostDown}
            voteUp={this.props.votePostUp}
            loading={this.props.votesAjaxStatus.postVotes[postDetails.id] || false}
            voteScore={postDetails.voteScore}
            style={{
              position: 'absolute',
              right: '0',
              top: '37px'
          }}/>

        </div>

          <div className="eight wide column">

            <PostDetailsHeader postId={postDetails.id} onEditPost={this.onEditPost}/>


            <h3 className="ui dividing header">
              {postDetails.title}
            </h3>

            <div className="meta" style={authorStyle}>

              <span className="cinema">@{postDetails.author}, </span>
              <span className="cinema"><TimeAgo date={postDetails.timestamp} /></span>
              <span> in <Link to={`/posts/${postDetails.category}`}>#{postDetails.category}</Link></span>
            </div>

            <div className="ui message">{postDetails.body}</div>
          {/*  <p>
              <RIETextArea
                rows="4"
                className="riei-field"
                value={this.state.postBody}
                change={this.updatePostBody}
                propName='postBody'
                validate={(newValue) => (newValue && newValue.length > 0)}
              />
            </p>*/}

            <br />
            <Comments
              voteUp={this.props.voteCommentUp}
              voteDown={this.props.voteCommentDown}
              loadingStatus={this.props.votesAjaxStatus.commentVotes}
              postId={postDetails.id}
              comments={this.props.comments}
            />


          </div>
        </div>


      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return { // TODO if not, GET /post/:id
      //postDetails: state.postsByCategory.all.filter(post => (post.id === ownProps.postId))[0] || null,
      postDetails: state.posts.store[ownProps.postId] || null,
      comments: state.commentsByParentId[ownProps.postId] || null,
      postForm: state.postForm,
      // TODO change once store is normalized
      votesAjaxStatus: state.ajaxStatus
  };
}

function mapDispatchToProps (dispatch) {
  return {
    loadComments: (parentId) => dispatch(loadCommentsByParent(parentId)),
    editPost: (postData) => dispatch(editPost(postData)),
    voteCommentUp: (commentId) => dispatch(voteCommentUpAPI(commentId)),
    voteCommentDown: (commentId) => dispatch(voteCommentDownAPI(commentId)),
    votePostUp: (postId) => dispatch(votePostUpAPI(postId)),
    votePostDown: (postId) => dispatch(votePostDownAPI(postId))
  }
}




export default connect (
  mapStateToProps,
  mapDispatchToProps
)(PostDetailsPage);
// export default PostDetailsPage;
