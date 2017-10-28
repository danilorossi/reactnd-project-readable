import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';

import {
  loadCommentsByParent,
} from '../../actions/commentActions';

import {
  voteUp as votePostUpAPI,
  voteDown as votePostDownAPI,
  editPost
} from '../../actions/postActions';

import PostDetailsHeader from './postDetailsHeader';
import Comments from './comments';
// import PostForm from '../common/postForm';
import Votes from '../common/votes';

class PostDetailsPage extends Component {

  constructor(props) {
    super(props);
    this.onEditPost = this.onEditPost.bind(this);
  }
  componentDidMount() {
    this.props.loadComments(this.props.postDetails.id);
    // setTimeout(() => {
    //   toast.info('You can edit the post and the comments by clicking on them.');
    // }, 2000);
  }

  // componentWillReceiveProps(newProps) {
  //
  //   if(!newProps.postDetails) {
  //     console.log('asdasdadsadsa', this.props.history.push('/'))
  //   }
  // }

  onEditPost() {
    this.props.startEditPost(Object.assign({}, this.props.postDetails));
  }

  render() {

    const authorStyle = {
      fontSize: '0.9em',
      margin: '0 0 1em'
    };
    const postDetails = this.props.postDetails;

    return (
      <div style={{ padding: '60px 40px'}}>

      {/*<ToastContainer
          position="top-right"
          type="default"
          autoClose={15000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />*/}

      {postDetails &&

        <div className="ui grid">

        <div className="three wide column">

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

          <div className="ten wide column">

            <PostDetailsHeader post={postDetails} onEditPost={this.onEditPost}/>


            <h3 className="ui dividing header">
              {postDetails.title}
            </h3>

            <div className="meta" style={authorStyle}>

              <span className="cinema">@{postDetails.author}, </span>
              <span className="cinema"><TimeAgo date={postDetails.timestamp} /></span>
              <span> in <Link to={`/${postDetails.category}`}>#{postDetails.category}</Link></span>
            </div>

            <div className="ui message">{postDetails.body}</div>

            <br />
            <Comments
              loadingStatus={this.props.votesAjaxStatus.commentVotes}
              postId={postDetails.id}

            />


          </div>
        </div>
      }

      </div>
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
    // deleteComment: (commentId) => dispatch(showDeleteCommentModal(commentId)),
    // startEditComment: (commentData) => dispatch(editComment(commentData))

  }
}




export default connect (
  mapStateToProps,
  mapDispatchToProps
)(PostDetailsPage);
// export default PostDetailsPage;
