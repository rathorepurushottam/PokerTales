import { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import {
  AppText,
  BLUE,
  BOTTOMTEXT,
  DISABLETEXT,
  FORTEEN,
  INTER_BOLD,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  RED,
  TWELVE,
  TWENTY,
} from "./AppText";
import { colors } from "../theme/color";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import FastImage from "react-native-fast-image";
import { timerIcon } from "../helper/image";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, userSignup } from "../actions/authActions";
import { getAadharOtp, verifyKycOtp } from "../actions/profileAction";
import { SpinnerSecond } from "./SnipperSecond";
import { universalPaddingHorizontal } from "../theme/dimens";
import { OtpInput } from "react-native-otp-entry";

const KycOTP = ({ aadharNumber, setRefId, onCloseOtp, refId}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return state.auth.isLoading;
  });
  const [otp, setOtp] = useState('');
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT
  );
  const autoSubmitOtpTimerIntervalCallbackReference = useRef();
  const RESEND_OTP_TIME_LIMIT = 60; // 30 secs

  const [timer, setTimer] = useState(30); // Timer starts at 30 seconds
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState("");

  const handleResendOTP = () => {
    setTimer(30); // Reset the timer
    setIsButtonDisabled(true);
    let data = {
      aadharNumber: aadharNumber,
    };
    dispatch(getAadharOtp(data, setRefId, setError));
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval); // Clear interval on component unmount
    } else {
      setIsButtonDisabled(false);
    }
  }, [timer]);


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
        style={{ marginVertical: 15,  paddingHorizontal: universalPaddingHorizontal }}
        weight={INTER_SEMI_BOLD}
      >
        Verification
      </AppText>
      <View style={styles.menuView}>
        <AppText type={FORTEEN} color={BLUE} weight={INTER_MEDIUM}>
          OTP has sent to Phone Number linked with Aadhar
        </AppText>
      </View>
      {/* <OTPInputView
        style={{
          width: "100%",
          alignSelf: "center",
          marginTop: 20,
          height: 50,
          paddingHorizontal: universalPaddingHorizontal,
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
              let _data = {
                aadharOtp: code,
                refId: refId,
              };
              dispatch(verifyKycOtp(_data , onCloseOtp, setError));
        
          }
        }}
        placeholderTextColor={colors.black}
        codeInputFieldStyle={!error
          ? styles.underlineStyleBase
          : styles.errorUnderlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
      /> */}
      <OtpInput
        numberOfDigits={6}
        focusColor={colors.darkBlue}
        focusStickBlinkingDuration={500}
        onTextChange={(text) => setOtp(text)}
        onFilled={(code) => {
          console.log(code.length, "code.length")
          if (code.length === 6) {
              let _data = {
                aadharOtp: code,
                refId: refId,
              };
              dispatch(verifyKycOtp(_data , onCloseOtp, setError));
        
          }
        }}
        autoFocus={true}
        textInputProps={{
          accessibilityLabel: "One-Time Password",
        }}
        theme={{
          containerStyle: styles.otpContainer,
          pinCodeContainerStyle: !error
            ? styles.underlineStyleBase
            : styles.errorUnderlineStyleBase,
          pinCodeTextStyle: styles.pinCodeText,
          // focusStickStyle: styles.focusStick,
          focusedPinCodeContainerStyle: error ? styles.errorUnderlineStyleBase : styles.underlineStyleHighLighted,
        }}
      />
      {!error && (
        <AppText
          type={TWELVE}
          color={RED}
          style={{
            marginVertical: 5,
            paddingHorizontal: universalPaddingHorizontal,
            // textAlign: "center",
          }}
          weight={INTER_SEMI_BOLD}
        >
          {error}
        </AppText>
      )}
      <View style={[styles.menuView, { marginTop: 10 }]}>
      <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 1,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {isButtonDisabled && (
              <>
                <FastImage
                  source={timerIcon}
                  resizeMode="contain"
                  tintColor={colors.black}
                  style={{ width: 15, height: 15, marginRight: 3 }}
                />
                <AppText
                  //  onPress={onResend}
                  type={FORTEEN}
                  color={BOTTOMTEXT}
                  weight={INTER_SEMI_BOLD}
                >
                  {`00:${timer}`}
                </AppText>
              </>
            )}
          </View>

          <TouchableOpacity
            onPress={handleResendOTP}
            disabled={isButtonDisabled}
          >
            <AppText
              //  onPress={onResend}
              type={FORTEEN}
              color={isButtonDisabled ? DISABLETEXT: BOTTOMTEXT}
              weight={INTER_SEMI_BOLD}
            >
              Resend OTP
            </AppText>
          </TouchableOpacity>
          {/* <SecondaryButton title={'Resend OTP'}/> */}
        </View>
      </View>
      <SpinnerSecond loading={loading}/>
    </View>
  );
};

export default KycOTP;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  // underlineStyleBase: {
  //   width: 46,
  //   height: 40,
  //   borderRadius: 10,
  //   backgroundColor: "#F5F5F5",
  //   color: colors.black,
  //   borderWidth: 1,
  //   borderColor: "#E4E4E4",
  // },
  // underlineStyleHighLighted: {
  //   borderColor: colors.darkBlue,
  // },
  menuView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: universalPaddingHorizontal,
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
  errorUnderlineStyleBase: {
    width: 46,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.lightRed,
  },
  underlineStyleHighLighted: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.darkBlue,
    textAlign: "center",
  },
  otpContainer: {
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
    height: 50,
    paddingHorizontal: universalPaddingHorizontal,
  },
  pinCodeText: {
    fontFamily: INTER_BOLD,
    color: colors.darkBlue,
    fontSize: 18,
  },
});
