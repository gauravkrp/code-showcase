import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { DevTool } from "@hookform/devtools";
import { yupResolver } from '@hookform/resolvers';
import * as Yup from "yup";
import makeAnimated from 'react-select/animated';
import dynamic from 'next/dynamic';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import moment from 'moment';
import NumberFormat from 'react-number-format';

import withLayout from '../../../components/Layout';
import { getCookie } from '../../../auth/cookie';
import { RegisterRecruiterForm } from '../register';
import { sleep } from '../../../lib/helper-fxns';
import FormMsg from '../../../components/Form/FormMsg';
import RightArrowSVG from '../../../../public/assets/svg/rightArrow.svg';

import Loader from '../../../components/Loader';
import * as regexHelper from '../../../lib/regexHelpers';

const animatedComponents = makeAnimated(); // for select element
const Select = dynamic(
  () => import('react-select'),
  { ssr: false, loading: () => <Loader as='span' /> }
)

const debug = process.env.NODE_ENV !== 'production' ? true : false

const EditRecruiter: NextPage = (props: any) => {
  console.log(props)
  const Router = useRouter()

  const [isLoading, setLoading] = useState(true)
  const [formMsg, setFormMsg] = useState({
    msg: '',
    type: 'error'
  })

  const [formSubmitted, setFormSubmitted] = useState(false)

  return (

    <>
      <Head>
        <title>Editing Startup Details</title>
      </Head>
      <div className={`dashboard-container app-page-Container`}>
        <div className='app-page-Header'>
          <a className="goback-arrow" onClick={() => Router.back()}><RightArrowSVG /></a>
          <h1 className='app-page-heading'>Edit Recruiter Profile - <span>{`${props.startup_data?.company_info.name}`}</span></h1>
        </div>
        {props?.startup_data ? (
          <RegisterRecruiterForm />
        ) : (
          <p>Recruiter profile not found.</p>
        )}
      </div>
    </>
  )
}

export default withLayout(EditRecruiter)

/* export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log('params-', context.params)
  const authToken = getCookie('aavejakAdminToken', context.req)
  let query = context.query
  if (query && query.startup && query.startup !== '') {
    const { startup } = context.query
    const startup_data = await getStartupData(startup, authToken)
    if (startup_data) return { props: { startup_data } }
    return { props: {} }
  } else {
    console.log('Empty query')
  }
  return { props: {} }
}

const getStartupData = async (startup: any, authToken: string) => {
  const startupList = await getStartupRecords(authToken)
  console.log('list-', authToken, startupList)
  if (startupList) {
    const item_ = startupList.find((obj: any) => `${obj.company_info.name.toLowerCase().replace(/ /g, "-")}_${obj.startup_id}` === startup)
    return item_
  } else {
    return null
  }
} */