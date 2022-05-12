import React, { useEffect } from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import Router from 'next/router';

import { RootState, useAppSelector } from 'store';

const Index: NextPage = () => {

  const { loggedIn } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    Router.prefetch('/login');
    Router.prefetch('/dashboard');
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Router.push('/dashboard');
    } else Router.push('/login');
  }, [loggedIn]);

  return (
    <>
      <Head>
        <title>myApp for platforms</title>
      </Head>
      <div className="container-fluid auth-page" />
    </>
  );
};

export default Index;
