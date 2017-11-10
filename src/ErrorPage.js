import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="ui page dimmer active">
      <div className="content">
        <div className="center">
          <h2 className="ui invertedheader">
            <p>Page not found!</p>
            <Link to="/" className="ui teal button">Home</Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
