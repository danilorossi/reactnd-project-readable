import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCurrentCategory } from '../../actions/categoryActions';
import { loadPostsByCategory } from '../../actions/postActions';
import { createPost } from '../../actions/postFormActions';


import PostsList from './postsList';
import HomeHeader from './pageLayout/homeHeader';
import Sidebar from './pageLayout/sidebar/sidebar';
import PostForm from '../common/postForm';

class HomePage extends Component {

  updateStoreLocation(location) {
    if(location.pathname.startsWith('/posts/')) {
      const categoryId = location.pathname.replace('/posts/', '');
      this.props.changeCategory(categoryId);
      this.props.loadPosts(categoryId);
    }
  }
  constructor(props) {
    super(props);
    const { history } = props;
    history.listen((location) => this.updateStoreLocation(location));
    this.updateStoreLocation(history.location)
  }

  render() {
    return (
      <div>
        <HomeHeader createPost={this.props.newPost}/>
        <Sidebar currentCategoryId={this.props.currentCategoryId} />
        <div className="pusher">
          <Route exact path='/posts/' render={() => <Redirect to="/posts/all"/>} />
          <Route path='/posts/:categoryId' render={() => <PostsList categoryId={this.props.currentCategoryId} />} />
        </div>
        { this.props.postForm.visible && <PostForm data={this.props.postForm.data}/> }
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
      currentCategoryId: state.categories.current,
      postForm: state.postForm,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: (category) => dispatch(loadPostsByCategory(category)),
    changeCategory: (category) => dispatch(updateCurrentCategory(category)),
    newPost: () => dispatch(createPost())
  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
// export default HomePage;
