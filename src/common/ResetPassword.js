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


const ResetPassword = ({ setIsRememberSelected, isRememberSelected, onOpenForgot }) => {
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
        New Password
      </AppText>
      <InputBox
        placeholder={"Enter Password"}
        top
        placeholderTextColor={"#00000066"}
        textInputStyle={{
          borderWidth: 1,
          borderColor: "#E4E4E4",
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          height: 55,
        }}
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
            style={{ borderColor: colors.black, marginRight: 10, borderRadius: 20 }}
            innerStyle={{ backgroundColor: colors.darkBlue, borderRadius: 20 }}
            login
          />
          <AppText type={FORTEEN} color={BLACK} weight={INTER_MEDIUM}>
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
          borderColor: "#E4E4E4",
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          marginTop: 15,
          height: 55,
        }}
        isPassword={true}
        secureTextEntry={showPass}
        onToggle={() => setShowPass(!showPass)}
      />
      
      <PrimaryButton
        title={"Submit"}
        weight={INTER_MEDIUM}
        disabled
        buttonStyle={{ marginTop: 60 }}
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
    marginTop: 40,
  },
  checkbox: {
    flexDirection: "row",
    marginTop: 10,
  },
});
