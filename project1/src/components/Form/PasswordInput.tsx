import React, {useState } from 'react';

const PasswordInput = (props:any) => {
  const [showPassword, setShowPassword] = useState(false)

  const { ifLabel, label, name, placeholder, errors, refprop, defaultValue } = props;
  return(
    <div className="form-group position-relative">
      {ifLabel && (
        <label htmlFor={name} className='formLabel'>{label}</label>
      )}
      <input 
        type={ showPassword ? 'text' : 'password'}
        name={name} 
        placeholder={placeholder}
        className={'formInput' + (errors ? ' is-invalid' : '')}
        ref={refprop}
        defaultValue={defaultValue}
      />
      <span className="showHidePwd position-absolute" onClick={()=>setShowPassword(!showPassword)}> { showPassword ? 'hide' : 'show'}</span>
    </div>
  )
}

export default PasswordInput;