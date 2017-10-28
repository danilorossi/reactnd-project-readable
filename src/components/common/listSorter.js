import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class ListSorter extends Component {


  componentDidMount() {
    window.$(this.criteriaDropdown).dropdown({
      onChange: (value, text, $selectedItem) => {
        const newValue = value.replace(' ', '_');
        this.props.onCriteriaChange(newValue);
      }
    });
    window.$(this.orderDropdown).dropdown({
      onChange: (value, text, $selectedItem) => {
        this.props.onOrderChange(value);
      }
    });
  }

  render() {

    return (
      <h4 className="ui header right aligned" style={{...this.props.style, margin: '0'}}>

        <div className="content">
          Sort by
          <div ref={(dropdown) => { this.criteriaDropdown = dropdown; }} className="ui inline dropdown" style={{ marginLeft: '5px'}}>
            <div className="text"> score</div>
            <i className="dropdown icon"></i>
            <div className="menu">
              <div className={`item active`} data-text="score">score</div>
              <div className={`item`} data-text="creation date">creation date</div>
            </div>
          </div>
          <div ref={(dropdown) => { this.orderDropdown = dropdown; }} className="ui inline dropdown">
            <div className="text"> descending</div>
            <i className="dropdown icon"></i>
            <div className="menu">
              <div className={`item active`} data-text="descending">descending</div>
              <div className={`item`} data-text="ascending">ascending</div>
            </div>
          </div>
        </div>
      </h4>
    );

  }

}
export default ListSorter;
