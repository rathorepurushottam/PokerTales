import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dispatch } from 'redux';
import { appOperation } from '../appOperation';
import { logError, toastAlert } from '../helper/utility';
import { FCM_TOKEN_KEY, USER_TOKEN_KEY } from '../libs/constant';
// import NavigationService from '../navigation/NavigationService';
// import {
//   AUTHSTACK,
//   BOTTOM_NAVIGATION_STACK,
//   HOME,
//   MYBATTLEOTP,
//   OTP,
// } from '../navigation/routes';
import { setLoading } from '../slices/authSlice';
// import { setUserData, setWalletCreate } from '../slices/profileSlice';
// import { getUserProfile } from './profileAction';
//done
export const userLogin = data => async dispatch => {
  try {
    dispatch(setLoading(true));
    const response = await appOperation.guest.login(data);
    if (response?.success) {
      appOperation.setCustomerToken(response?.data?.accessToken);
      // dispatch(getUserProfile(false, false));
      await AsyncStorage.setItem(USER_TOKEN_KEY, response?.data?.accessToken);
      // dispatch(setUserData(response?.data));
      // dispatch(updateDeviceToken());
    //   NavigationService.navigate(BOTTOM_NAVIGATION_STACK);
    } else {
      toastAlert.showToastError(response?.message);
    }
  } catch (e) {
    logError(e);
    toastAlert.showToastError(e?.message);
  } finally {
    dispatch(setLoading(false));
  }
};
//done
export const userSignup =
  (data, onClose = () => {}) =>
    async dispatch => {
      try {
        dispatch(setLoading(true));
        const response = await appOperation.guest.register(data);
        console.log(response, "response");
      
  
        if (response?.success) {
        //   NavigationService.navigate(MYBATTLEOTP, { data: data, id: 'register', permissionSave: permissionSave });
        toastAlert.showToastError(response?.message);
        onClose();
        } else {
          toastAlert.showToastError(response?.message);
        }
        // NavigationService.navigate(OTP)
      } catch (e) {
        console.log(e);
        logError(e);
        toastAlert.showToastError(e?.message);
        console.log(e,'eeee')
      } finally {
        dispatch(setLoading(false));
      }
    };
//done
export const otpVerification =
  (data, onCloseOtp = () => {}) =>
    async dispatch => {
      try {
        dispatch(setLoading(true));
        const response = await appOperation.guest.otp_verification(data);
          console.log(response, "response");
        if (response?.success) {
          // appOperation.setCustomerToken(response?.data?.accessToken);
          // await AsyncStorage.setItem(USER_TOKEN_KEY, response?.data?.accessToken);
          // dispatch(setUserData(response?.data?._id));
          // dispatch(updateDeviceToken());
          // dispatch(getUserProfile(true, false));
          // NavigationService.navigate(BOTTOM_NAVIGATION_STACK);
          toastAlert.showToastError(response?.message);
          onCloseOtp();
        } else {
          toastAlert.showToastError(response?.message);
        }
        // if (response?.success) {
        //   isAlert
        //     ? toastAlert.showToastError(response?.message)
        //     : NavigationService.navigate('Home' ,{data: data, id: 'register'})
        // } else {
        //   toastAlert.showToastError(response?.message);
        // }
      } catch (e) {
        logError(e);
        toastAlert.showToastError(e?.message);
      } finally {
        dispatch(setLoading(false));
      }
    };

//done
export const loginUsingPassword =
  (data, onCloseLogin) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.guest.loginUPasswor(data);
      if (response?.success) {
         toastAlert.showToastError(response?.message)
         onCloseLogin();
      } else {
        toastAlert.showToastError(response?.message);
      }
    } catch (e) {
      logError(e);
      toastAlert.showToastError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const forgotPassword =
  (data, onCloseForgot = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.guest.forgot_password(data);
      if (response?.success) {
        toastAlert.showToastError(response?.message)
        onCloseForgot();
      } else {
        toastAlert.showToastError(response?.message);
      }
    } catch (e) {
      logError(e);
      toastAlert.showToastError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

//done
export const valideReferCode = (data, onClose = () => {}, setReferCode) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await appOperation.guest.refer_code(data);
    if (response?.success) {
      toastAlert.showToastError(response?.message);
      onClose();
    } else {
      toastAlert.showToastError(response?.message);
      setReferCode('')
    }
  } catch (e) {
    logError(e);
    toastAlert.showToastError(e?.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const resetSignUpOtp = id => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    const response = await appOperation.guest.resend_otp(id);
    if (response?.success) {
      toastAlert.showToastError(response?.message);
    } else {
      toastAlert.showToastError(response?.message);
    }
  } catch (e) {
    logError(e);
    toastAlert.showToastError(e?.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const refreshToken = () => async () => {
  try {
    const response = await appOperation.customer.refresh_token();
    if (response?.success) {
      appOperation.setCustomerToken(response?.data?.accessToken);
      await AsyncStorage.setItem(USER_TOKEN_KEY, response?.data?.accessToken);
    }
  } catch (e) {
    logError(e);
    // toastAlert.showToastError(e?.message);
  }
};

export const updateDeviceToken = () => async dispatch => {
  let fcmToken = await AsyncStorage.getItem(FCM_TOKEN_KEY);

  let data = {
    fcm_device: Platform.OS,
    fcm_token: fcmToken,
  };
  try {
    const response = await appOperation.customer?.fcm_token(data);
  } catch (e) {
    logError(e);
  }
};




//done
export const userLogout = () => async () => {
  appOperation.setCustomerToken('');
  await AsyncStorage.removeItem(USER_TOKEN_KEY);
//   NavigationService.reset(AUTHSTACK);
};