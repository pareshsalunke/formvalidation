import React from 'react';
import './Error.css';

const Error = ({ error }) => {
   return (
      error ? <div className="input-feedback">{error}</div> : null
   )
}

export default Error;