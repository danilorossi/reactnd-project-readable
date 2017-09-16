import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { updateCurrentCategory } from '../../actions/categoryActions'
import ListItem from './listItem';

class PostsList extends Component {

  constructor(props) {
      super(props);
      this.props.categorySelected(this.props.categoryId);
  }

  componentDidUpdate() {
    this.props.categorySelected(this.props.categoryId);
  }

  render() {
    return (
      <div className="ui divided items">
        <ListItem currentCategoryId={this.props.categoryId}/>
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
    categorySelected: (category) => dispatch(updateCurrentCategory(category)),
  }
}

export default connect (
  null,
  mapDispatchToProps
)(PostsList);
