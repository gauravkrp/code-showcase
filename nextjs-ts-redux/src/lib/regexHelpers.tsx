//import React from 'react'

export const strongPwdRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
); // for Password
export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/; // for Mobile Numbers
export const indMobRegExp = /^[6-9][0-9]{9}$/; // for Indian Mobile Numbers
export const indPinCode = /^[1-9][0-9]{5}$/; // /^[1-9]\d{6}$/ // for Indian PIN Codes

export const fbUrlRegX =
  /^(http\:\/\/|https:\/\/)?(www.)?(facebook.com\/)((@)?[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF0-9A-Za-z. \-%]{1,}\/?)$/;
export const twUrlRegX =
  /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
export const liUrlRegX =
  /(http|https):\/\/?(?:www\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
export const commaSeperatedList = /[0-9a-zA-Z]+(,[0-9a-zA-Z]+)*/; //  /^[A-Za-z0-9]+((,|-)[A-Za-z0-9]+)*[A-Za-z0-9]+$/
export const urlRegX =
  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/; //https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url

//const httpsRegex  = /^(https:\/\/)/
export const httpsRegex = /^(https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(\/.*)?$/; //https://www.regextester.com/93652
export const url_RegX =
  /^((http|https):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
//export const url_RegX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
export const nameRegX = /^[a-zA-Z ]+$/;
