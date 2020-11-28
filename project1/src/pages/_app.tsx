import React, { useState, useEffect } from 'react'
import App from 'next/app'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { StylesProvider } from '@material-ui/core/styles'
import { AppProps, AppContext } from 'next/app'
import { GetStaticProps, NextPage, NextPageContext } from 'next'
import * as Sentry from '@sentry/react'
import { Integrations } from "@sentry/tracing";

import { wrapper } from '../store'
import initialize from '../auth/authInit'
import DetectInternet from '../components/DetectInternet'

import "nprogress/nprogress.css"
import '../styles/nprogress.scss'
import '../styles/index.scss'

let sentryDSN = process.env.SENTRY_DSN
Sentry.init({ 
  dsn: sentryDSN,
  integrations: [
    new Integrations.BrowserTracing(),
  ],
  tracesSampleRate: 1.0,
});

interface IProps {
  Component: NextPage;
  ctx: NextPageContext
}

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false },
);

class WrappedApp extends App {

  static async getInitialProps({ Component, ctx }: IProps ) {
    initialize(ctx)
    const store = ctx.store.getState()
    console.log('storeInit-',store)
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    return { pageProps, userData: store?.authentication?.userData };
  }

  componentDidMount(){
    // Remove the server-side injected CSS.
    const jssStyles: any = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render () {
    const { Component, pageProps, router, userData } = this.props as any
    return(
      <>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
        </Head>
        <TopProgressBar />
        <StylesProvider injectFirst>
          <DetectInternet />
          <Component {...pageProps} {...router} userData={userData} />
        </StylesProvider>
      </>
    )
  }
}

export default wrapper.withRedux(WrappedApp)
