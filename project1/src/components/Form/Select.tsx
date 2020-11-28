import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { components } from 'react-select'
import makeAnimated from 'react-select/animated'

import Loader from '../Loader'

const animatedComponents = makeAnimated(); // for select element

const ReactSelect = dynamic(
  () => import('react-select'),
  { ssr: false, loading: () => <Loader as='span' /> }
)

export default function Select(props: any) {
  return (
    <ReactSelect
      {...props}
      className="basic-multi-select selectInput"
      classNamePrefix="react-select"
      components={animatedComponents}
    />
  )
}