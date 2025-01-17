import { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";

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
import FastImage from "react-native-fast-image";
import { timerIcon } from "../helper/image";
import { useDispatch, useSelector } from "react-redux";
import {
    emailOtpVerification,
  otpVerification,
  phoneOtpVerification,
  userSignup,
} from "../actions/authActions";
import { SpinnerSecond } from "./SnipperSecond";
import { universalPaddingHorizontal } from "../theme/dimens";
import SmsRetriever from "react-native-sms-retriever";
import { upateUserEmail } from "../actions/profileAction";

const EmailOTP = ({
  otp,
  setOtp,
  userEmail,
  onCloseOtp,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return state.auth.isLoading;
  });
  const [timer, setTimer] = useState(30); // Timer starts at 30 seconds
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const [error, setError] = useState("");

  const handleResendOTP = () => {
    setTimer(30); // Reset the timer
    setIsButtonDisabled(true);
    let data = {
        emailId: userEmail,
    };
    dispatch(upateUserEmail(data));
  };

  const extractOTP = (message) => {
    // This is a simple regex to extract a 4-6 digit OTP from the message
    const otp = message.match(/\d{4,6}/);
    return otp ? otp[0] : "";
  };

  const startSmsListener = async () => {
    try {
      const smsToken = await SmsRetriever.startSmsRetriever();
      console.log("SMS token: ", smsToken);

      SmsRetriever.addSmsListener((event) => {
        setMessage(event.message); // Handle the received message here
        const otpFromMessage = extractOTP(event.message); // Extract OTP from message
        console.log("otpFromMessage", otpFromMessage);
        setOtp(otpFromMessage);
        // setCode(otpFromMessage);
        onSubmit(otpFromMessage);
        SmsRetriever.removeSmsListener(); // Stop listening after OTP received
      });
    } catch (error) {
      console.log("Error fetching OTP: ", error);
    }
  };

  useEffect(() => {
    // Start listening for SMS
    startSmsListener();

    return () => {
      // Clean up the listener when component unmounts
      SmsRetriever.removeSmsListener();
    };
  }, []);

  const onSubmit = async (otpCode) => {
    // const verificationCode = otpCode || otp;
    if (otpCode.length !== 6) {
      console.log(otpCode, "verificationCode");
      toastAlert.showToastError("Please provide a valid OTP");
    } else {
      let otp = parseInt(code);
      let _data = {
        emailId: userEmail,
        otp: otp,
      };
      
       dispatch(emailOtpVerification(_data, onCloseOtp, setError))
          
    }
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

  function maskEmail(email) {
    const [localPart, domain] = email.split('@');
    const firstChar = localPart[0];
    const lastChars = localPart.slice(-2);
    const maskedLocalPart = `${firstChar}****${lastChars}`;
    return `${maskedLocalPart}@${domain}`;
  }


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
        style={{
          marginVertical: 15,
          paddingHorizontal: universalPaddingHorizontal,
        }}
        weight={INTER_SEMI_BOLD}
      >
        Verification
      </AppText>
      <View style={styles.menuView}>
        <AppText type={FORTEEN} color={BLUE} weight={INTER_MEDIUM}>
          OTP has sent to {maskEmail(userEmail)}
        </AppText>
        <TouchableOpacity onPress={onCloseOtp}>
          <AppText type={FORTEEN} color={BLUE} weight={INTER_MEDIUM}>
            Change
          </AppText>
        </TouchableOpacity>
      </View>

      <OtpInput
        numberOfDigits={6}
        focusColor={colors.darkBlue}
        focusStickBlinkingDuration={500}
        onTextChange={(text) => setOtp(text)}
        onFilled={(code) => {
          if (code.length === 6) {
              let otp = parseInt(code);
              let _data = {
                emailId: userEmail,
                otp: otp,
              };
              
             dispatch(emailOtpVerification(_data, onCloseOtp, setError))
               
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
              color={isButtonDisabled ? DISABLETEXT : BOTTOMTEXT}
              weight={INTER_SEMI_BOLD}
            >
              Resend OTP
            </AppText>
          </TouchableOpacity>
          {/* <SecondaryButton title={'Resend OTP'}/> */}
        </View>
      </View>
      <SpinnerSecond loading={loading} />
    </View>
  );
};

export default EmailOTP;

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
  menuView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: universalPaddingHorizontal,
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
