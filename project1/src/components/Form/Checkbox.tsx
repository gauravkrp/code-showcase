import React from 'react'

export default function Checkbox(props:any) {
  const { label, name, ref, defaultChecked, index, onChange } = props;

  return(
    <label key={index} className="checkbox-label custom-checkbox checkbox-inline" htmlFor={label} >
      <input 
        type='checkbox'
        name={name}
        id={name}
        ref={ref}
        onChange={onChange}
        defaultChecked={defaultChecked}
      />
      {label}
      <span className="checkmark radiomark"></span>
    </label>
  )
}