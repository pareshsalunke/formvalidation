import React, { Component } from 'react';
import classnames from 'classnames';
import Select from 'react-select';

//  Component
import Label from '../Label/Label';
import Error from '../ErrorComponent/Error';

class CustomSelect extends React.Component {
   handleBlur = value => {
      this.props.onBlur(this.props.id, true);
   }

   handleChange = value => {
      this.props.onChange(this.props.id, value);
   }

   render() {
      const {
         id,
         placeholder,
         isSearchable,
         label,
         error,
         value,
         className,
         options } = this.props;

      const classes = classnames(
         'input-group',
         {
            ' error': !!error,
         },
         className
      );
      return (
         <div className={classes}>
            <Label htmlFor={id} error={error}>{label}</Label>
            <Select
               id={id}
               className="select-dropdown"
               placeholder={placeholder}
               isSearchable={isSearchable}
               options={options}
               onChange={this.handleChange}
               onBlur={this.handleBlur}
               value={value}
            />
            <Error error={error} />
         </div>
      );
   }
}

export default CustomSelect;