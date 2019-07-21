import React from 'react';
import classnames from 'classnames';
import './Input.css';

//  Components
import Error from '../ErrorComponent/Error';
import Label from '../Label/Label';

const TextInput = ({ type, id, label, error, value, onChange, className, ...props }) => {
   const classes = classnames(
      'input-group',
      {
         'error': !!error,
      },
      className
   );
   return (
      <div className={classes}>
         <Label htmlFor={id} error={error}>
            {label}
         </Label>
         <input
            id={id}
            className="text-input"
            type={type}
            value={value}
            onChange={onChange}
            {...props}
         />
         <Error error={error} />
      </div>
   );
};

export default TextInput;