import React, {useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage, GetServerSideProps } from 'next';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { DevTool } from "@hookform/devtools";
import { yupResolver } from '@hookform/resolvers';
import * as Yup from "yup";
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import NumberFormat from 'react-number-format';

import { getCookie } from '../../../auth/cookie';
import { scroll2El, sleep, checkImageExists, RHF_STATE_RESET } from '../../../lib/helper-fxns';
import FormMsg from '../../../components/Form/FormMsg';
import Loader from '../../../components/Loader';
import withLayout from '../../../components/Layout';
import { RecruiterData } from '../../../types';
import Button from '../../../components/Form/Button';
import { API_ADD_RECRUITER } from '../../../auth/apiRoutes';

const RegisterRecruiter: NextPage = (props: any) => {
  /* if (props?.userData?.privileges?.role !== "Administrator") {
    return (
      <>
        <Head>
          <title>Not Authorized</title>
        </Head>
        <h4>
          You are not authorized to access this page.
      </h4>
      </>
    )
  } */
  return (
    <>
    <Head>
      <title>Register Recruiter | EduGyanam Management Console</title>
    </Head>
    <div className={`dashboard-container app-page-Container`}>

      <div className='app-page-Header'>
        <h1 className='app-page-heading'>Register a new Recruiter</h1>
        <Link href="/recruiters/">
          <a title="View All Recruiters" className="ml-auto btn btn-outline btn-sleek">View All Recruiters</a>
        </Link>
      </div>
      <RegisterRecruiterForm />
    </div>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    userData: state.authentication.userData
  }
}

export default connect(mapStateToProps)(withLayout(RegisterRecruiter))


