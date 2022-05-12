import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';

export const isBrowser = () => {
  return typeof window !== 'undefined';
};

export const scroll2El = (elID: string) => {
  console.log('scrolling to: ', elID);
  const element = document.getElementById(elID) as any;
  window.scrollTo({
    top: element.offsetTop - 70,
    behavior: 'smooth',
  });
};

export const removeURLProtocol = (urlVal: string) => {
  let urlNoProtocol = urlVal.replace(/^(http|https)?\:\/\//i, '');
  urlNoProtocol = urlVal.replace(/^(www\.)?/i, '');
  return urlNoProtocol;
};

export const handleAPIErrors = (res: any) => {
  console.log('handling error');
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res.json();
};

export const mapEnumArrForSelect_ = (array: any) =>
  array.map((item: string) => ({ value: item, label: item.replace(/_/g, ' ') }));

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useStateWithLocalStorage = (localStorageKey: string) => {
  const [value, setValue] = useState(localStorage.getItem(localStorageKey) || '');

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value, localStorageKey]);

  return [value, setValue];
};

export function randomStr(length: number) {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const checkImageExists = (imgPath: string) => {
  return new Promise(resolve => {
    const img = new Image();
    img.src = imgPath;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

export const checkFileExists = (url: string) => {
  return new Promise((resolve, reject) => {
    if (url) {
      const req = new XMLHttpRequest();
      req.open('HEAD', url, false); //req.open('GET', url, false);
      req.send();
      resolve(req.status == 200); // return true
    } else {
      reject(false); // return false
    }
  });
};

export const RHF_STATE_RESET = {
  keepErrors: true,
  keepDirty: true,
  keepIsSubmitted: false,
  keepTouched: false,
  keepIsValid: false,
  keepSubmitCount: false,
};

export const defaultPageParams = (size = 50) => ({
  size,
  properties: true,
  page: 0,
});

export const defaultAPIResponsePageProperties = {
  sort: {
    sorted: false,
    unsorted: true,
    empty: true,
  },
  page_size: undefined,
  page_number: 0,
  total_elements: undefined,
  total_pages: undefined,
  empty: false,
  first: true,
  last: false,
  paged: true,
};

export const ReadableDateFormat = (date: string) => format(parseISO(date), 'dd-MMM-yyyy hh:mm a');

export const capitalize = (s: string) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const capitalizeEachWord = (s: string) => {
  if (typeof s !== 'string') return '';
  const words = s.split(' ');
  return words
    .map(word => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
  // on-linet with regex
  // return s.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  // https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
};

export const yearsArr = () => {
  let a;
  const b = 1799;
  const arr = [];
  for (a = 2020; a > b; a--) {
    arr.push(a);
  }
  return arr;
};

export const mapEnumArrForSelect = (array: (string | number)[]) =>
  array.map((item: string | number) => ({ value: item, label: item }));

export const checkIfEmptyObj = (obj: any): boolean =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const removeEmptyKeysFromObject = (obj: any) => {
  for (const key in obj) {
    if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
};

export const removeZeroValuedKeysFromObject = (obj: any) => {
  // let newObj = {};
  for (const key in obj) {
    if (obj[key] === 0 || obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    } else {
      obj[key] = Number(obj[key]);
      // newObj = {
      //   ...newObj,
      //   [key]: Number(obj[key])
      // };
    }
  }
  // return newObj;
  return obj;
};

// Yup helpder methods for extra validation
// checks if value is selected for React Select
export const ifSelected = (value: any) => {
  if (!value) return false;
  if (!(value && value.value)) {
    return false;
  }
  return true;
};

export const digitsOnly = (value: any) =>
  /^\d*[\.{1}\d*]\d*$/.test(value.toString()) || value === 0;
export const ifBlank = (value: any) => {
  if (!value) return true;
  if (value && value.length < 20) {
    return false;
  }
  return true;
};

export const isValidArray = (array: any[]) => Array.isArray(array) && array.length > 0;
