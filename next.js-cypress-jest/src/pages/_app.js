import App from 'next/app';
import Head from 'next/head';
// import { DefaultSeo } from 'next-seo';
// import SEO from '../../next-seo.config';
import dynamic from 'next/dynamic';

import '../styles/index.scss';

export default function MyApp({ Component, pageProps, router, router: { asPath } }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>
      {/* <DefaultSeo {...SEO} /> */}
      <Component {...pageProps} router={router} />
    </>
  );
}
