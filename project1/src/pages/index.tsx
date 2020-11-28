import React, {useState, useEffect} from 'react'
import { NextPage, NextPageContext } from 'next'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import { connect } from 'react-redux'

const Index:NextPage = (props:any) => {
  console.log(props)

  //const [loggedIn, setLoggedIn] = useState(false)
  const [isComponentLoaded, setComponentLoaded] = useState(false)

  useEffect(()=>{
    Router.prefetch('/login')
    Router.prefetch('/dashboard')
    if (props?.authentication?.loggedIn) {
      Router.push('/dashboard')
    } else Router.push('/login')
  })

  useEffect(()=> {
    setComponentLoaded(true)
  },[])

  return(
    <>
      <Head>
        <title>Edugyanam Admin Console</title>
      </Head>
      <div className='container-fluid auth-page'></div>
    </>
  )
}

export default connect((state) => state)(Index)

export async function getServerSideProps( ctx: any ) {
  return {
    props: {}
  }
}