import React from 'react';
import Head from 'next/head';
import matter from 'gray-matter';
import axios from 'axios';
import Link from 'next/link';

import { getFilePath, apiOptions } from '../../lib/downloadResources';
import withLayout from '../../components/layout';

// This gets called at build time
export async function getServerSideProps() {
  const fileNames = await getFilePath()
  const filesData = await Promise.all(
    fileNames.map(async file => {
      const fileID = file.id;
      const fileName = file.name.replace(/\.md$/, '')
      const newUrl = `https://gitlab.com/api/v4/projects/18528670/repository/blobs/${fileID}/raw`
      const fileData = await axios.get(newUrl, apiOptions)
      const matterResult = await matter(fileData.data)
      return {
        fileID,
        fileName,
        ...matterResult.data,
      }
    })
  )

  return {
    props: {
      filesData,
    }
  }
   
}

const Resources = (props) => {
  

  return(
    <div className='resources-page'>
      <Head>
        <title>Resources to download - AccessGate Labs</title>
      </Head>
      <section className='section paddedSec'>
        <div className='container'>
          {props.filesData.map(({ fileID, fileName, title }) => (
            <div key={`${fileName}-${fileID}`}>
              <Link href="/resources/[fileName]" as={`/resources/${fileName}`}>
                <a>{title}</a>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
export default withLayout(Resources, 'white');