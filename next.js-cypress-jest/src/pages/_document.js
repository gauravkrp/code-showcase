import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  constructor(props) {
    super(props);
  }
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600&display=swap"
            rel="stylesheet"
          />

          {/* <link rel="icon" type="image/svg+xml" href={`/assets/favicon/favicon.svg`} />
          <link rel="alternate icon" type="image/x-icon" href={`/assets/favicon/favicon.ico`} />
          <link
            rel="mask-icon"
            href={`/assets/favicon/safari-pinned-tab.svg`}
            color="#000000"
          ></link>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`/assets/favicon/apple-touch-icon.png`}
          /> */}

          {/* <link rel="manifest" href="/manifest.webmanifest" /> */}
          <meta name="msapplication-TileColor" content="#00aba9" />
          <meta name="theme-color" content="#ffffff"></meta>

          {/* <script
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
          /> */}
          
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
              {
                "@context": "http://schema.org",
                "@type": "Organization",
                "name": "Company",
                "url": "https://Company.com",
                "logo": "https://Company.com/assets/logo/logo.png",
                "email": "hello@Company.com",
                "sameAs" : [
                  "https://www.linkedin.com/company/Company",
                  "https://twitter.com/Company",
                  "https://facebook.com/Company",
                  "https://instagram.com/Company"
                ],
                "contactPoint" : [
                  {
                    "@type" : "ContactPoint",
                    "contactType" : "customer service",
                    "email": "hello@Company.com",
                    "url": "https://Company.com"
                  }
                ]
              }
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
