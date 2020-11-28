import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import FORM from '../../pageComponents/resources/_form';
import Loader from '../../components/loader';
import {Error} from "../_error.js";

import { apiBaseURL } from '../../config';
import withLayout from '../../components/layout';
import Sharer from '../../components/sharer';
import { getAllResDataId, getFileDataByName } from '../../lib/downloadResources';
import { ValidateEmail } from '../../lib/custom-validator';

const ResourcesDownload = ({ resData, shareData }) => {

  //const router = useRouter()
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [downloadData, setDownloadData] = useState({});
  const [returningUser, setReturningUser] = useState(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isEmailOpted, setEmailOpted] = useState(false);
  
  const apiOptions = {
    headers: { 
      'Accept': 'application/vnd.agl.v1+json',
      'Content-Type': 'application/json' 
    }
  }
  const url = `${apiBaseURL}/v1/resource/docs/download/guest/entry`

  useEffect(()=>{
    checkLocalStorage()
  }, [])

  const rememberUser = ( fName, lName, company, email, title, country ) => {
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem(
        'aglResourceDownloader', JSON.stringify({
          'firstName': fName,
          'lastName': lName,
          'workEmail': email,
          'companyName': company,
          'workPosition': title,
          'country': country
        })
      )
    } else {
      console.log("Your browser doesn't suport local storage")
    }
  }

  const checkLocalStorage = () => {
    if (typeof(Storage) !== "undefined") {
      if (localStorage.getItem("aglResourceDownloader")) {
        const getStorageValue = JSON.parse(localStorage.getItem("aglResourceDownloader"))
        if(ValidateEmail(getStorageValue.workEmail)) setReturningUser(getStorageValue)
        else {
          console.log('your email was changed, deleting local storage')
          localStorage.removeItem('aglResourceDownloader')
        }
        return;
      }
      else {
        console.log("Browser doesn't remember you")
        return;
      }
    }
    else {
      console.log("Your browser doesn't suport local storage")
      return;
    }
  }

  const newUser = () => {
    console.log("not returning user, I'm new!")
    setReturningUser(undefined)
    localStorage.removeItem('aglResourceDownloader')
  }

  const emailOptHandler = (e) => setEmailOpted(!isEmailOpted)
  const onFormSubmitHandle = formData => {
    let data2Send = JSON.stringify({
      ...formData,
      "metaData": {
        "resourceName": resData.title,
        "resourceLocationURL": resData.ebookURL
      }
    })
    submitForm(data2Send)
  }
  const onBtnSubmitHandle = () => {    
    setSubmitting(true)
    let data2Send = JSON.stringify({
      ...returningUser,
      "isEmailOpted": isEmailOpted,
      "metaData": {
        "resourceName": resData.title,
        "resourceLocationURL": resData.ebookURL
      }
    })
    submitForm(data2Send)
  }
  
  const submitForm = async data2Send => {
    console.log(data2Send)
    const sendReq = await axios.post(url, data2Send, apiOptions)
    const getRes = await sendReq.data //returns response body
    console.log(getRes);
    if(getRes.api.responseCode === 1000) {
      console.log('Form submitted and Email sent!')
      setSubmitting(false)
      setFormSubmitted(true)
      setDownloadData({firstName: getRes.object.firstName, downloadLink: getRes.object.metaData.resourceLocationURL})
      rememberUser(getRes.object.firstName, getRes.object.lastName, getRes.object.companyName, getRes.object.workEmail, getRes.object.workPosition, getRes.object.country)
    }
    if(getRes.api.responseCode === 4015) {
      console.log('Validation Error!')
      setSubmitting(false)
    }
  }

  if (!resData) {
    return (
      <Error statusCode={404} title='Page Not Found.' />
    )
  }

  return(
    <div className='download-resources-page'>
      <Head>
        <title>Download {resData.title} - AccessGate Resources</title>
        <meta name='keywords' content={resData.tags} />
        <meta name='description' content={`Download ${resData.title} | AccessGate Labs`} />
      </Head>
      <section className='section paddedSec' id='resource-landing'>
        <div className='container'>
          <div className='resHeader-content'>
            <div className='content-img'>
              <div className='imgBookWrap'></div>
              <div className='image-shadow'></div>
              <img src={resData.coverImgSrc} alt={`${resData.title} ebook by AccessGate Labs`} />
            </div>
            <div className='content-data'>
              <h3 className='color-white heading1 fw500'>{`Download ${resData.title}`}</h3>
              <p className='mainText2 color-text-light'>{resData.shortIntro}</p>
            </div>
          </div>
        </div>
      </section>

      <section className='section paddedSec resourceContent'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-5'>
              <div className='wrapper'>
                <div className='resContentMain' dangerouslySetInnerHTML={{ __html: resData.contentHtml }} />
                <div className='shareEbook'>
                  <p>Share this ebook with your colleagues and peers!</p>
                  <div className='mt10'>
                    <Sharer data2Share={shareData} />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-5 offset-sm-2'>
              <div className='wrapper formWrapper'>
                <div className='formWrapper-head'>
                  <h4 className='mainHeading3'>Share few details about you and we will send the eBook direct to your inbox.</h4>
                  {returningUser ? null :
                    <p className='color-text-grey'>This form helps us learn about you and your business. Your information is kept only with AccessGate Labs and is only used for future email communications, if opted in.</p>
                  }
                </div>

                {formSubmitted && (
                <div className='formResponse'>
                  <h3>Thank You! {downloadData.firstName}</h3>
                  <p>We've emailed you the ebook! You can also download it below.</p>
                  <a target="_blank" href={downloadData.downloadLink} className="btn btn-ag btn-blue btn-large color-white submitBtn" download >
                    Download ebook
                  </a>
                </div>
                )}

                {!formSubmitted && returningUser && ( 
                <div id='returningUser'>
                  <p>Welcome back, <span id='firstName'>{returningUser.firstName}</span></p>
                  <a onClick={newUser}>Not you?</a>
                  <div className='form'>
                    <div className="formControl">
                      <label className='formLabel custom-checkbox' htmlFor="isEmailOpted" >
                        <input type='checkbox' id="isEmailOpted" name='isEmailOpted' 
                          onChange={emailOptHandler}
                          defaultChecked={isEmailOpted}
                        />
                        I opt in to receive product updates, event announcements, and other communications from AccessGate Labs. I acknowledge that I can unsubscribe anytime from <a href='' className='aglink unsubsribeLink'>here</a>.
                        <span className="checkmark"></span>
                      </label>
                    </div>

                    <div className='formControl text-center'>
                      {isSubmitting ? <Loader as='span' /> : null}
                      <button onClick={onBtnSubmitHandle} className="btn btn-ag btn-blue btn-large color-white submitBtn" disabled={isSubmitting} >
                        Download ebook
                      </button>
                    </div>
                  </div>
                </div>
                )}

                {!(formSubmitted || returningUser) && (
                  <FORM onFormSubmit={onFormSubmitHandle} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default withLayout(ResourcesDownload, 'white')

export async function getStaticPaths() {
  const paths = await getAllResDataId()
  //console.log('paths-', paths)
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  //console.log('params-',params)
  const resData = await getFileDataByName(params.fileName)
  //console.log('postdata-', resData)
  if (!resData) return {
    props: {
      resData,
      shareData: {}
    }
  }
  return {
    props: {
      resData,
      shareData: {
        title: `Download ${resData.title}`,
        desc: resData.shortIntro,
        url: `https://accessgatelabs.com/resources/${resData.fileName}`,
        fbHashtag: '#accessgatelabs ',
        twHashtagsArr: ['accessgatelabs', 'downloads'],
        source: 'AccessGate Labs',
        iconSize: 32,
        bgFill: {
          fill: '#696969'
        }
      }
    }
  }
}