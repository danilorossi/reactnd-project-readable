import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import TimeAgo from 'react-timeago';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { RIETextArea } from 'riek';

import { loadCommentsByParent } from '../../actions/commentActions';

import PostDetailsHeader from './postDetailsHeader';
import Comments from './comments';

class PostDetailsPage extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     postBody: (props.postDetails && props.postDetails.body ) || ''
  //   }
  //   this.updatePostBody = this.updatePostBody.bind(this);
  // }

  // updatePostBody(data) {
  //   this.setState({postBody: data.postBody});
  //   console.log('updatePostBody', arguments);
  // }

  componentDidMount() {
    this.props.loadComments(this.props.postDetails.id);
    setTimeout(() => {
      toast.info('You can edit the post and the comments by clicking on them.');
    }, 2000);
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

        <div className="ui grid">

        <div className="four wide column">

        </div>

          <div className="eight wide column">

            <PostDetailsHeader postId={postDetails.id}/>

            <h3 className="ui dividing header">
              ({postDetails.voteScore}) {postDetails.title}
              <Link to={`/posts/${postDetails.category}`} className="ui teal small label"># {postDetails.category}</Link>

            </h3>

            <div className="meta" style={authorStyle}>

              <span className="cinema">@{postDetails.author}, </span>
              <span className="cinema"><TimeAgo date={postDetails.timestamp} />.</span>
            </div>

            <p>{postDetails.body}</p>
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
