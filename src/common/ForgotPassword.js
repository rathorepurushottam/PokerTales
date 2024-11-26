import { useState } from "react";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import {
  AppText,
  BLUE,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  TWENTY,
} from "./AppText";
import InputBox from "./InputBox";
import { toastAlert, validateEmail, validatePhoneNumber } from "../helper/utility";
import { forgotPassword, userSignup } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerSecond } from "./SnipperSecond";
import { universalPaddingHorizontal } from "../theme/dimens";

const ForgotPassword = ({ onCloseForgot, setPhoneNumber }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return state.auth.isLoading;
  });
  const [signId, setSignId] = useState("");
  const [signFocus, setSignFocus] = useState(false);

  const handleForgotPassword = () => {
    if (!signId) {
      toastAlert.showToastError("Please enter Email or Mobile Number");
      return;
    }

    if(signId.includes('@')) {
      if(!validateEmail(signId)) {
        toastAlert.showToastError('Please Enter Correct Mobile Number');
          return;
      };
    } else if (!validatePhoneNumber(signId)) {
      toastAlert.showToastError('Please Enter Correct Mobile Number');
      return;
    }
    let number =  signId.includes('@') ? signId : parseInt(signId);
    let data = {
      
      signId: number,
      "type": "changePassword"
    };
    setPhoneNumber(number);

    dispatch(userSignup(data, onCloseForgot));

  };
  return (
    <View styles={styles.mainView}>
      <View
        style={{
          borderColor: "#5E6272",
          backgroundColor: "#5E6272",
          borderWidth: 2,
          width: "20%",
          alignSelf: "center",
          borderRadius: 10,
          marginVertical: 10,
        }}
      ></View>
      <AppText
        type={TWENTY}
        color={BLUE}
        style={{ marginVertical: 15, paddingHorizontal: universalPaddingHorizontal, }}
        weight={INTER_SEMI_BOLD}
      >
        Forgot Password
      </AppText>
      <InputBox
        placeholder={"Email or Phone"}
        top
        placeholderTextColor={"#00000066"}
        textInputStyle={{
          borderWidth: 1,
          borderColor: signFocus ? "#1251AE" : "#E4E4E4",
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          height: 55,
        }}
        style={{paddingHorizontal: universalPaddingHorizontal,}}
        onFocus={() => setSignFocus(true)}
        onBlur={() => setSignFocus(false)}
        onChange={(value) => setSignId(value)}
        value={signId}
      />

      <PrimaryButton
        title={"Get OTP"}
        weight={INTER_MEDIUM}
        disabled={!signId}
        buttonStyle={{ marginTop: 40, paddingHorizontal: universalPaddingHorizontal, }}
        onPress={handleForgotPassword}
      />
      <SpinnerSecond loading={loading} />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
