import React, { useState, useEffect } from 'react'
import { Field } from 'formik'

const UrlInput = (props:any) => {

  const { ifLabel, label, name, placeholder, errors, refprop, defaultValue, disabled } = props

  return (
    <>
      {ifLabel && (
        <label htmlFor={name} className='formLabel'>{label}</label>
      )}
      <div className='urlInput-wrap'>
        <span className='https-wrap'>https://</span>
        <Field
          type='url'
          name={name}
          placeholder={placeholder}
          className={'formInput urlInput' + (errors ? ' is-invalid' : '')}
          ref={refprop}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      </div>
    </>
  )
}

export default UrlInput;