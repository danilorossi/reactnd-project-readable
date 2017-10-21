import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCurrentCategory } from '../../actions/categoryActions';
import { loadPostsByCategory } from '../../actions/postActions';
import { createPost } from '../../actions/postFormActions';

import PostsList from './postsList';
import HomeHeader from './pageLayout/homeHeader';
import Sidebar from './pageLayout/sidebar/sidebar';
// import PostForm from '../common/postForm';

class HomePage extends Component {

  updateStoreLocation(location) {

      const categoryId = location.pathname.replace('/', '');

            console.log('¡¡¡¡¡¡¡categoryId', categoryId)
      this.props.changeCategory(categoryId);
      this.props.loadPosts(categoryId);
  }
  constructor(props) {

    super(props);
    const { history } = props;
    history.listen((location) => this.updateStoreLocation(location));
    this.updateStoreLocation(history.location)
  }

  // componentDidMount() {
  //   this.props.newComment();
  // }

  render() {
      // <Route exact path='/' render={() => <Redirect to="/posts/all"/>} />
    return (
      <div>
        <HomeHeader createPost={this.props.newPost}/>
        <Sidebar currentCategoryId={this.props.currentCategoryId} />
        <div className="pusher">

          <Route path='/:categoryId' render={() => <PostsList categoryId={this.props.currentCategoryId} />} />
        </div>

      </div>
    );
  }
}  //  <PostForm show={this.props.postForm.visible} data={this.props.postForm.data}/>


function mapStateToProps(state, ownProps) {
  return {
      currentCategoryId: state.categories.current,
      // postForm: state.postForm,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    loadPosts: (category) => dispatch(loadPostsByCategory(category)),
    changeCategory: (category) => dispatch(updateCurrentCategory(category)),

    newPost: () => dispatch(createPost()),

    // newComment: () => dispatch(createComment()),

  }
}

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
// export default HomePage;
