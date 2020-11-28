import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import * as Yup from "yup"
import { yupResolver } from '@hookform/resolvers'
import { connect } from 'react-redux'

import { UserLoginData } from '../types'
//import * as actions from '../store/auth/actions'
import FormMsg from '../components/Form/FormMsg'
import PasswordInput from '../components/Form/PasswordInput'
import Loader from '../components/Loader'
import { sleep } from '../lib/helper-fxns'

const Login: NextPage = (props: any) => {
  //console.log(props)

  const [isSubmitting, setSubmitting] = useState(false)
  const [formMsg, setFormMsg] = useState({
    msg: '',
    type: 'error'
  })

  useEffect(() => {
    Router.prefetch('/dashboard/')
  }, [])

  const errorMsg:any = {
    'INVALID_LOGIN': 'Invalid login credentials. Please enter correct details.',
    'NO_SUCH_USER': 'We couldn\'t find any account associated with this email address..',
    'ACCOUNT_UNVERIFIED': 'Your account is not verified.',
    'API_ERROR': 'Failed to connect! Please retry.'
  }

  useEffect(()=> {    
    if (props.authentication) {
      const apiRes = props.authentication
      console.log(apiRes)

      if (apiRes?.loggedIn ) {
        console.log('login successful!')
        setSubmitting(false)
        setFormMsg({
          msg: 'Login Successful. Redirecting you to dashboard',
          type: 'success'
        })
        //props.fetchShortlisted()
        setTimeout(() => {
          console.log('Redirecting to dashborad')
          Router.push('/dashboard/');
        }, 500)
      } 
      else if (apiRes?.loginError) {
        setSubmitting(false)
        let errorType = apiRes.loginError
        setFormMsg({
          msg: errorMsg[errorType],
          type: 'error'
        })
      }

    }
  }, [props.authentication])

  const yupSchema = Yup.object().shape({
    email: Yup.string()
      .required("Please tell us your email.")
      .email("Please enter a valid email."),
    password: Yup.string()
      .required("Please enter a password.")
      .min(8, "Password requires minimum 8 characters.")
      .max(22, "Password can have max 22 characters.")
  });

  const { register, handleSubmit, watch, setValue, errors, setError, clearErrors, control, formState } = useForm<UserLoginData>({
    resolver: yupResolver(yupSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    }
  });
  const { isDirty, touched, submitCount, isSubmitted } = formState;
  const onSubmit = async (data: object, e:any) => {
    setSubmitting(true)
    setFormMsg({
      msg: '',
      type: 'error'
    })
    await sleep(10);
    console.log('form data-', data, 'submitCount-', submitCount);
    props.login(data);
  };

  return (
    <div className='loginFormContainer authFormContainer'>
      <Head>
        <title>Login to EduGyanam Admin Console</title>
      </Head>
      <div className='authPage-top'>
        <div className='logo'>
          <img src='/assets/logo/logo.svg' />
        </div>
        <div className='authLink'>
          <span>Need to sign up?</span>
          <a href="/signup" title='Signup to EduGyanam Admin'>Create your account</a>
        </div>
      </div>
      <div className='authForm-wrap'>
        <div className='authForm-main login-form'>
          <div className='authFormHeader'>
            <h3 className='authFormHead'>Login to continue</h3>
            <p></p>
          </div>
          <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='formControl requiredField'>
              <label className='formLabel' htmlFor="email">Email</label>
              <input type='text' name='email' id='email' className='formInput' placeholder='Your registered email' ref={register} />
              <ErrorMessage className='field-error' errors={errors} as='span' name="email" />
            </div>
            <div className='formControl requiredField'>
              <PasswordInput
                ifLabel={true}
                label='Password'
                name='password'
                errors={errors.password}
                refprop={register}
                placeholder='Enter your password'
              />
              <ErrorMessage className='field-error' errors={errors} as='span' name="password" />
            </div>

            {formMsg.msg && (
              <FormMsg type={formMsg.type} msg={formMsg.msg} />
            )}

            <div className='formControl submitBtnWrap text-center'>
              {isSubmitting && (
                <Loader as='span' />
              )}
              <button
                type="submit"
                className="btn btn-ag btn-black btn-large color-white submitBtn"
                disabled={!isDirty || isSubmitting}
              >Continue</button>
            </div>
          </form>

          <div className='forget-password'>
            <Link href='#'>
              <a title='Did you forget your password?'>Forgot Password?</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state:any) => {
  return {
    authentication: state.authentication
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    //login: (data:any) => dispatch(actions.login(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)