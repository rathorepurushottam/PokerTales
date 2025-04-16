import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "redux";
import { appOperation } from "../appOperation";
import { logError, toastAlert } from "../helper/utility";
import { FCM_TOKEN_KEY, USER_TOKEN_KEY } from "../libs/constant";
// import NavigationService from '../navigation/NavigationService';
// import {
//   AUTHSTACK,
//   BOTTOM_NAVIGATION_STACK,
//   HOME,
//   MYBATTLEOTP,
//   OTP,
// } from '../navigation/routes';
import { setLoading } from "../slices/authSlice";
import { BOTTOM_NAVIGATION_STACK } from "../navigation/routes";
import NavigationService from "../navigation/NavigationService";
import { Vibration } from "react-native";
import { getUserProfile } from "./profileAction";
// import { setUserData, setWalletCreate } from '../slices/profileSlice';
// import { getUserProfile } from './profileAction';
//done
export const userLogin = (data) => async (dispatch) => {
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
  (data, onClose = () => {}, setError = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.guest.register(data);
      console.log(response, "response");
      if (response?.success) {
        setError("");
        // toastAlert.showToastError(response?.message);
        onClose();
      } else {
        setError(response?.message);
        // toastAlert.showToastError(response?.message);
      }
    } catch (e) {
      dispatch(setLoading(false));
      console.log(e);
      setError(e?.message);
      logError(e);
      // toastAlert.showToastError(e?.message);
      console.log(e, "eeee");
    } finally {
      dispatch(setLoading(false));
    }
  };
//done
export const otpVerification =
  (data, onCloseOtp = () => {}, setError) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      // const response = await appOperation.guest.otp_verification(data);
      console.log(response, "response");
      // if (response?.success) {
        setError("");
        NavigationService.reset(BOTTOM_NAVIGATION_STACK);
        // dispatch(getUserProfile());
        // toastAlert.showToastError(response?.message);
        onCloseOtp();
      // } else {
      //   Vibration.vibrate(300);
      //   // toastAlert.showToastError(response?.message);
      //   setError(response?.message);
      // }
    } catch (e) {
      Vibration.vibrate(300);
      dispatch(setLoading(false));
      logError(e);
      // toastAlert.showToastError(e?.message);
      setError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const phoneOtpVerification =
  (
    data,
    onCloseOtp = () => {},
    setError = () => {},
    isForgot,
    onResetPassword = () => {}
  ) =>
  async (dispatch) => {
    let isNavigate = true;
    try {
      dispatch(setLoading(true));
      const response = await appOperation.customer.phone_otp_verify(data);
      console.log(response, "response");
      if (response?.success) {
        setError("");

        // toastAlert.showToastError(response?.message);
        onCloseOtp();
        if (isForgot) {
          onResetPassword();
        } else {
          dispatch(getUserProfile(isNavigate));
        }
      } else {
        Vibration.vibrate(300);
        // toastAlert.showToastError(response?.message);
        setError(response?.message);
      }
    } catch (e) {
      Vibration.vibrate(300);
      dispatch(setLoading(false));
      logError(e);
      // toastAlert.showToastError(e?.message);
      setError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const emailOtpVerification =
  (data, onCloseOtp = () => {}, setError) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.customer.email_otp_verify(data);
      console.log(response, "response");
      if (response?.success) {
        let isNavigate = true;
        setError("");
        dispatch(getUserProfile(isNavigate));
        toastAlert.showToastError(response?.message);
        onCloseOtp();
      } else {
        Vibration.vibrate(300);
        toastAlert.showToastError(response?.message);
        setError(response?.message);
      }
    } catch (e) {
      Vibration.vibrate(300);
      dispatch(setLoading(false));
      logError(e);
      // toastAlert.showToastError(e?.message);
      setError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

//done
export const loginUsingPassword =
  (data, onCloseLogin, setError) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.guest.loginUPasswor(data);
      if (response?.success) {
        //  toastAlert.showToastError(response?.message)
        await onCloseLogin();
        setError("");
        dispatch(getUserProfile());
        //  NavigationService.navigate(BOTTOM_NAVIGATION_STACK);
      } else {
        Vibration.vibrate(300);
        // toastAlert.showToastError(response?.message);
        setError(response?.message);
      }
    } catch (e) {
      Vibration.vibrate(300);
      dispatch(setLoading(false));
      logError(e);
      setError(e?.message);
      // toastAlert.showToastError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const forgotPassword =
  (data, onCloseForgot = () => {}, setIsOpen = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.guest.forgot_password(data);
      if (response?.success) {
        // toastAlert.showToastError(response?.message);
        onCloseForgot();
        setIsOpen(true);
      } else {
        toastAlert.showToastError(response?.message);
      }
    } catch (e) {
      dispatch(setLoading(false));
      logError(e);
      toastAlert.showToastError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

//done
export const valideReferCode =
  (data, onClose = () => {}, setReferCode, setError = () => {}) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await appOperation.guest.refer_code(data);
      if (response?.success) {
        setError("");
        toastAlert.showToastError(response?.message);
        onClose();
      } else {
        // toastAlert.showToastError(response?.message);
        setError(response?.message);
        setReferCode("");
      }
    } catch (e) {
      dispatch(setLoading(false));
      setError(e?.message);
      logError(e);
      setReferCode("");
      toastAlert.showToastError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const resetSignUpOtp = (id) => async (dispatch) => {
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
