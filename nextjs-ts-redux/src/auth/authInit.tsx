import AuthActions from 'store/auth/actions';
import { decode } from 'js-base64';
import Router from 'next/router';
import { NextPageContext } from 'next';
import { Store } from 'redux';
import { getCookie, isTokenExpired } from './cookie';
import { RootState } from 'store';
import { ServerResponse } from 'http';

const rootPath = `/`;
const loginPath = `/login`;
const resetPasswordPath = `/reset-password`;
const registerPath = `/onboard`;
const homePagePath = `/dashboard`;

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
const Redirect2LoginFromServer = (res: ServerResponse) => {
  res.setHeader('location', loginPath);
  res.statusCode = 302;
  res.end();
  return;
};

const isAuthPath = (pathname: string) =>
  pathname === loginPath || pathname === resetPasswordPath || pathname === registerPath;

export default async function authInit(
  { req, res, pathname }: NextPageContext<any>,
  store: Store<RootState>,
) {
  const { dispatch } = store;

  if (req) {
    // if isServer
    if (req.headers.cookie) {
      const authToken = getCookie('authToken', req);

      if (authToken && !isTokenExpired(authToken)) {
        // logged in
        const platform_data = decode(getCookie('myApp_data_platform', req));
        const user_data = decode(getCookie('myApp_data_user', req));
        const platform = JSON.parse(decodeURIComponent(platform_data));
        const user = JSON.parse(decodeURIComponent(user_data));

        AuthActions.reAuthenticate(authToken, platform, user)(dispatch);

        if (isAuthPath(pathname) || pathname === rootPath) {
          // if logged in and trying to go to login/signup page
          // then redirect to dashboard
          res?.setHeader('location', homePagePath);
          res!.statusCode = 302;
          res?.end();
        }
      } else {
        // not logged in
        if (!isAuthPath(pathname)) {
          Redirect2LoginFromServer(res as ServerResponse);
        }
      }
    } else {
      if (!isAuthPath(pathname)) {
        Redirect2LoginFromServer(res as ServerResponse);
      }
    }
    return;
  } else {
    // not server
    const token = getCookie('authToken');

    if (token && !isTokenExpired(token)) {
      // logged in & going to auth page
      if (isAuthPath(pathname)) {
        Router.push(homePagePath);
      }
    } else AuthActions.logout()(dispatch);
    return;
  }
}
