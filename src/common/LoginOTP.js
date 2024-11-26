import { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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
import OTPInputView from "@twotalltotems/react-native-otp-input";
import FastImage from "react-native-fast-image";
import { timerIcon } from "../helper/image";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, userSignup } from "../actions/authActions";
import { SpinnerSecond } from "./SnipperSecond";
import { universalPaddingHorizontal } from "../theme/dimens";

const LoginOTP = ({ otp, setOtp, phoneNumber, referCode, onCloseOtp, isForgot, onResetPassword }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return state.auth.isLoading;
  });
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT
  );
  const autoSubmitOtpTimerIntervalCallbackReference = useRef();
  const RESEND_OTP_TIME_LIMIT = 60; // 30 secs

  let resendOtpTimerInterval;
  // const [code, setCode] = useState("");

  useEffect(() => {
    autoSubmitOtpTimerIntervalCallbackReference.current =
      autoSubmitOtpTimerIntervalCallback;
  }, []);

  useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  const autoSubmitOtpTimerIntervalCallback = () => {};

  const handleResendOTP = () => {
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();
    let number = parseInt(phoneNumber);
    let data = {
      signId: number,
      type: isForgot ? "changePassword" : "loginOtp",
    };
    dispatch(userSignup(data));
  };

  // const handleOtp = () => {
    
  // }
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
        style={{ marginVertical: 15, paddingHorizontal: universalPaddingHorizontal }}
        weight={INTER_SEMI_BOLD}
      >
        Verification
      </AppText>
      <View style={styles.menuView}>
        <AppText type={FORTEEN} color={BLUE} weight={INTER_MEDIUM}>
          OTP has sent to {phoneNumber}
        </AppText>
        <TouchableOpacity onPress={onCloseOtp}>
          <AppText type={FORTEEN} color={BLUE} weight={INTER_MEDIUM}>
            Change
          </AppText>
        </TouchableOpacity>
      </View>
      <OTPInputView
        style={{
          width: "100%",
          alignSelf: "center",
          marginTop: 20,
          height: 50,
          paddingHorizontal: universalPaddingHorizontal
        }}
        pinCount={6}
        code={otp}
        autoFocusOnLoad={false}
        editable={true}
        keyboardType="number-pad"
        placeholderCharacter="-"
        onCodeChanged={(value) => setOtp(value)}
        onCodeFilled={(code) => {
          if (code.length === 6) {
            let number = parseInt(phoneNumber);
            if(isForgot) {
              onResetPassword();
              setOtp(otp);
            } else {
              let otp = parseInt(code);
              let _data = {
                signId: number,
                otp: otp,
                refCode: referCode,
              };
              dispatch(otpVerification(_data , onCloseOtp));
            }
          }
        }}
        placeholderTextColor={colors.black}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
      />
      <View style={[styles.menuView, { marginTop: 10 }]}>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 1 }}
        >
          <FastImage
            source={timerIcon}
            resizeMode="contain"
            tintColor={colors.black}
            style={{ width: 15, height: 15, marginRight: 3 }}
          />
          {resendButtonDisabledTime > 0 ? (
            <AppText
              //  onPress={onResend}

              type={FORTEEN}
              color={BOTTOMTEXT}
              weight={INTER_SEMI_BOLD}
            >
              Resend OTP in{" "}
              {resendButtonDisabledTime > 0
                ? "0:" + resendButtonDisabledTime
                : "00:00"}
            </AppText>
          ) : (
            <TouchableOpacity onPress={handleResendOTP}>
              <AppText
                //  onPress={onResend}
                type={FORTEEN}
                color={BOTTOMTEXT}
                weight={INTER_SEMI_BOLD}
              >
                Resend OTP
              </AppText>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <SpinnerSecond loading={loading} />
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
    justifyContent: "space-between",
    paddingHorizontal: universalPaddingHorizontal
  },
});
