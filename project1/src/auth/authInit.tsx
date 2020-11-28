import Router from 'next/router';
//import * as actions from '../store/auth/actions';
import { getCookie } from './cookie';

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
const Redirect2LoginFromServer = (ctx: any) => {
  console.log('UnAuthorized')
  ctx.res.setHeader("location", "/login");
  ctx.res.statusCode = 302;
  ctx.res.end();
}

export default async function initialize (ctx:any) {
  
  console.log(ctx.pathname)
  
  if (ctx.req) { // if isServer
    console.log('ctx-req-headers-',ctx.req.headers)
    if (ctx.req.headers.cookie) {
      const authToken = getCookie('aaInvestAuthToken', ctx.req)
      const investData = getCookie('aaInvestData', ctx.req)
      if (authToken && investData) {
        ctx.store.dispatch(actions.reauthenticate(authToken))
        let userData = JSON.parse(decodeURIComponent(investData))
        ctx.store.dispatch(actions.getuserdata(userData));
      } else {
        if (!(ctx.pathname === '/login' || ctx.pathname === '/signup')) Redirect2LoginFromServer(ctx)
        return
      }
    }
    else {
      if (!(ctx.pathname === '/login' || ctx.pathname === '/signup')) Redirect2LoginFromServer(ctx)
      return
    }
  }
  else {
    const token = ctx.store.getState()?.authentication?.authToken;
    console.log('not server-', ctx.store.getState())

    if (token && (ctx.pathname === '/login' || ctx.pathname === '/signup')) {
      setTimeout(function () {
        Router.push('/dashboard');
      }, 0);
    }
    return
  }
}