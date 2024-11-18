import {GUEST_TYPE} from '../../types';

export default appOperation => ({
  login: data => appOperation.post('/user/signup', data, GUEST_TYPE),
  register: data => appOperation.post('user/send-otp', data, GUEST_TYPE),

  otp_verification: data => appOperation.post('user/login-using-otp', data, GUEST_TYPE),
  loginUPasswor: data => appOperation.post('user/login-using-password', data, GUEST_TYPE),
  forgot_password: data => appOperation.post('user/forgot-password', data, GUEST_TYPE),
  refer_code: data => appOperation.post('user/verify-referral', data, GUEST_TYPE),

  resend_otp: id =>
    appOperation.get(`user/signup/${id}`, undefined, undefined, GUEST_TYPE),
});