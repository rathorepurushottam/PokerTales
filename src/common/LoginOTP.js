import { StyleSheet, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import {
  AppText,
  BLUE,
  BOTTOMTEXT,
  DISABLETEXT,
  FORTEEN,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  TWENTY,
} from "./AppText";
import InputBox from "./InputBox";
import { colors } from "../theme/color";
import { useState } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import FastImage from "react-native-fast-image";
import { timerIcon } from "../helper/image";

const LoginOTP = ({ onResetPassword }) => {
  const [code, setCode] = useState("");
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
        style={{ marginVertical: 15 }}
        weight={INTER_SEMI_BOLD}
      >
        Verification
      </AppText>
      <View style={styles.menuView}>
        <AppText
          type={FORTEEN}
          color={BLUE}
          weight={INTER_MEDIUM}
        >
          OTP has sent to 98******00
        </AppText>
        <AppText
          type={FORTEEN}
          color={BLUE}
          weight={INTER_MEDIUM}
        >
          Change
        </AppText>
      </View>
      <OTPInputView
        style={{
          width: "100%",
          alignSelf: "center",
          marginTop: 20,
          height: 50,
        }}
        pinCount={6}
        code={code}
        autoFocusOnLoad={false}
        editable={true}
        keyboardType="number-pad"
        placeholderCharacter="-"
        onCodeChanged={(value) => setCode(value)}
        onCodeFilled={(code) => {
          if (code.length == 6) {
            onResetPassword();
            //   if (id == 'register') {
            //     let _data = {
            //       refercode: Number.refercode,
            //       mobile_number: Number.mobile_number,
            //       otp: code,
            //     };
            //     dispatch(otpVerification(_data));
            //   }
          }
        }}
        placeholderTextColor={colors.black}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
      />
      <View style={[styles.menuView, {marginTop: 10}]}>
        <View style={{flexDirection: "row", alignItems: "center", padding: 1}}>
            <FastImage source={timerIcon} resizeMode="contain" tintColor={colors.black} style={{width: 15, height: 15, marginRight: 3}}/>
        <AppText
          type={FORTEEN}
          color={BOTTOMTEXT}
          weight={INTER_SEMI_BOLD}
        >
          00:00
        </AppText>
        </View>
     
        <AppText
          type={FORTEEN}
          color={DISABLETEXT}
          weight={INTER_MEDIUM}
        >
          Resend OTP
        </AppText>
      </View>
    </View>
  );
};

export default LoginOTP;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  underlineStyleBase: {
    width: 46,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    color: colors.black,
    borderWidth: 1,
    borderColor: "#E4E4E4",
  },
  underlineStyleHighLighted: {
    borderColor: colors.darkBlue,
  },
  menuView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
});
