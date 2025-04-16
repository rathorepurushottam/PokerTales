import { useEffect, useRef, useState } from "react";
import { ImageBackground, Linking, Modal, Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { useDispatch, useSelector } from "react-redux";

import { AppSafeAreaView } from "../common/AppSafeAreaView";
import { backgroundImage, whatsupAppIcon } from "../helper/image";
import Slider from "../common/Slider";
import { colors } from "../theme/color";
import {
  AppText,
  FORTEEN,
  GOLDEN,
  INTER_LIGHT,
  INTER_MEDIUM,
  INTER_REGULAR,
  LIGHTBLUE,
  TEXTGREY,
  TWELVE,
  TWENTY_TWO,
  WHITE,
} from "../common/AppText";
import { universalPaddingHorizontal } from "../theme/dimens";
import InputBox from "../common/InputBox";
import PrimaryButton from "../common/PrimaryButton";
import { TouchableOpacityView } from "../common/TouchableOpacityView";

import Checkbox from "../common/CheckBox";
import FastImage from "react-native-fast-image";
import { KeyBoardAware } from "../common/KeyBoardAware";
import LoginWithPassword from "../common/LoginWithPassword";
import ReferCode from "../common/ReferCode";
import ForgotPassword from "../common/ForgotPassword";
import LoginOTP from "../common/LoginOTP";
import ResetPassword from "../common/ResetPassword";
import { toastAlert, validatePhoneNumber } from "../helper/utility";
import { userSignup } from "../actions/authActions";
import { SpinnerSecond } from "../common/SnipperSecond";
import NavigationService from "../navigation/NavigationService";
import { SUB_MENU_SCREEN } from "../navigation/routes";
import CustomModal from "../common/CustomModal";

const Login = () => {
  const dispatch = useDispatch();
  const refRBSheetLogin = useRef();
  const refRBSheetRefer = useRef();
  const refRBSheetForgot = useRef();
  const refRBSheetOTP = useRef();
  const refRBSheetPassword = useRef();
  const loading = useSelector((state) => {
    return state.auth.isLoading;
  });
  const [isAgeSelected, setIsAgeSelected] = useState(true);
  const [isPromonSelected, setIsPromoSelected] = useState(true);
  const [isRememberSelected, setIsRememberSelected] = useState(true);
  // const [isLogin, setIsLogin] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [referCode, setReferCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const locationAccess = useSelector((state) => {
    return state.auth.locationAccess;
  });

  const banStates = useSelector((state) => {
    return state.profile.banStates;
  });

  const handleOpenForgot = () => {
    refRBSheetLogin?.current?.close();
    refRBSheetForgot?.current?.open();
    setIsForgot(true);
    setOtp('');
  };

  const handleCloseForgot = () => {
    refRBSheetForgot?.current?.close();
    refRBSheetOTP?.current?.open();
    // setIsLogin(true);
  };

  const handleResetPassword = () => {
    refRBSheetOTP?.current?.close();
    if (isForgot) {
      refRBSheetPassword?.current?.open();
    }

  };

  const handleOtp = () => {
    refRBSheetOTP?.current?.open();
  };

  console.log(banStates, "banStates");

  const handleOTP = () => {
    if (locationAccess !== 'granted') {
      toastAlert.showToastError("Please allow location access to log in");
      return;
    };
    if (!phoneNumber) {
      toastAlert.showToastError("Please enter Mobile Number");
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      toastAlert.showToastError("Please Enter Correct Mobile Number");
      return;
    }
    if (!isAgeSelected) {
      toastAlert.showToastError("Please click on terms and condtions");
      return;
      
    } 
    if (!isPromonSelected) {
      toastAlert.showToastError("Please click on Promtional SMS.");
      return;
    } else {
      let number = parseInt(phoneNumber);
      let data = {
        signId: number,
        type: "loginOtp",
      };

      dispatch(userSignup(data, handleOtp));
    }

    setIsForgot(false);
    setOtp('');
  };

  const handleCloseRefer = () => {
    refRBSheetRefer.current.close();
  };

  const handleCloseLogin = () => {
    refRBSheetLogin.current.close();
  };

  const handleCloseResetPass = () => {
    refRBSheetPassword.current.close();
    refRBSheetLogin.current.open();
  };

  const handleCloseOtp = () => {
    refRBSheetOTP.current.close();
    if (isForgot) {
      refRBSheetForgot?.current?.close();
    };
  };

  return (
    <AppSafeAreaView statusColor={'#00071C'}>
      <KeyBoardAware style={{ paddingHorizontal: 0 }}>
        <ImageBackground
          source={backgroundImage}
          resizeMode="cover"
          style={styles.backImage}
        >
          <Slider />
          <View style={styles.mainView}>
            <AppText
              type={TWENTY_TWO}
              color={WHITE}
              style={{ marginVertical: 15 }}
            >
              Login or Register
            </AppText>
            <InputBox
              placeholder={"Enter mobile number"}
              top
              phone
              keyboardType={'numeric'}
              textInputStyle={{ color: "white", fontSize: 16 }}
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
              containerStyle={{
                borderWidth: phoneFocus ? 1 : 0,
                borderColor: phoneFocus && "#FFFFFF26",
              }}
              maxLength={10}
              value={phoneNumber}
              onChange={setPhoneNumber}
              cursorColor={colors.white}
            />
            <View style={styles.referView}>
              <TouchableOpacityView
                onPress={() => {
                  setReferCode('');
                  refRBSheetRefer.current.open();
                }}
              >
                <AppText
                  type={FORTEEN}
                  color={LIGHTBLUE}
                  weight={INTER_REGULAR}
                >
                  Referral Code?
                </AppText>
              </TouchableOpacityView>
              <TouchableOpacityView
                onPress={() => refRBSheetLogin.current.open()}
              >
                <AppText
                  type={FORTEEN}
                  color={LIGHTBLUE}
                  weight={INTER_REGULAR}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.lightBlue,
                  }}
                >
                  Use Password?
                </AppText>
              </TouchableOpacityView>
            </View>
            <PrimaryButton
              title={"Get OTP"}
              disabled={!phoneNumber || !isPromonSelected || !isAgeSelected || phoneNumber.length < 10}
              weight={INTER_MEDIUM}
              onPress={handleOTP}
            />
            <TouchableOpacityView
              onPress={() => setIsAgeSelected(!isAgeSelected)}
              style={[styles.checkbox, {marginTop: 30}]}
            >
              <Checkbox
                onPress={() => setIsAgeSelected(!isAgeSelected)}
                value={isAgeSelected}
              />
              <View>
              <AppText
                type={TWELVE}
                color={TEXTGREY}
                weight={INTER_REGULAR}
                style={{ marginHorizontal: 10 }}
              >
                I certify that I am 18 years old and I agree to the 
              </AppText>
              <AppText
                  color={GOLDEN}
                  onPress={() =>  NavigationService.navigate(SUB_MENU_SCREEN, {data: 'Terms & Conditions'})}
                  style={{
                    // borderBottomWidth: 1,
                    // borderBottomColor: colors.goldenColor,
                    // marginRight: 50,
                    textDecorationLine: "underline",
                    marginLeft: 12
                  }}
                >
                 Terms & Conditions
                </AppText>
              </View>
              
            </TouchableOpacityView>
            <TouchableOpacityView
              onPress={() => setIsPromoSelected(!isPromonSelected)}
              style={styles.checkbox}
            >
              <Checkbox
                onPress={() => setIsPromoSelected(!isPromonSelected)}
                value={isPromonSelected}
              />
              <AppText
                type={TWELVE}
                weight={INTER_REGULAR}
                color={TEXTGREY}
                style={{ marginHorizontal: 10, lineHeight: 20 }}
              >
                Agree to receiving promotional & marketing emails/ SMS.
              </AppText>
            </TouchableOpacityView>
            <TouchableOpacity style={styles.bottomView} onPress={() => Linking.openURL('whatsapp://app')}>
              <AppText weight={INTER_REGULAR} color={TEXTGREY}>
                Need help?
              </AppText>
              <FastImage
                source={whatsupAppIcon}
                resizeMode="contain"
                style={{ width: 20, height: 20, marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyBoardAware>
      <RBSheet
        ref={refRBSheetLogin}
        closeOnDragDown={true}
        height={420}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <LoginWithPassword
          setIsRememberSelected={setIsRememberSelected}
          isRememberSelected={isRememberSelected}
          onOpenForgot={handleOpenForgot}
          onCloseLogin={handleCloseLogin}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheetRefer}
        closeOnDragDown={true}
        height={250}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <ReferCode onCloseRefer={handleCloseRefer} setReferCode={setReferCode} referCode={referCode}/>
      </RBSheet>
      <RBSheet
        ref={refRBSheetForgot}
        closeOnDragDown={true}
        height={250}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <ForgotPassword onCloseForgot={handleCloseForgot} setPhoneNumber={setPhoneNumber}/>
      </RBSheet>
      <RBSheet
        ref={refRBSheetOTP}
        closeOnDragDown={true}
        height={280}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <LoginOTP
          onResetPassword={handleResetPassword}
          setOtp={setOtp}
          otp={otp}
          phoneNumber={phoneNumber}
          referCode={referCode}
          onCloseOtp={handleCloseOtp}
          isForgot={isForgot}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheetPassword}
        closeOnDragDown={true}
        height={450}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <ResetPassword onCloseResetPass={handleCloseResetPass} signId={phoneNumber} otp={otp} setIsForgot={setIsForgot} setIsOpen={setIsOpen}/>
      </RBSheet>
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen} desc={'Your password has been successfully changed.'} title={'Success'}/>
      <SpinnerSecond loading={loading} />
    </AppSafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  backImage: {
    height: "100%",
    width: "100%",
  },
  mainView: {
    marginTop: 20,
    flex: 1,
    backgroundColor: colors.darkBlue,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: universalPaddingHorizontal,
  },
  referView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  checkbox: {
    flexDirection: "row",
    marginTop: 10,
  },
  bottomView: {
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});
