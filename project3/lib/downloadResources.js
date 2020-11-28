import fs from 'fs-extra'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import useSWR from 'swr'
import axios from 'axios'

export const apiOptions = {
  headers: { "PRIVATE-TOKEN": process.env.GITLAB_RES_TOKEN }
}

export async function getFilePath(){
  const url = '#' // gitlab url
  const folder = await axios.get(url, apiOptions )
  const fileNames = await folder.data //returns an array containin list of file in tree.
  //console.log('fileNames-',fileNames)
  return fileNames;
}

export async function getAllResDataId() {
  let fileLists = await getFilePath()
  return fileLists.map(file => {
    return {
      params: {
        //fileID: file.id,
        fileName: file.name.replace(/\.md$/, '')
      }
    }
  })
}

export async function getFileDataByName(fileName) {
  let fileLists = await getFilePath()
  let ifFileDNE = fileLists.filter(file => file.name.replace(/\.md$/, '') === fileName)
  if (ifFileDNE.length == 0) {
    console.log('no such file found')
    return false;
  }
  const newUrl = `https://gitlab.com/api/v4/projects/${projectID}/repository/files/ebooks%2F${fileName}.md/raw?ref=master`
  const fileData = await axios.get(newUrl, apiOptions)
  const matterResult = await matter(fileData.data)
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()
  return {
    fileName,
    contentHtml,
    ...matterResult.data
  }
}

export async function getSiteMap(){
  const pagesDirectory = path.join(process.cwd(), 'src/pages')
  const filenames = fs.readdirSync(pagesDirectory)
  return filenames
}