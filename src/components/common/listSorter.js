import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.h4`
  margin: 0 !important;
`;

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

  componentWillUnmount() {
    window.$(this.criteriaDropdown).dropdown('destroy');
    window.$(this.orderDropdown).dropdown('destroy');
  }

  render() {

    return (
      <Wrapper className={`${this.props.className} ui header right aligned`}>

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

      </Wrapper>
    );

  }

}
export default ListSorter;
