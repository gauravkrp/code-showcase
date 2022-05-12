import apiConfig from '../config';
import { platformUserLoginData, platformOnboardData } from 'types';
import { AxiosPromise } from 'axios';

const { API_CALL } = apiConfig;

// API Paths
export const ROUTES = {
  platform: {
    USER_LOGIN: `/platform/user/account/login`,
    TEMP_PASSWORD: (mobile_number: number, platform_code: string) =>
      `/platform/user/account/temp-password/mobile-number/${mobile_number}/platform-code/${platform_code}`,
    RESET_PASSWORD: `/platform/user/account/reset-password`
  },
  PROFILE: {
    ONBOARD: `/platform/onboard`,
    FETCH: `/platform/profile/`,
  },
};

export default class ApiRoutes {
  platform_user_login(data: platformUserLoginData): AxiosPromise {
    return API_CALL(ROUTES.platform.USER_LOGIN, 'POST', data);
  }

  platform_user_request_temp_password(mobile_number: number, platform_code: string): AxiosPromise {
    return API_CALL(ROUTES.platform.TEMP_PASSWORD(mobile_number, platform_code));
  }

  platform_fetch_profile(): AxiosPromise {
    return API_CALL(ROUTES.PROFILE.FETCH);
  }
}
