import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { showDeletePostModal } from '../../actions/postActions';

class PostDetailsHeader extends Component {

  render() {

    const { postId } = this.props;

    return (

      <div className="ui top inverted teal fixed fluid one menu">

      <div className="item left aligned">

        <Link to="/" className="ui vertical right  floated teal animated button" tabIndex="0">
          <div className="hidden content">
          <i className="chevron left icon"></i>
          </div>
          <div className="visible content">
            Back
          </div>
        </Link>

      </div>


        <div className="item right aligned">

        <a onClick={this.props.onEditPost} to={`/manage/${this.props.postId}`} className="ui vertical right  floated teal animated button" tabIndex="0">
          <div className="hidden content">
          <i className="edit icon"></i>
          </div>
          <div className="visible content">
            Edit
          </div>
        </a>

        </div>

        <div className="item">

          <a onClick={() => this.props.deletePost(postId)} className="ui red icon button" tabIndex="2">
            <i className="delete icon"></i> Delete
          </a>

        </div>

      </div>

    );
  }
}

// export default PostDetailsHeader;
function mapDispatchToProps (dispatch) {
  return {
    deletePost: (data) => dispatch(showDeletePostModal(data)),
  }
}

export default connect (
  null,
  mapDispatchToProps
)(PostDetailsHeader);
