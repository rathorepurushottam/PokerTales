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
import { toastAlert, validatePassword } from "../helper/utility";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../actions/authActions";


const ResetPassword = ({ onCloseResetPass, signId, otp, setIsForgot }) => {
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(true);
  const [showConfPass, setShowConfPass] = useState(true);
  const [newPassFocus, setNewPassFocus] = useState(false);
  const [conPassFocus, setConPassFocus] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');


  const handleResetPassword = () => {
    if (!newPassword) {
      toastAlert.showToastError("Please enter New Password");
      return;
    };
    if (!confirmPass) {
      toastAlert.showToastError("Please enter Confirm Password");
      return;
    };
    if (!validatePassword(newPassword)) {
      toastAlert.showToastError("Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters.");
      return;
    };
    if (confirmPass !== newPassword) {
      toastAlert.showToastError("New Password and Confirm Password does not Match!");
      return;
    };
    setIsForgot(false);
    let data = {
      otp: parseInt(otp),
      newPassword: newPassword,
      confirmPassword: confirmPass,
      signId: signId,
    };
    dispatch(forgotPassword(data, onCloseResetPass))
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
        style={{ marginVertical: 15 }}
        weight={INTER_SEMI_BOLD}
      >
        New Password
      </AppText>
      <InputBox
        placeholder={"Enter Password"}
        top
        placeholderTextColor={"#00000066"}
        textInputStyle={{
          borderWidth: 1,
          borderColor: newPassFocus ? "#1251AE" : "#E4E4E4",
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          height: 55,
        }}
        value={newPassword}
        onChange={(value) => setNewPassword(value)}
        onBlur={() => setNewPassFocus(false)}
        onFocus={() => setNewPassFocus(true)}
        isPassword={true}
        secureTextEntry={showPass}
        onToggle={() => setShowPass(!showPass)}
      />
      <View style={styles.referView}>
     
        <AppText type={FORTEEN} color={BLUE} weight={INTER_MEDIUM}>
        Password must contain at least
        </AppText>
       
        <TouchableOpacityView
          style={styles.checkbox}
        >
          <Checkbox
            value={true}
            style={{ borderColor: colors.black, borderRadius: 20 }}
            innerStyle={{ backgroundColor: colors.darkBlue, borderRadius: 20 }}
            login
          />
          <AppText type={FORTEEN} color={BLACK} weight={INTER_MEDIUM} style={{marginLeft: 10}}>
          8-20 Characters Long
          </AppText>
        </TouchableOpacityView>
       
      </View>
      <InputBox
        placeholder={"Confirm Password"}
        top
        placeholderTextColor={"#00000066"}
        textInputStyle={{
          borderWidth: 1,
          borderColor: conPassFocus ? "#1251AE" : "#E4E4E4",
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          marginTop: 15,
          height: 55,
        }}
        value={confirmPass}
        onChange={(value) => setConfirmPass(value)}
        onBlur={() => setConPassFocus(false)}
        onFocus={() => setConPassFocus(true)}
        isPassword={true}
        secureTextEntry={showConfPass}
        onToggle={() => setShowConfPass(!showConfPass)}
      />
      
      <PrimaryButton
        title={"Submit"}
        weight={INTER_MEDIUM}
        disabled={!newPassword || !confirmPass}
        onPress={handleResetPassword}
        buttonStyle={{ marginTop: 50 }}
      />
     
    </View>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  referView: {
    // flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  checkbox: {
    flexDirection: "row",
    marginTop: 10,
  },
});