export const RegisterRecruiterForm: React.FC = (props:any) => {

  const emptyErrorMsg = {
    msg: '',
    type: 'error'
  }
  const [isSubmitting, setSubmitting] = useState(false);
  const [formMsg, setFormMsg] = useState(emptyErrorMsg);

  const Router = useRouter();

  const formDefaultValue = {
    name: "",
    description: "",
    logo_url: "",
    is_multinational: "",
    is_public_sector: "",
    average_offer_package_per_annum: "" || undefined,
    website: ""
  }

  const yupSchema = Yup.object().shape({
    name: Yup.string()
      .required('Please provide company name!')
      .min(3, 'Is that a real name?')
      .max(60, 'Please shorten company name. Max 6 characters.'),
    logo_url: Yup.string()
      .max(200, 'Max 200 characters.')
      .test("isValidImgUrl", "Please enter a valid image url", async (value) => {
        if (!value) return true;
        if (value && value.length > 13){
          let ifImg = await checkImageExists(value)
          if(ifImg) return true;
          return false;
        }
        return false;
      }),
    description: Yup.string()
      .test({
        test: (value) => {
          return !(value !== "" && value.length < 14);
        },
        message: "Min 14 characters required."
      })
      .max(500, 'Please keep it short. Max 200 characters.'),
    is_multinational: Yup.string()
      .required('Please specify if company is Multinational.'),
    is_public_sector: Yup.string()
      .required('Please specify if company is a PSU.'),
    average_offer_package_per_annum: Yup.string(),
    website: Yup.string()
      .test({
        test: (value) => {
          return !(value !== "" && value.length < 11);
        },
        message: "Please enter a valid url."
      })
      .max(60, 'Max 60 characters.'),
  });

  const { register, handleSubmit, watch, reset, setValue, errors, setError, clearErrors, control, formState } = useForm<RecruiterData>({
    resolver: yupResolver(yupSchema),
  });

  const { isDirty, touched, submitCount, isSubmitted } = formState;

  const resetForm = () => {
    reset(formDefaultValue, RHF_STATE_RESET);
  }

  const createPayload = (data: RecruiterData) => {
    const { name, description, logo_url, is_multinational, is_public_sector, website, average_offer_package_per_annum } = data

    let data2Send_: RecruiterData = {
      "name": name,
      "is_multinational": is_multinational === "yes" ? true : false,
      "is_public_sector": is_public_sector === "yes" ? true : false,
    }

    description ?
      data2Send_.description = description
      : null

    logo_url ?
      data2Send_.logo_url = logo_url
      : null

    average_offer_package_per_annum ?
      data2Send_.average_offer_package_per_annum = Number(average_offer_package_per_annum.toString().substring(1).replace(/,/g, ""))
      : null

    website ?
      data2Send_.website = website
      : null

    return data2Send_;
  }

  const API_CALL = (data2Send: RecruiterData) => {
    API_ADD_RECRUITER(data2Send)
      .then(res => res.json())
      .then(async (res_data:any) => {
        console.log(res_data);
        setSubmitting(false);
        if (res_data?.api?.responseCode === 1000) {
          console.log('Recruiter Registered!')
          setFormMsg({
            msg: "A new recruiter was added successfully!",
            type: "success"
          });
          await sleep(500)
          resetForm();
          await sleep(500)
          setFormMsg(emptyErrorMsg);
        }
        if (res_data?.api?.responseCode === 4014) {
          console.log('Recruiter exits!');
          setFormMsg({
            msg: "Recruiter with this name already exists!",
            type: "error"
          });
        }
        else {
          console.log('some error occured!');
        }
      })
      .catch((err:any) => {
        console.error(err);
        setFormMsg({
          msg: "Some error occured. Try again later?",
          type: "error"
        });
        setSubmitting(false);
      });
  }

  const onSubmit = async (data: any, e: any) => {
    setSubmitting(true);
    setFormMsg(emptyErrorMsg);
    await sleep(50);

    //console.log('form data-', data, 'submitCount-', submitCount);
    let data2Send = createPayload(data)
    console.log(data2Send);
    API_CALL(data2Send);
  };

  return(
    <div className='app-page-wrap wrapper'>
      <DevTool control={control} />
      <div className='formContainer dashboard-form--medium'>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <div className="formSec">

            <div className="row no-gutters">
              <div className="col-sm-6 formCol">
                <div className='formControl requiredField'>
                  <label htmlFor="name" className='formLabel'>Company Name</label>
                  <input type='text' name='name' id='name' className='formInput' placeholder='Company Name' ref={register} />
                  <ErrorMessage className='field-error' errors={errors} as='span' name="name" />
                </div>
              </div>
              <div className="col-sm-6 formCol">
                <div className='formControl'>
                  <label htmlFor="logo_url" className='formLabel'>Logo URL</label>
                  <input type='text' name='logo_url' id='logo_url' className='formInput' placeholder='Logo URL' ref={register} />
                  <ErrorMessage className='field-error' errors={errors} as='span' name="logo_url" />
                </div>
              </div>
            </div>

            <div className="row no-gutters">
              <div className="col-sm-12 formCol">
                <div className='formControl'>
                  <label htmlFor="description" className='formLabel'>Company's short description.</label>
                  <textarea rows={3} name='description' id='description' className='formInput' placeholder="Company's short description" ref={register} ></textarea>
                  <ErrorMessage className='field-error' as='span' errors={errors} name="description" />
                </div>
              </div>
            </div>

            <div className="row no-gutters">
              <div className="col-sm-6 formCol">
                <div className='formControl requiredField'>
                  <label htmlFor="is_multinational" className='formLabel'>Is Multinational?</label>
                  <div className="formInput--group">
                    <label htmlFor="is_multinational" className='formLabel--input'>
                      <input name="is_multinational" type="radio" value="yes" ref={register} />
                    Yes</label>
                    <label htmlFor="is_multinational" className='formLabel--input'>
                      <input name="is_multinational" type="radio" value="no" ref={register} />
                    No</label>
                  </div>
                  <ErrorMessage className='field-error' errors={errors} as='span' name="is_multinational" />
                </div>
              </div>
              <div className="col-sm-6 formCol">
                <div className='formControl requiredField'>
                  <label htmlFor="is_public_sector" className='formLabel'>Is Public Sector Company?</label>
                  <div className="formInput--group">
                    <label htmlFor="is_public_sector" className='formLabel--input'>
                      <input name="is_public_sector" type="radio" value="yes" ref={register} />
                    Yes</label>
                    <label htmlFor="is_public_sector" className='formLabel--input'>
                      <input name="is_public_sector" type="radio" value="no" ref={register} />
                      No</label>
                  </div>
                  <ErrorMessage className='field-error' errors={errors} as='span' name="is_public_sector" />
                </div>
              </div>
            </div>

            <div className="row no-gutters">
              <div className="col-sm-6 formCol">
                <div className='formControl'>
                  <label htmlFor="average_offer_package_per_annum" className='formLabel'>Average Offer Package Per Annum</label>
                  <Controller control={control} as={NumberFormat} thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'₹'} name='average_offer_package_per_annum' id='average_offer_package_per_annum' className='formInput' placeholder="Average Offer Package Per Annum" defaultValue="" />
                  <ErrorMessage className='field-error' errors={errors} as='span' name="average_offer_package_per_annum" />
                </div>
              </div>
              <div className="col-sm-6 formCol">
                <div className='formControl'>
                  <label htmlFor="website" className='formLabel'>Website</label>
                  <input type='text' name='website' id='website' className='formInput' placeholder='Website' ref={register} />
                  <ErrorMessage className='field-error' errors={errors} as='span' name="website" />
                </div>
              </div>
            </div>
            
          </div>

          {formMsg.msg && (
            <FormMsg type={formMsg.type} msg={formMsg.msg} />
          )}

          <div className='formControl submitBtnWrap text-center'>
            <Button 
              type="submit"
              className="btn-blue btn-large submitBtn"
              disabled={!isDirty || isSubmitting}
              isSubmitting={isSubmitting}
              label="Add Recruiter"
            />
          </div>
        </form>
      </div>
    </div>
  )
}