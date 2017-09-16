import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { updateCurrentCategory } from '../../actions/categoryActions';
import { loadPostsByCategory } from '../../actions/postActions';

import ListItem from './listItem';
import NoResults from './noResults';

class PostsList extends Component {

  render() {
    return (
      <div>
        { this.props.posts && this.props.posts.length === 0 && <NoResults categoryId={this.props.categoryId} /> }
        { this.props.posts && this.props.posts.length > 0 && (
          <div className="ui divided items">
            {this.props.posts.map( post => (
              <ListItem
                key={post.id}
                data={post}
                currentCategoryId={this.props.categoryId}
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

function mapStateToProps(state, ownProps) {
    // returns the store state props that we'd like to see
    // exposed on our component
    return {
        posts: state.postsByCategory[state.categories.current]
    };
}

export default connect (
  mapStateToProps
)(PostsList);
