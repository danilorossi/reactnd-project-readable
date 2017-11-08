import React from 'react';

const TextField = ({ title, name, value, placeholder, error, onChangeHandler }) => {
  return (
    <div className={`field ${error ? 'error' : ''}`}>
      <label>{title} {error && <span>( {error} )</span>}</label>
      <input onChange={onChangeHandler} value={value} type="text" name={name} placeholder={placeholder}/>
    </div>
  );
}
export default TextField;
