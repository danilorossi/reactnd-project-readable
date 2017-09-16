import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Sidebar extends Component {
  render() {

    const countTagClass = (path) => (path === this.props.categories.current ? 'teal' : 'grey');
    // const counterClass = `ui label ${this.props.currentCategoryId}`
    return (

      <div className="ui vertical inverted left visible sidebar menu">

        <NavLink activeClassName="active" exact to='/posts/all' className="item">
          All categories
           <div className={`ui label ${countTagClass("all")}`}>?</div>
        </NavLink>

        { this.props.categories.list.map( category => (
          <NavLink key={category.name} activeClassName="active" to={`/posts/${category.path}`} className="item">
            # {category.name}
            <div className={`ui label ${countTagClass(category.path)}`}>?</div>
          </NavLink>
        ))}

      </div>

    );
  }
}

Sidebar.propTypes = {
  categories: PropTypes.shape({
    list: PropTypes.arrayOf(PropTypes.object),
    current: PropTypes.string
  })
}
Sidebar.defaultProps = {
  categories: {
    list: [],
    current: 'all'
  }
}

function mapStateToProps({ categories }, ownProps) {
  return {
      categories
  };
}

export default connect (
  mapStateToProps
)(Sidebar);
