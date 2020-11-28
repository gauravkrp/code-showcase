import React from 'react';
import { string } from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface InputProps {
  type?:        'text' | 'email' | 'number' | 'url';
  name:         string;
  label:        string;
  id?:          string;
  placeholder?: string;
  className?:   string;
  [x: string]:  any; 
}

export default function Input(props: InputProps) {
  const { type, name, label, id, className, placeholder } = props
  return (
    <TextField 
      {...props} 
      label={label} 
      type={type ? type : 'text'}
      className={`formInput${className ? ` ${className}` : ''}`}
      placeholder={placeholder ? placeholder : ''} 
    />    
  )
}

{/* <input 
  {...props}
  type={type ? type : 'text'}
  className={`formInput${className? ` ${className}`: ''}`}
  placeholder={placeholder ? placeholder : ''}
/> */}