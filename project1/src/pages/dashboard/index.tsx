import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { NextPage, GetServerSideProps  } from 'next'
import { connect } from 'react-redux'
import dynamic from 'next/dynamic'

import Modal from '../../components/Modal'
import { getCookie } from '../../auth/cookie'
import API_ROUTES from '../../auth/apiRoutes'
//import * as actions from '../../store/auth/actions'
import { wrapper } from '../../store'
import withLayout from '../../components/Layout'
import Loader from '../../components/Loader'

const Dashboard: NextPage = (props:any) => {
  const { userData } = props
  console.log(props)

  useEffect(() =>{
    console.log('dashboard')
    //props.fetchShortlisted()
  }, [])

  return(
    <>
    <Head>
      <title>Dashboard | EduGyanam Admin Console</title>
    </Head>
    <div className={`dashboard-container app-page-Container`}>
      <div className='app-page-Header'>
        <h1 className='app-page-heading'>Admin Console | EduGyanam</h1>
      </div>
      <div className='app-page-wrap wrapper'></div>
    </div>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    userData: state?.authentication?.userData
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withLayout(Dashboard))
