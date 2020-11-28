import Document, { Html, Head, Main, NextScript } from 'next/document'
//import { NextSeo } from 'next-seo';
const cloudfrontURL = process.env.CLOUDFRONT_URL;

class MyDocument extends Document {
  constructor(props){
    super(props)
  }
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name="google-site-verification" content="eI9FH6wPHmAtGNAsgPmDR6TSi36uNJB2Fg8oSLrDV8Y" />

          <link rel="icon" type="image/svg+xml" href={`${cloudfrontURL}/favicon/fav.svg`} />
          <link rel="alternate icon" type="image/x-icon" href={`${cloudfrontURL}/favicon/fav.ico`} />
          <link rel="mask-icon" href={`${cloudfrontURL}/favicon/safari-pinned-tab.svg`} color="#000000"></link>
          <link rel="apple-touch-icon" sizes="180x180" href={`${cloudfrontURL}/favicon/apple-touch-icon.png`} />

          <link rel="manifest" href="/manifest.webmanifest" />
          <meta name="msapplication-TileColor" content="#00aba9" />
          <meta name="theme-color" content="#ffffff"></meta>

          <link rel="preload" as="script" href="https://www.google-analytics.com" crossorigin></link>
          <link rel="preload" as="image" href="https://agl-resources.s3.ap-south-1.amazonaws.com" crossorigin></link>
          <link rel="preload" as="image" href="https://ddq9rurjysv4s.cloudfront.net" crossorigin></link>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.GA_TRACKING_ID}');
              `,
            }}
          />
          <script type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html:`
              {
                "@context": "http://schema.org",
                "@type": "Organization",
                "name": "AccessGate Labs",
                "url": "https://accessgatelabs.com",
                "logo": "https://accessgatelabs.com/assets/logo/logo.png",
                "email": "speak@accessgatelabs.com",
                "sameAs" : [
                  "https://www.linkedin.com/company/accessgatelabs",
                  "https://twitter.com/accessgatelabs",
                  "https://www.crunchbase.com/organization/accessgate-labs",
                  "https://github.com/AccessGateLabs"
                ],
                "contactPoint" : [
                  {
                    "@type" : "ContactPoint",
                    "contactType" : "customer service",
                    "email": "speak@accessgatelabs.com",
                    "url": "https://accessgatelabs.com"
                  }
                ]
              }
              `
            }} 
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument