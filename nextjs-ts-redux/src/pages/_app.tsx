import '../styles/index.scss';

import React from 'react';
import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Store } from 'redux';
import { ToastContainerProps } from 'react-toastify';

import authInit from '../auth/authInit';
import { RootState, wrapper } from '../store';

const TopProgressBar = dynamic(() => import('../components/TopProgressBar'), { ssr: false });
const DetectInternet = dynamic(() => import('../components/DetectInternet'), { ssr: false });
const ToastContainer = dynamic<ToastContainerProps>(() =>
  import('react-toastify').then((mod) => mod.ToastContainer)
);

// Since you'll be passing more stuff to Page
declare module 'next/dist/next-server/lib/utils' {
  export interface NextPageContext {
    store: Store<RootState>;
  }
}

class WrappedApp extends App<AppProps> {
  public static getInitialProps = wrapper.getInitialAppProps(
    (store: Store<RootState>) =>
      async ({ Component, ctx }: AppContext) => {
        // console.log('storeInit-', store.getState());

        authInit(ctx, store);

        return {
          pageProps: {
            // Call page-level getInitialProps manually, instead of App.getInitialProps
            // DON'T FORGET TO PROVIDE STORE TO PAGE
            ...(Component.getInitialProps
              ? await Component.getInitialProps({ ...ctx, store } as any)
              : {}),
            // Some custom thing for all pages
            pathname: ctx.pathname,
            state: store.getState(),
          },
        };
      },
  );

  public render() {
    const { Component, pageProps, router } = this.props;

    return (
      <>
        <Head>
          <meta name="viewport" key="viewport" content="initial-scale=1.0, width=device-width" />
          <meta
            name="keywords"
            content="keywords keywords, keywords keywords, keywords"
          />
          <meta name="copyright" content="myApp fitness, https://website.com"></meta>
        </Head>
        <TopProgressBar />
        <DetectInternet />
        <ToastContainer />
        <Component {...pageProps} router={router} />
      </>
    );
  }
}

export default wrapper.withRedux(WrappedApp);
