import React, { useState, useEffect } from 'react'
import Loader from '../Loader'

export default function Button(props:any) {
  const { el, className, id, name, label, type, onClick, isSubmitting, ...rest } = props

  const btnClasses = `btn ${className}`;

  if (el === "anchor") {
    return (
      <a className={btnClasses} {...rest} >
        {label}
      </a>
    )
  }

  if (el === "span") {
    return (
      <span className={btnClasses} onClick={onClick} {...rest} >
        {label}
      </span>
    )
  }

  return(
    <button className={btnClasses} type={type ? type : "button"} {...rest} onClick={onClick} >
      {isSubmitting ? (
        <Loader as='span' fillColor='#ffffff' />
      ) : label }
    </button>
  )
}