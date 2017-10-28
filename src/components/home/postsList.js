import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { showDeletePostModal } from '../../actions/postActions';

import { editPost } from '../../actions/postActions';
import {
  voteUp,
  voteDown
} from '../../actions/postActions';

import {
  selectByCategory
} from '../../selectors/postsSelector';

import ListItem from './listItem';
import NoResults from './noResults';

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.onEditButtonClick = this.onEditButtonClick.bind(this);
    this.onDeletePostButtonClick = this.onDeletePostButtonClick.bind(this);
  }
  render() {

    // console.warn(this.props.votesAjaxStatus)
    // this.props.posts && this.props.posts.map( (post, index) => {
    //   console.warn(post.id + ' > ' + (this.props.votesAjaxStatus[post.id || false]))
    // });

    return (
      <div>
        { this.props.posts && this.props.posts.length === 0 && <NoResults categoryId={this.props.categoryId} /> }
        { this.props.posts && this.props.posts.length > 0 && (
          <div>
            <div className="ui divided items">
              {this.props.posts.map( (post, index) => (
                <ListItem
                  key={post.id}
                  onEditButtonClick={() => this.onEditButtonClick(post)}
                  onDeletePostButtonClick={() => this.onDeletePostButtonClick(post)}
                  data={post}
                  currentCategoryId={this.props.categoryId}
                  voteUp={this.props.votePostUp}
                  voteDown={this.props.votePostDown}
                  loading={this.props.votesAjaxStatus[post.id] || false}
                />
              ))}


            </div>
          </div>
        )}
      </div>
    );
  }

  onEditButtonClick(post) {
    this.props.showEditPostModal(post);
  }

  onDeletePostButtonClick(post) {
    this.props.deletePost(post);
  }

}

PostsList.PropTypes = {
  categoryId: PropTypes.string.isRequired // TODO not working?
};

PropTypes.defaultProps = {
  categoryId: 'all'
};



function mapDispatchToProps (dispatch) {
  return {
    votePostUp: (postId) => dispatch(voteUp(postId)),
    votePostDown: (postId) => dispatch(voteDown(postId)),
    showEditPostModal: (postData) => dispatch(editPost(postData)),
    deletePost: (post) => dispatch(showDeletePostModal(post)),
  }
}
function mapStateToProps(state, ownProps) {
    // returns the store state props that we'd like to see
    // exposed on our component
    return {
      //  posts: state.posts.byCategory[state.categories.current],
        posts: selectByCategory(state.posts.store, state.posts.byCategory[state.categories.current]),
        // TODO change once store is normalized
        votesAjaxStatus: state.ajaxStatus.postVotes
    };
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(PostsList);
