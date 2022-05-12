import React, { useState, useEffect } from 'react'

export const isBrowser = () => {
  return typeof window !== 'undefined';
}

export const scroll2El = (elID) => {
  console.log('scrolling to: ', elID)
  let element = document.getElementById(elID)
  window.scrollTo({
    top: element.offsetTop - 70,
    behavior: 'smooth'
  });
}

export const removeURLProtocol = (urlVal) => {
  let urlNoProtocol = urlVal.replace(/^(http|https)?\:\/\//i, "");
  urlNoProtocol = urlVal.replace(/^(www\.)?/i, "");
  console.log(urlVal, urlNoProtocol)
  return urlNoProtocol;
}


export const mapEnumArrForSelect = (array) => array.map((item) => ({ value: item, label: item.replace(/_/g, " ") }))

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const useStateWithLocalStorage = (localStorageKey) => {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) || ''
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

export function randomStr(length = 9) {
  var result = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const checkImageExists = (imgPath) => {
  return new Promise(resolve => {
    const img = new Image();
    img.src = imgPath;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

export const MathUtils = {
  // map number x from range [a, b] to [c, d]
  map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,
  // linear interpolation
  lerp: (a, b, n) => (1 - n) * a + n * b,
  // Random float
  getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2)
};

export const mathRound = (num, places = 2) => {
  if (num || typeof num === 'number') {
    let pair = (`${num}e`).split('e')
    console.log(pair)
    const value = Math.round(`${pair[0]}e${+pair[1] + places}`)
    pair = (`${value}e`).split('e')
    let res = +(`${pair[0]}e${+pair[1] - places}`)
    console.log(pair, value, res)
    return +(`${pair[0]}e${+pair[1] - places}`)
  }
  return num
}