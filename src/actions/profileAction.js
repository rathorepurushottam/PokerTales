import { updateDeviceToken, userLogout } from './authActions';
import { Dispatch } from 'redux';
import { appOperation } from '../appOperation';
import { logError, toastAlert } from '../helper/utility';
// import NavigationService from '../navigation/NavigationService';
// import {
//   BOTTOM_NAVIGATION_STACK,
//   BOTTOM_TAB_PROFILE_SCREEN,
//   MY_BALANCE,
//   OTP,
// } from '../navigation/routes';
import { setLoading } from '../slices/authSlice';
import {
  setActivite,
  setKycDetails,
  setTransactionsContest,
  setTransactionsDeposit,
  setTransactionsWithdrawals,
  setUserData,
  setAadharDetails,
  setPanDetails,
} from '../slices/profileSlice';
import { AUTHSTACK, BOTTOM_NAVIGATION_STACK, BOTTOM_TAB_HOMESCREEN, LOGIN } from '../navigation/routes';
import NavigationService from '../navigation/NavigationService';
// import { setCreateWallet } from '../slices/matchSlice';

export const getUserProfile =
  (isNavigate = true, isUpdate = false) =>
    async (dispatch) => {
      try {
        dispatch(setLoading(true));
        const response = await appOperation.customer.get_profile();
        if (response?.success) {
        //   isNavigate ? NavigationService.reset(BOTTOM_NAVIGATION_STACK) : null;
        //   isUpdate ? NavigationService.navigate(BOTTOM_TAB_PROFILE_SCREEN) : null;
        NavigationService.reset(BOTTOM_NAVIGATION_STACK);
          dispatch(setUserData(response?.data));
          // dispatch(updateDeviceToken());
        } else {
          NavigationService.reset(AUTHSTACK);
          // toastAlert.showToastError(response?.message);
        }
      } catch (e) {
        logError(e);
        NavigationService.reset(AUTHSTACK);
        // toastAlert.showToastError(e?.message);
      } finally {
        dispatch(setLoading(false));
      }
    };


export const getAadharOtp = (data, setRefId, onKycOtp = () => {}) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const response = await appOperation.customer.get_aadhar_otp(data);
    console.log(response, "getAadharOtp");
    if (response?.success) {
      setRefId(response?.refId);
      toastAlert.showToastError(response?.message);
      onKycOtp();
    } else {
      toastAlert.showToastError(response?.message);
    }
    // dispatch(getUserProfile(false, false));
  } catch (e) {
    dispatch(setLoading(false));
    console.log(String(e));
    logError(e, "getAadharOtp");
  } finally {
    dispatch(setLoading(false));
  }
};
export const getKycDetails = () => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.getKycDetails();
    console.log(res, "res")
    if (res?.success) {
      dispatch(setKycDetails(res?.data));
    }
  } catch (e) {
    console.log('error in kycDetailsApi', e);
  }finally {
    dispatch(setLoading(false));
  }
};
export const sendKycOtp = data => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.sendKycOtp(data);
    dispatch(setLoading(false));
    if (res.code == 200) {
      toastAlert.showToastError(res.message);
    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log('error in kycDetailsApi', e);
  }
};

export const verifyPanNumber = (data, close = () => {}) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.verifyPanNumber(data);
    console.log(res, "res");
    if (res.success) {
      toastAlert.showToastError('Pan Details Fetched');
      dispatch(setPanDetails(res.data));
      dispatch(getKycDetails());
      close();
    } else {
      toastAlert.showToastError(res?.message);
    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log('error in Pan Number', e);
  }finally {
    dispatch(setLoading(false));
  }
};

export const verifyKycOtp = (data, onCloseOtp = () => {}) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.verifyKycOtp(data);
    dispatch(setLoading(false));
    if (res.success) {
      toastAlert.showToastError("Aadhar Details Fetched");
      dispatch(setAadharDetails(res.data));
      dispatch(getKycDetails());
      onCloseOtp();
    //   NavigationService.navigate(MY_BALANCE);
    } else {
      toastAlert.showToastError(res.message);
    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log(e);
  }
};
export const submitAadharDetails = (onClose = () => {}) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.submit_aadhar_details();
    if (res.success) {
      toastAlert.showToastError(res?.message);
      onClose();
      dispatch(getKycDetails());
    } else {
      toastAlert.showToastError(res?.message);

    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log('error in submitAadharDetails', e);
  }
};

export const submitPanDetails = (onClose = () => {}) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.submit_pan_details();
    if (res.success) {
      toastAlert.showToastError(res?.message);
      onClose();
      dispatch(getKycDetails());
    } else {
      toastAlert.showToastError(res?.message);

    }
  } catch (e) {
    dispatch(setLoading(false));
    console.log('error in submitpanDetails', e);
  }
};

export const userLogOut = (onClose = () => {}) => async dispatch => {
  try {
    // dispatch(setLoading(true));
    const res = await appOperation.customer.user_log_out();
    console.log(res, "res");
    if (res.success) {
      toastAlert.showToastError(res?.message);
      onClose();
      NavigationService.reset(AUTHSTACK);
    } else {
      toastAlert.showToastError(res?.message);

    }
  } catch (e) {
    // dispatch(setLoading(false));
    console.log('error in userLogOut', e);
  }finally {
    // dispatch(setLoading(false));
  }
};
export const getTransactionsDeposit = (type) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await appOperation.customer.alltransactions(type);
    if (response?.success) {
      dispatch(setTransactionsDeposit(response?.data));
    }
  } catch (e) {
    logError(e);
  } finally {
    dispatch(setLoading(false));
  }
};


export const editProfile = (data, id) => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await appOperation.customer.editProfile(data, id);
    if (res?.code == 200) {
      toastAlert.showToastError(res?.message);
      dispatch(getUserProfile(false, true));
    //   NavigationService.reset(BOTTOM_NAVIGATION_STACK)
    }
    dispatch(setLoading(false));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};