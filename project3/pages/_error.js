import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import withLayout from '../components/layout'
import Link from 'next/link'
import Router from 'next/router'

/**
 * both named and default export here. Use named export when showing error page inside a page otherwise use default page for redirect or default 404 page.
 *  */ 

export function Error({ statusCode }) {
  const [timeLeft, setTimeLeft] = useState(8)
  useEffect(() => {
    if (!timeLeft) return; // exit early when we reach 0
    const intervalId = setInterval(() => { // save intervalId to clear the interval when the component re-renders
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId); //clear interval on re-render to avoid memory leaks
  }, [timeLeft]); // add timeLeft as a dependency to re-rerun the effect when we update it
  useEffect(()=>{
    if(timeLeft === 0 && statusCode === 404) Router.push('/')
  }, [timeLeft])

  return (
    <>
    <Head>
      <title>Page Not Found! - AccessGate Labs</title>
    </Head>
    <section className='section paddedSec text-center'>
      <h3 className='heading2 mb10'>
        {statusCode
          ? statusCode == 404 ? `404 | Page not found!` : `Oh No! Something bad happened | Error code - ${statusCode}`
          : `404 | Page not found!`}
      </h3>
      <p className='color-text-grey mb30 mainText'>It seems like you've landed to our junior developer's homepage.</p>
      {statusCode === 404 && (
        <p className='color-text-black mb10 mainText small'>
          <Link href='/'>
            <a>Let's get you back to home in {timeLeft} seconds.</a>
          </Link>
        </p>
      )}
    </section>
   </>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default withLayout(Error, 'white');