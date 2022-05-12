import App from 'next/app'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import SEO from '../../next-seo.config'
import './index.scss'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps, router, router: { asPath } }) {

  /* if (asPath && asPath.length > 1) {
    console.log(asPath)
    const [path, query = ''] = asPath.split('?');
    if (path.endsWith('/') && path.length > 1) {
      const asPathWithoutTrailingSlash =
        path.replace(/\/*$/gim, '') + (query ? `?${query}` : '');
      if (typeof window !== 'undefined') {
        router.replace(asPathWithoutTrailingSlash, undefined, {
          shallow: true,
        });
        return null;
      }
    }
  } */

  return (
    <>
    <Head>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width"
        key="viewport"
      />
    </Head>
    <DefaultSeo {...SEO} />
    <Component {...pageProps} {...router} />
    </>
  )
}

// Will be called once for every metric that has to be reported.
export function reportWebVitals(metric) {
  // These metrics can be sent to any analytics service
  //console.log(metric)
}

/* MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps }
} */

/* export async function getServerSideProps({ Component, ctx, router }) {
  //Fixes the trailing-slash-404 bug for server-side rendering.
  const { asPath } = router;
  console.log(asPath)
  if (asPath && asPath.length > 1) {
    const [path, query = ""] = asPath.split("?");
    if (path.endsWith("/") && path.length > 1) {
      const asPathWithoutTrailingSlash =
        path.replace(/\/*$/gim, "") + (query ? `?${query}` : "");
      if (ctx.res) {
        ctx.res.writeHead(301, {
          Location: asPathWithoutTrailingSlash,
        });
        ctx.res.end();
      }
    }
  }
  return {
    pageProps: Component.getServerSideProps
      ? await Component.getServerSideProps(ctx)
      : {},
  };
} */

//MyApp.getServerSideProps = getServerSideProps

/* class MyApp extends App {
  // Remove me, I do nothing!
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    // ...
  }
} */