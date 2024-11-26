import { ToastAndroid } from "react-native";
import { interBold } from "../theme/typography";

export const BASE_URL = 'https://api.pokertales.com/';

export const IMAGE_BASE_URL = 'https://api.pokertales.com/';

export const toastAlert = {
    // showToastSuccess: (message, duration = 2500) => { },
    showToastError: (message, duration = 2500) => {
      Platform.OS == 'ios' ?
        Toast.show({
          type: 'success',
          text1: 'My Battle 11',
          text2: `${message}`,
          text2Style: { fontSize: 12, fontFamily: interBold },
          text1Style: { fontFamily: interBold },
        }) :
        ToastAndroid.show(message, ToastAndroid.BOTTOM, ToastAndroid.LONG);
    },
  };

  export const validatePhoneNumber = (phoneNumber) => {
    const expression =
    /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    return expression.test(phoneNumber);
  };

  export const validateEmail = (email) => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  
    return expression.test(email);
  };

  export const validateAadharNumber = (num) => {
    const expression =
      /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/i;
  
    return expression.test(num);
  };

  export const validatePanNumber = (num) => {
    const expression =
      /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/i;
  
    return expression.test(num);
  };

  export const validatePassword = (value) => {
    const expression =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i;
  
    return expression.test(value);
  };

  export const logError = error => {
    console.log(error);
  };