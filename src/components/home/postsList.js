import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { showDeletePostModal } from '../../actions/postActions';

import { editPost } from '../../actions/postActions';
import {
  voteUp,
  voteDown
} from '../../actions/postActions';

import { selectByCategory } from '../../selectors/postsSelector';
import { mapCriteriaToField } from '../../selectors/filterSelectors';
import { sortedCommentsSelector } from '../../selectors/commentsSelectors';

import ListItem from './listItem';
import NoResults from './noResults';
import ListSorter from '../common/listSorter';

class PostsList extends Component {

  state = {
    posts: null,
    sorting: {
      criteria: 'voteScore',
      order: 'descending'
    }
  }

  constructor(props) {
    super(props);
    this.onEditButtonClick = this.onEditButtonClick.bind(this);
    this.onDeletePostButtonClick = this.onDeletePostButtonClick.bind(this);
    this.changeCriteria = this.changeCriteria.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
  }


  changeCriteria(nextCriteria) {
    let criteria = mapCriteriaToField(nextCriteria);
    this.setState({
      sorting: {
        ...this.state.sorting,
        criteria: criteria
      },
      posts: sortedCommentsSelector([...this.props.posts], criteria, this.state.sorting.order)
    })
  }
  changeOrder(nextOrder) {
    this.setState({
      sorting: {
        ...this.state.sorting,
        order: nextOrder
      },
      posts: sortedCommentsSelector([...this.props.posts], this.state.sorting.criteria, nextOrder)
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      posts: sortedCommentsSelector([...nextProps.posts], this.state.sorting.criteria, this.state.sorting.order)
    })
  }

  render() {


    const { posts } = this.state;

    return (
      <div>
        <ListSorter style={{
            top: '48px',
            width: '100%',
            right: '0',
            zIndex: '1',
            padding: '2px',
            position: 'sticky',
            background: 'rgba(86, 182, 173, 0.51)'
          }} onCriteriaChange={this.changeCriteria} onOrderChange={this.changeOrder} />

        { posts && posts.length === 0 && <NoResults categoryId={this.props.categoryId} /> }
        { posts && posts.length > 0 && (
          <div>
            <div className="ui divided items">
              {posts.map( (post, index) => (
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
