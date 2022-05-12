import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';
import Modal from '../components/Modal';
import { apiBaseURI } from '../config' // api URI
import loading from '../assets/loader.gif';
import AuthService from '../auth/AuthService'
import axios from 'axios';

const FileUpload = props => {
  const imageMaxSize = 5*1024*1024 // bytes
  const imageMinSize = 10*1024 // bytes
  const acceptedFileTypes = 'image/png, image/jpg, image/jpeg' //image/x-png, image/gif
  const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {return item.trim()})

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  function randomStr(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function downloadFile (url, filename) {
    var element = document.createElement('a')
    element.setAttribute('href', url)
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // downloadFile(croppedImage.url, 'myimage');

  const [isFileUploaded, setFileUploaded] = useState(false)
  const [uploadedFileUrl, setUploadedFileUrl] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [inputFile, setInputFile] = useState(null)
  const [rawFileUrl, setRawFileUrl] = useState(null)
  const [isModal, setModal] = useState(false)
  
  const closeModal = e => {
    if (isFileUploaded) {
      e.preventDefault()
    }
    resetFile(e)
    console.log(isModal.toString())
  }
  const onClick = e => {
    console.log('loading file')
    e.target.value = null;
  }
  const onChange = e => {
    console.log(e.target.files)
    resetFile(e)
    let file = e.target.files[0];
    window.URL.revokeObjectURL(rawFileUrl);
    if (file) {
      if (!acceptedFileTypesArray.includes(file.type)){
        setErrorMsg('This type of file is not allowed. Only images are allowed.')
        return false
      }
      if(file.size < imageMinSize) {
        setErrorMsg(`File size is too small. Please upload a larger image. Minimum size accepted is ${formatBytes(imageMinSize)}`)
        return false
      }
      if(file.size > imageMaxSize) {
        setErrorMsg(`File size is too large. Please upload a smaller image. Maximum size accepted is ${formatBytes(imageMaxSize)}`)
        return false
      }      
      setRawFileUrl(URL.createObjectURL(file))
      setInputFile(file)
      setModal(true)
    }
    console.log(isModal.toString())
  }
  const fileExt = file => file.name.split('.').pop();
  
  const resetFile = e => {
    console.log('reset');
    e.preventDefault();
    setRawFileUrl(null);
    setErrorMsg('');
    setModal(false);
    setFileUploaded(false);
    setUploadedFileUrl(false);
    props.onDone(null);
    props.setFieldValue(props.name, null);
  }

  // fileInput must be declared here so the ref can refer to it
  let fileInput = React.createRef();
  let fileUrl = '';
  let abc='';

  const [crop, setCrop] = useState({ 
    x:20,
    y:20,
    aspect: props.cropDimen? props.cropDimen.cropAspect : 1 / 1,
    width: props.cropDimen? props.cropDimen.cropWidth :160,
    minWidth: props.cropDimen? props.cropDimen.cropMinWidth :80,
    maxWidth: props.cropDimen? props.cropDimen.cropMaxWidth :1000
  });
  const [loadedImg, setLoadedImg] = useState(abc)
  const onImageLoaded = image => {abc=image; setLoadedImg(image); }; //console.log(image)
  const onCropComplete = (crop, percentCrop) => makeClientCrop(crop); //console.log(crop, percentCrop); 
  const [uploading, setUploading] = useState(false) 
  const [croppedImage, setCroppedImg] = useState({
    file: null,
    url: null
  }) // cropped Image file & url

  useEffect(() => {
    fileInput.addEventListener("onchange", setModal(true), false);
    return () => {
      //fileInput.removeEventListener("onchange", closeModal, false);
    };
  }, []);

  async function makeClientCrop(crop) {    
    let image;
    !loadedImg ? image = abc : image = loadedImg; //console.log(`cropping- ${image}`)
    if (image && crop.width && crop.height) {
      const blobUrl = await getCroppedImg(
        image,
        crop,
        `${randomStr(15)}.${fileExt(inputFile)}}` //'newImg.jpg'
      );
      setCroppedImg({
        file: blobUrl.file,
        url: blobUrl.url
      }); //console.log('cropped')
    }
    else { console.log('not cropped!')
    }
  }

  function getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // As Base64 string //but slower when large images or png.
    // const base64Image = canvas.toDataURL('image/jpeg');
  
    // As a blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(fileUrl);
        fileUrl = window.URL.createObjectURL(blob);
        const blobUrl = {'file':blob, 'url':fileUrl}
        resolve(blobUrl);
      }, 'image/jpeg');
    });
  }
  let headers = {
    "Access-Control-Allow-Origin" : "*",
  }
  if(props.auth) {
    const Auth = new AuthService();
    headers['Authorization'] = `Bearer ${Auth.getToken()}`
  }
  const uploadCroppedImg = () => {
    setUploading(true)
    let file = croppedImage.file; // let file = inputFile;
    let formData = new FormData();
    formData.append("file", file, `${randomStr(15)}.${fileExt(inputFile)}`);
    console.log(file)
    fetch(`${apiBaseURI}${props.apiPath}`, {
      method: 'POST',
      mode: 'cors',
      crossDomain: true,
      headers: headers,
      processData: false,
      contentType: false,
      body: formData
    }).then(function(response) { //console.log(response)
      setModal(false)
      setFileUploaded(true)
      return response.json();
    })
    .catch(error => console.error(`Error:, ${error}`))
    .then(function(data) { 
      console.log(data)
      if(data) {
        let apiResponseCode = data.stateServiceResponse.apiServiceResponse.serviceResponseCode
        console.log(apiResponseCode)
        if (apiResponseCode == 101 ) {
          let getUrl = data.stateServiceResponse.fileUploadResponse[0].url
          setUploadedFileUrl(getUrl)
          props.onDone(getUrl) // passing url back to parent component
          props.setFieldValue(props.name, getUrl);
        }
        if (apiResponseCode == 508 ) {
          setErrorMsg('Invalid authorization. Please logout and login again.')
        }
        if (apiResponseCode == 510 ) {
          setErrorMsg('Upload Failed! Please retry uploading.')
        }
        else {
          console.log('Error')
          //setErrorMsg('Some error occured!.')
        }
      }      
      else {
        console.log('Error')
        setErrorMsg('Some error occured. Please retry!')
      }      
      setUploading(false)
    });
  }

  return (
    <div>
      <input style={{display: 'none'}} type="file" name={props.name} id={props.id} multiple={false}
        onClick={onClick}
        onChange={onChange}
        ref={ (myInput) => {fileInput = myInput} }
        accept="image/png,image/jpg,image/jpeg"
      />
      <div className={`fileUploader position-relative${rawFileUrl ? ' haveFile' : ''}${props.canvas ? ` ${props.canvas}`:''}`} htmlFor={props.for}    onClick={() => fileInput.click()} >
        {rawFileUrl && croppedImage && (
          <>
            <img className='filePreview' src={croppedImage.url} alt='Profile Pic Cropped Preview' />
            {/* <button className='btn btn-plain removeFile' onClick={resetFile}>Remove File</button> */}
          </>
        )}          
      </div>
      {errorMsg && (
        <p className='upload-error-msg'>
          {errorMsg}
        </p>
      )}
      {rawFileUrl && (
        <Modal show={isModal} onClose={closeModal} >
          {/* <img src={file} alt='Profile Image Cropping Preview' /> */}
          <h3 className='modalTitle text-center'>Edit Photo</h3>
          <div className='imgCropBox'>
            <ReactCrop 
              src={rawFileUrl}
              crop={crop}
              onChange={newCrop => setCrop(newCrop)}
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
              ruleOfThirds={true}
              keepSelection={true}
              circularCrop={props.cropDimen?props.cropDimen.circularCrop:true}
            />
          </div>
          <div className='imgCropActions text-center'>
            {uploading ? <span className="loader-gif"><img src={loading} alt="Loading..." /></span> : null}
            <span className={`btn btn-outline${uploading?' disabled':''}`} onClick={uploadCroppedImg}>
              {uploading?'Uploading':'Upload'}
            </span>
          </div>
          {/* {croppedImageUrl && (
            <img style={{ maxWidth: '100%' }} src={croppedImageUrl} alt="Cropped Image Preview"/>
          )} */}
        </Modal>
      )}      
    </div>
  );

}

export default FileUpload;
FileUpload.propTypes = {
  onDone: PropTypes.func.isRequired,
  apiPath: PropTypes.string.isRequired
};