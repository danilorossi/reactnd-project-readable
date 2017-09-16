import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import PostsList from './postsList';
import Navbar from './pageLayout/navbar';
import Sidebar from './pageLayout/sidebar/sidebar';

class HomePage extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <Sidebar currentCategoryId={this.props.match.params.categoryId} />
        <div className="pusher">
          <Route path='/posts/:categoryId' render={({ match }) => <PostsList categoryId={match.params.categoryId} />} />
        </div>
      </div>
    );
  }
}

export default HomePage;
