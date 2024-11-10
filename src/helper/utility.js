import { ToastAndroid } from "react-native";
import { interBold } from "../theme/typography";

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