import cookie from 'js-cookie'; // this file will have the task that we have to perform with cookies/ react-native you need to put your async storage code here.

export const setCookie = (key:any, value:any, expires=2) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: expires,
      path: '/'
    });
  }
};

export const removeCookie = (key:any) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
};

export const getCookie = (key:any, req?:any) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key:any) => {
  return cookie.get(key);
};

const getCookieFromServer = (key:any, req:any) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find((c:any) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};