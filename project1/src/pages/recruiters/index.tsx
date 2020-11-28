import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage, GetServerSideProps  } from 'next';
import { connect } from 'react-redux';

import * as actions from '../../store/recruiter/actions';
import withLayout from '../../components/Layout';
import Loader from '../../components/Loader';
import Button from '../../components/Form/Button';
import RecruitersList_View from '../../page-components/recruiters/list'

const Recruiters: NextPage = (props:any) => {
  
  console.log(props);
  const [isLoading, setLoading] = useState(true);

  const records = props?.recruiters?.recruitersList

  const fetchRecruiters = () => {
    props.fetchRecruitersList();
    props.fetchRecruitersCount();
  }

  useEffect(() =>{
    console.log('recruiters page');
    !records.length && fetchRecruiters();
  }, []);

  useEffect(() => {
    console.log('recruiters fetched');
    if (props.recruiters.apiSuccess !== "" || props.recruiters.apiFailure !== "") setLoading(false);
  }, [props.recruiters]);

  return(
    <>
    <Head>
      <title>Recruiters | EduGyanam Admin Console</title>
    </Head>
    {
      isLoading && (
        <div className='app-loader'>
          <Loader as="span" />
        </div>
      )
    }
    <div className={`dashboard-container app-page-Container`}>
      <div className='app-page-Header'>
        <h1 className='app-page-heading'>Recruiters</h1>
        <Link href="/recruiters/register/">
          <a title="Register New Recruiter" className="ml-auto btn btn-outline btn-sleek">Register New Recruiter</a>
        </Link>
      </div>
      <div className='app-page-wrap wrapper'>
        <div className="mb-3">
          <p>
            <span>Total Recruiters : </span>
            <span>{props?.recruiters?.recruitersCount}</span>            
          </p>
        </div>
        <RecruitersList_View onRecordsChange={fetchRecruiters} />
      </div>
    </div>
    </>
  )
}

const mapStateToProps = (state: any) => {
  return {
    recruiters: state.recruiters,
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchRecruitersList: () => dispatch(actions.fetchRecruitersList()),
    fetchRecruitersCount: () => dispatch(actions.fetchRecruitersCount())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withLayout(Recruiters));