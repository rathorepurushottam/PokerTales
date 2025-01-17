import { useState } from "react";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import {
  AppText,
  BLUE,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  RED,
  SIXTEEN,
  TWELVE,
  TWENTY,
} from "./AppText";
import InputBox from "./InputBox";
import { toastAlert, validateAadharNumber, validatePanNumber } from "../helper/utility";
import { userSignup } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../theme/color";
import FastImage from "react-native-fast-image";
import { backIcon } from "../helper/image";
import { universalPaddingHorizontal } from "../theme/dimens";
import { getAadharOtp, verifyPanNumber } from "../actions/profileAction";
import { SpinnerSecond } from "./SnipperSecond";

const PanNumber = ({onClosePan}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return state.auth.isLoading;
  });
  const [signId, setSignId] = useState("");
  const [signFocus, setSignFocus] = useState(false);
  const [error, setError] = useState('');
  

  const handleVerifyPanNumber = () => {
    if (!signId) {
      toastAlert.showToastError("Please enter Pan Number");
      return;
    }
      if(!validatePanNumber(signId)) {
        toastAlert.showToastError('Please Enter Correct Pan Number');
        setSignFocus(false);
        setError('Please Enter Correct Pan Number');
          return;
      };
    let data = {
        panNumber: signId,
    };

    dispatch(verifyPanNumber(data, onClosePan, setSignFocus, setError));

  };

  return (
    <View styles={styles.mainView}>
      <View style={styles.sheetHeader}>
        {/* <FastImage
          source={backIcon}
          resizeMode="contain"
          style={{ width: 15, height: 15, marginLeft: 10 }}
        /> */}
        <AppText
          type={SIXTEEN}
          weight={INTER_MEDIUM}
        >
         Enter Details
        </AppText>
      </View>
      <View style={{paddingHorizontal: universalPaddingHorizontal, marginTop: 30}}>
      
      <InputBox
        // placeholder={"Email or Phone"}
        top
        placeholderTextColor={"#00000066"}
        textInputStyle={{
          borderWidth: 1,
          borderColor: signFocus ? "#1251AE" : !error ? "#E4E4E4" : colors.lightRed,
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          height: 55,
          // textTransform: "uppercase"
        }}
        maxLength={10}
        // keyboardType="numeric"
        onFocus={() => setSignFocus(true)}
        onBlur={() => setSignFocus(false)}
        onChange={(text) => {
          setSignId(text);
        }}
        autoCapitalize={'characters'}
        value={signId}
        label={'Pan Number'}
        labelStyle={{color: "#00000066"}}
        cursorColor={colors.black}
      />
      {error && (
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

      <PrimaryButton
        title={"Submit"}
        weight={INTER_MEDIUM}
        disabled={signId?.length !== 10}
        buttonStyle={{ marginTop: 20 }}
        onPress={handleVerifyPanNumber}
      />
      </View>
      <SpinnerSecond loading={loading}/>
    </View>
  );
};

export default PanNumber;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  sheetHeader: {
    backgroundColor: colors.menuText,
    height: 70,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
  },
});
