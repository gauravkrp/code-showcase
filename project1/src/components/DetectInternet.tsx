import React, { useState, useEffect } from 'react'

const InternetDetect = (props:any) => {

  const [internetStatus, setInternetStatus] = useState(true)

  useEffect(() => {
    handleConnectionChange();
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);
    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    }
  });

  const handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
      const webPing = setInterval(
        () => {
          fetch('//google.com', {
            mode: 'no-cors',
          })
            .then(() => {
              setInternetStatus(true) // console.log('internet is')
              return clearInterval(webPing)
            }).catch(() => setInternetStatus(false))
        }, 1000);
      return;
    }
    console.log('no internet')
    return setInternetStatus(false);
  }

  return (
    <div className='internet-detect position-fixed'>
      {!internetStatus && (
        <div className="internet-error">
          <p className='text-center'>No Internet! Please check your internet connection.</p>
        </div>
      )}
    </div>
  )
}

export default InternetDetect