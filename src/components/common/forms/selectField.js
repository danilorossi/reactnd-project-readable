import React from 'react';
import { PropTypes } from 'prop-types';

const SelectField = ({ title, name, value, error, onChangeHandler, classNames = '', children }) => {
  return (
    <div className={`field ${error ? 'error' : ''}`}>
      <label>{title} {error && <span>( {error} )</span>}</label>
      <select
        value={value}
        name={name}
        onChange={onChangeHandler}
        className={`ui dropdown ${classNames}`}>
        <option value="invalid" disabled>Choose one category</option>
        {children}
      </select>

    </div>
  );
}
export default SelectField;
