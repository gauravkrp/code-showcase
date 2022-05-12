import React, { useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import Footer from './Footer';
import SideBar from './Sidebar';
import { RootState, useAppSelector } from 'store';

type PageConfig = {
  title?: string;
  description?: string;
  [key: string]: any;
}

const withLayout =
  (PageComponent: NextPage, pageConfig: PageConfig = {}) =>
    () => {
    const Router = useRouter();
    const { loggedIn } = useAppSelector((state: RootState) => state.auth);

    useEffect(() => {
      Router.prefetch('/login');
    }, [Router]);

    useEffect(() => {
      if (!loggedIn) {
        Router.push('/login');
      }
    }, [Router, loggedIn]);

    return (
      <div className="app-origin-wrapper">
        <Head>
          <title>{pageConfig?.title || 'myApp for platforms'}</title>
        </Head>
        <div className="layout-sidebar">
          <SideBar />
          <Footer />
        </div>
        <div className="layout-mainblock">
          {/* <Header bgColor={headerBgColor} {...props} /> */}
          <div className="app-main-container">
            <PageComponent />
          </div>
        </div>
      </div>
    );
  };

export default withLayout;
