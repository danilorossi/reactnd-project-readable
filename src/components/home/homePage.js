import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCurrentCategory } from '../../actions/categoryActions';
import { loadPostsByCategory, createPost } from '../../actions/postActions';

import PostsList from './postsList';
import HomeHeader from './pageLayout/homeHeader';
import Sidebar from './pageLayout/sidebar/sidebar';
import ContentWrapper from './pageLayout/contentWrapper';


class HomePage extends Component {

  historyListener = null;

  updateStoreLocation(location) {
    if(location.pathname.split('/').filter(str => str).length === 1) {
      const categoryId = location.pathname.replace(/\//g, "")
      this.props.changeCategory(categoryId);
      this.props.loadPosts(categoryId);
    }
  }

  componentDidMount() {
    const { history } = this.props;
    this.historyListener = history.listen((location) => this.updateStoreLocation(location));
    this.updateStoreLocation(history.location)
  }
  
  componentWillUnmount() {
    this.historyListener();
  }

  render() {
    return (
      <div>
        <HomeHeader createPost={this.props.newPost}/>
        <Sidebar currentCategoryId={this.props.currentCategoryId} />
        <ContentWrapper>
          <Route path='/:categoryId' render={() => <PostsList categoryId={this.props.currentCategoryId} />} />
        </ContentWrapper>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
      currentCategoryId: state.categories.current,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: (category) => dispatch(loadPostsByCategory(category)),
    changeCategory: (category) => dispatch(updateCurrentCategory(category)),
    newPost: () => dispatch(createPost()),

  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
