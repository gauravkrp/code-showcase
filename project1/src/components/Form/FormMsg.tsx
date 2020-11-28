import React from 'react';
const feather = require('feather-icons');

export default function FormMsg(props: { msg: string, type: string }) {
  const color = props.type === 'success' ? '#32CD32' : '#ff4700';
  return (
    <div className='formErrorWrap'>
      <p style={{color: color}}>
        <i dangerouslySetInnerHTML={{ __html: feather.icons['alert-circle'].toSvg({ class: 'formErrorEl', 'stroke-width': 1, color: color }) }} ></i>
        {props.msg}
      </p>
    </div>
  )
}