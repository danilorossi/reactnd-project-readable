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
          {'all' === this.props.categories.current &&
           <div className={`ui label ${countTagClass("all")}`}>{this.props.currentCount}</div>
           }
        </NavLink>

        { this.props.categories.list.map( category => (
          <NavLink key={category.name} activeClassName="active" to={`/posts/${category.path}`} className="item">
            # {category.name}
            {category.name === this.props.categories.current &&
              <div className={`ui label ${countTagClass(category.path)}`}>{this.props.currentCount}</div>
            }

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

function mapStateToProps({ categories, postsByCategory}, ownProps) {
  const posts = postsByCategory[categories.current];
  return {
      categories,
      currentCount: posts ? posts.length : '-'
  };
}

export default connect (
  mapStateToProps
)(Sidebar);
