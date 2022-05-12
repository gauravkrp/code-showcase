import cookie from 'js-cookie'; // this file will have the task that we have to perform with cookies/ react-native you need to put your async storage code here.
import decode from 'jwt-decode';

const isBrowser = typeof window !== 'undefined'; // this will return true if we are in the browser and false if we are in the server.

export const setCookie = (key: any, value: any, expires = 6) => {
  if (isBrowser) {
    cookie.set(key, value, {
      expires: expires,
      path: '/',
    });
  }
};

export const removeCookie = (key: any) => {
  if (isBrowser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key: any, req?: any) => {
  return isBrowser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);
};

const getCookieFromBrowser = (key: any) => {
  return cookie.get(key);
};

const getCookieFromServer = (key: any, req: any) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie.split(';').find((c: any) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};

export const isTokenExpired = (token: string) => {
  try {
    const decoded: any = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
