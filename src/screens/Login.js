import { ImageBackground, StyleSheet, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

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
import { useRef, useState } from "react";
import Checkbox from "../common/CheckBox";
import FastImage from "react-native-fast-image";
import { KeyBoardAware } from "../common/KeyBoardAware";
import LoginWithPassword from "../common/LoginWithPassword";
import ReferCode from "../common/ReferCode";
import ForgotPassword from "../common/ForgotPassword";
import LoginOTP from "../common/LoginOTP";
import ResetPassword from "../common/ResetPassword";
import { toastAlert } from "../helper/utility";

const Login = () => {
  const refRBSheetLogin = useRef();
  const refRBSheetRefer = useRef();
  const refRBSheetForgot = useRef();
  const refRBSheetOTP = useRef();
  const refRBSheetPassword = useRef();
  const [isAgeSelected, setIsAgeSelected] = useState(false);
  const [isPromonSelected, setIsPromoSelected] = useState(false);
  const [isRememberSelected, setIsRememberSelected] = useState(false);

  const handleOpenForgot = () => {
    refRBSheetLogin?.current?.close();
    refRBSheetForgot?.current?.open();
  };

  const handleCloseForgot = () => {
    refRBSheetForgot?.current?.close();
    refRBSheetOTP?.current?.open();
  };

  const handleResetPassword = () => {
    refRBSheetOTP?.current?.close();
    refRBSheetPassword?.current?.open();
  };

  const handleOTP = () => {
    if(!isAgeSelected) {
        toastAlert.showToastError("Please click on terms and condtions");
        return;
    };
  }

  return (
    <AppSafeAreaView>
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
            <InputBox placeholder={"Enter mobile number"} top phone textInputStyle={{color: "white"}}/>
            <View style={styles.referView}>
            <TouchableOpacityView
                onPress={() => refRBSheetRefer.current.open()}
              >
              <AppText type={FORTEEN} color={LIGHTBLUE} weight={INTER_REGULAR}>
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
            <PrimaryButton title={"Get OTP"} weight={INTER_MEDIUM} onPress={handleOTP}/>
            <TouchableOpacityView
              onPress={() => setIsAgeSelected(!isAgeSelected)}
              style={styles.checkbox}
            >
              <Checkbox
                onPress={() => setIsAgeSelected(!isAgeSelected)}
                value={isAgeSelected}
              />
              <AppText
                type={TWELVE}
                color={TEXTGREY}
                weight={INTER_LIGHT}
                style={{ marginLeft: 10 }}
              >
                I clarify that I am 18 years old and I agree to the{" "}
                <AppText
                  color={GOLDEN}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colors.goldenColor,
                  }}
                >
                  Terms & Conditions
                </AppText>
              </AppText>
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
                weight={INTER_LIGHT}
                color={TEXTGREY}
                style={{ marginLeft: 10 }}
              >
                Agree to receiving promotional & marketing emails/ SMS.
              </AppText>
            </TouchableOpacityView>
            <View style={styles.bottomView}>
              <AppText weight={INTER_LIGHT} color={TEXTGREY}>
                Need help?
              </AppText>
              <FastImage
                source={whatsupAppIcon}
                resizeMode="contain"
                style={{ width: 20, height: 20, marginLeft: 6 }}
              />
            </View>
          </View>
        </ImageBackground>
      </KeyBoardAware>
      <RBSheet
        ref={refRBSheetLogin}
        closeOnDragDown={true}
        height={380}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingHorizontal: universalPaddingHorizontal,
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
            paddingHorizontal: universalPaddingHorizontal,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <ReferCode />
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
            paddingHorizontal: universalPaddingHorizontal,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <ForgotPassword onCloseForgot={handleCloseForgot}/>
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
            paddingHorizontal: universalPaddingHorizontal,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <LoginOTP onResetPassword={handleResetPassword}/>
      </RBSheet>
      <RBSheet
        ref={refRBSheetPassword}
        closeOnDragDown={true}
        height={400}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingHorizontal: universalPaddingHorizontal,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <ResetPassword />
      </RBSheet>
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
    marginTop: 5,
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
    marginTop: 30,
  },
  bottomView: {
    marginTop: 40,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});
