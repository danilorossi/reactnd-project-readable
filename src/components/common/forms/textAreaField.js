import React from 'react';
import { PropTypes } from 'prop-types';

const TextAreaField = ({ title, name, value, placeholder, error, onChangeHandler }) => {
  return (
    <div className={`field ${error ? 'error' : ''}`}>
      <label>{title} {error && <span>( {error} )</span>}</label>
      <textarea onChange={onChangeHandler} name={name} value={value} placeholder={placeholder} rows="4"></textarea>
    </div>
  );
}
export default TextAreaField;
