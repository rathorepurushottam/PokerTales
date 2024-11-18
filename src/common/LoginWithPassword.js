import { StyleSheet, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import {
  AppText,
  BLACK,
  BLUE,
  BOTTOMTEXT,
  FORTEEN,
  INTER_MEDIUM,
  INTER_REGULAR,
  INTER_SEMI_BOLD,
  LIGHTBLUE,
  TWENTY,
  WHITE,
} from "./AppText";
import InputBox from "./InputBox";
import { universalPaddingHorizontal } from "../theme/dimens";
import { colors } from "../theme/color";
import { TouchableOpacityView } from "./TouchableOpacityView";
import Checkbox from "./CheckBox";
import PrimaryButton from "./PrimaryButton";
import { useRef, useState } from "react";
import ForgotPassword from "./ForgotPassword";
import { toastAlert, validateEmail, validatePassword, validatePhoneNumber } from "../helper/utility";
import { useDispatch } from "react-redux";
import { loginUsingPassword } from "../actions/authActions";


const LoginWithPassword = ({ setIsRememberSelected, isRememberSelected, onOpenForgot, onCloseLogin }) => {
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(true);
  const [signId, setSignId] = useState("");
  const [password, setPassword] = useState("");
  const [signFocus, setSignFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);


  const handleLoginUsingPassword = () => {
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
  
    if (!password) {
      toastAlert.showToastError("Please enter password");
      return;
    };
    if (!validatePassword(password)) {
      toastAlert.showToastError("Invalid password format.");
      return;
    }
    let number =  signId.includes('@') ? signId : parseInt(signId);
    let data = {
      password: password,
      signId: number
    }

    dispatch(loginUsingPassword(data ,onCloseLogin));
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
        style={{ marginVertical: 15 }}
        weight={INTER_SEMI_BOLD}
      >
        Login via Password
      </AppText>
      <InputBox
        placeholder={"Email or mobile"}
        top
        placeholderTextColor={"#00000066"}
        textInputStyle={{
          borderWidth: 1,
          borderColor: signFocus ? "#1251AE" : "#E4E4E4",
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          height: 55,
        }}
        onFocus={() => setSignFocus(true)}
        onBlur={() => setSignFocus(false)}
        onChange={(value) => setSignId(value)}
        value={signId}
      />
      <InputBox
        placeholder={"Password"}
        top
        placeholderTextColor={"#00000066"}
        textInputStyle={{
          borderWidth: 1,
          borderColor: passFocus ? "#1251AE" : "#E4E4E4",
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          marginTop: 25,
          height: 55,
        }}
        onFocus={() => setPassFocus(true)}
        onBlur={() => setPassFocus(false)}
       value={password}
       onChange={(value) => setPassword(value)}
        isPassword={true}
        secureTextEntry={showPass}
        onToggle={() => setShowPass(!showPass)}
      />
      <View style={styles.referView}>
        <TouchableOpacityView
          onPress={() => setIsRememberSelected(!isRememberSelected)}
          style={styles.checkbox}
        >
          <Checkbox
            onPress={() => setIsRememberSelected(!isRememberSelected)}
            value={isRememberSelected}
            style={{ borderColor: colors.black, marginRight: 10 }}
            innerStyle={{ backgroundColor: colors.darkBlue }}
            login
          />
          <AppText type={FORTEEN} color={BOTTOMTEXT} weight={INTER_MEDIUM} style={{ marginLeft: 10 }}>
            Remember me
          </AppText>
        </TouchableOpacityView>
        <TouchableOpacityView onPress={onOpenForgot}>
        <AppText type={FORTEEN} color={BOTTOMTEXT} weight={INTER_MEDIUM}>
          Forgot Password?
        </AppText>
        </TouchableOpacityView>
      </View>
      <PrimaryButton
        title={"Login"}
        weight={INTER_MEDIUM}
        disabled={(!signId || !password)}
        buttonStyle={{ marginTop: 40 }}
        onPress={handleLoginUsingPassword}
      />
     
    </View>
  );
};

export default LoginWithPassword;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  referView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60,
  },
  checkbox: {
    flexDirection: "row",
    // marginTop: 30,
  },
});
