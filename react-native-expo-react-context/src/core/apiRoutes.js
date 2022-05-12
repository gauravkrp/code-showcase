import apiConfig from '../../axios.config';

const { API_CALL } = apiConfig;

// API Paths
export const API_PATHS = {
  OTP: {
    REQUEST: '/otp',
    VERIFY: '/otp/verify',
  },
  abc: {
    PROFILE: '/abc/profile',
  },
  UNIT: '/organisation/fitness-unit',
};

// API Routes for various methods described below via Class
const ROUTES = {
  OTP_REQUEST: mobileNumber => `${API_PATHS.OTP.REQUEST}?number=${mobileNumber}`,
  OTP_VERIFY: (mobileNumber, otp) => `${API_PATHS.OTP.VERIFY}?number=${mobileNumber}&otp=${otp}`,
  abc_PROFILE: `${API_PATHS.abc.PROFILE}`,
  abc_FETCH_PROFILE_BY_ID: id => `${API_PATHS.abc.PROFILE}?id=${id}`,
};

export default class ApiRoutes {
  constructor(ORG_CODE) {
    this.ORG_CODE = ORG_CODE;
  }

  fetchOrganizationDetails() {
    return API_CALL(ROUTES.ORG_DETAILS_BY_ID(this.ORG_CODE), 'GET');
  };

  requestOTP(mobileNumber) {
    return API_CALL(ROUTES.OTP_REQUEST(mobileNumber), 'POST');
  };

  verifyOTP(mobileNumber, otp) {
    return API_CALL(ROUTES.OTP_VERIFY(mobileNumber, otp), 'POST');
  };

  registerabcProfile(profile_data) {
    return API_CALL(ROUTES.abc_PROFILE, 'POST', profile_data);
  };

  updateabcProfile(profile_data) {
    return API_CALL(ROUTES.abc_PROFILE, 'PATCH', profile_data);
  };

  deleteabcProfile() {
    return API_CALL(ROUTES.abc_PROFILE, 'DELETE');
  };

};
