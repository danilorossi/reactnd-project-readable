import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { updateCurrentCategory } from '../../actions/categoryActions';
import {
  loadPostsByCategory,
  voteUp,
  voteDown
} from '../../actions/postActions';

import ListItem from './listItem';
import NoResults from './noResults';

class PostsList extends Component {

  render() {

    // console.warn(this.props.votesAjaxStatus)
    // this.props.posts && this.props.posts.map( (post, index) => {
    //   console.warn(post.id + ' > ' + (this.props.votesAjaxStatus[post.id || false]))
    // });

    return (
      <div>
        { this.props.posts && this.props.posts.length === 0 && <NoResults categoryId={this.props.categoryId} /> }
        { this.props.posts && this.props.posts.length > 0 && (
          <div className="ui divided items">
            {this.props.posts.map( (post, index) => (
              <ListItem
                key={post.id}
                data={post}
                currentCategoryId={this.props.categoryId}
                voteUp={this.props.votePostUp}
                voteDown={this.props.votePostDown}
                loading={this.props.votesAjaxStatus[post.id] || false}
              />
            ))}

          </div>
        )}
      </div>
    );
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
    votePostDown: (postId) => dispatch(voteDown(postId))
  }
}
function mapStateToProps(state, ownProps) {
    // returns the store state props that we'd like to see
    // exposed on our component
    return {
        posts: state.postsByCategory[state.categories.current],
        // TODO change once store is normalized
        votesAjaxStatus: state.ajaxStatus.postVotes
    };
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(PostsList);
