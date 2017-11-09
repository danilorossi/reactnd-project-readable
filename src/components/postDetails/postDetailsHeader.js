import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../common/headerBar';

class PostDetailsHeader extends Component {

  render() {

    const { post, onDeletePost, onEditPost } = this.props;

    return (

      <Header.Bar>

        <Header.LeftItem>

          <Link to="/" className="ui vertical right  floated teal animated button" tabIndex="0">
            <div className="hidden content">
            <i className="chevron left icon"></i>
            </div>
            <div className="visible content">
              Back
            </div>
          </Link>

        </Header.LeftItem>


        <Header.RightItem>

          <a onClick={() => onEditPost(post)} to={`/manage/${this.props.post.id}`} className="ui vertical right  floated teal animated button" tabIndex="0">
            <div className="hidden content">
            <i className="edit icon"></i>
            </div>
            <div className="visible content">
              Edit
            </div>
          </a>

        </Header.RightItem>

        <Header.Item>

          <a onClick={() => onDeletePost(post)} className="ui red icon button" tabIndex="2">
            <i className="delete icon"></i> Delete
          </a>

        </Header.Item>

      </Header.Bar>

    );
  }
}

export default PostDetailsHeader;
