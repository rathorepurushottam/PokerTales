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


const LoginWithPassword = ({ setIsRememberSelected, isRememberSelected, onOpenForgot }) => {
  const [showPass, setShowPass] = useState(false);

  
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
          borderColor: "#E4E4E4",
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          height: 55,
        }}
      />
      <InputBox
        placeholder={"Password"}
        top
        placeholderTextColor={"#00000066"}
        textInputStyle={{
          borderWidth: 1,
          borderColor: "#E4E4E4",
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          marginTop: 25,
          height: 55,
        }}
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
          <AppText type={FORTEEN} color={BOTTOMTEXT} weight={INTER_MEDIUM}>
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
        disabled
        buttonStyle={{ marginTop: 40 }}
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
