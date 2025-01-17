import { useState } from "react";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import {
  AppText,
  BLACK,
  BLUE,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  RED,
  SIXTEEN,
  TEN,
  TWELVE,
  TWENTY,
} from "./AppText";
import InputBox from "./InputBox";
import {
  toastAlert,
  validateAadharNumber,
  validatePanNumber,
  validateUpiId,
} from "../helper/utility";
import { userSignup } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../theme/color";
import FastImage from "react-native-fast-image";
import { backIcon } from "../helper/image";
import { universalPaddingHorizontal } from "../theme/dimens";
import { getAadharOtp, submitUPI, verifyPanNumber } from "../actions/profileAction";
import { SpinnerSecond } from "./SnipperSecond";

const AddUPI = ({ onClose, userName, mobileNumber }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return state.auth.isLoading;
  });
  const [signId, setSignId] = useState("");
  const [error, setError] = useState('');
  const [signFocus, setSignFocus] = useState(false);

  const handleVerifyUpi = () => {
    if (!signId) {
      setError("Please enter UPI ID");
      return;
    }
    if (!validateUpiId(signId)) {
      setError("Invalid UPI");
      return;
    }
    let data = {
      upiId: signId,
      name: userName,
      // mobileNumber: mobileNumber
    };

    dispatch(submitUPI(data, onClose, setError));
  };

  return (
    <View styles={styles.mainView}>
      <View style={styles.sheetHeader}>
        {/* <FastImage
          source={backIcon}
          resizeMode="contain"
          style={{ width: 15, height: 15, marginLeft: 10 }}
        /> */}
        <AppText type={SIXTEEN} weight={INTER_MEDIUM}>
          Add UPI
        </AppText>
      </View>
      <View
        style={{ paddingHorizontal: universalPaddingHorizontal, marginTop: 30 }}
      >
        <InputBox
          placeholder={"Enter UPI ID"}
          top
          placeholderTextColor={"#00000066"}
          textInputStyle={{
            borderWidth: 1,
            // borderColor: signFocus ? "#1251AE" : "#E4E4E4",
            borderColor: error
            ? colors.lightRed
            : signFocus
            ? "#1251AE"
            : "#E4E4E4",
            borderRadius: 12,
            backgroundColor: "#F5F5F5",
            height: 55,
            // textTransform: "uppercase"
          }}
          maxLength={40}
          // keyboardType="numeric"
          onFocus={() => setSignFocus(true)}
          onBlur={() => setSignFocus(false)}
          onChange={(text) => {
            setSignId(text);
          }}
          // autoCapitalize={"characters"}
          value={signId}
          cursorColor={colors.black}
          // label={'Pan Number'}
          // labelStyle={{color: "#00000066"}}
        />
        {error && (
        <AppText
          type={TWELVE}
          color={RED}
          style={{
            // marginVertical: 5,
            marginTop: 10,
            paddingHorizontal: 10,
            // textAlign: "center",
          }}
          weight={INTER_SEMI_BOLD}
        >
          {error}
        </AppText>
      )}
        <View style={{ marginTop: 20 }}>
          <AppText color={BLACK} weight={INTER_SEMI_BOLD} type={TWELVE}>
            Note:{" "}
          </AppText>
          <AppText color={BLACK} weight={INTER_MEDIUM} type={TWELVE}>
            1. PAN Name{" "}
            <AppText style={{ color: "#309B36" }}>“{userName}”</AppText>
          </AppText>
          <AppText color={BLACK} weight={INTER_MEDIUM} type={TWELVE}>
            2. You can link UPI ID with your PAN name{" "}
          </AppText>
        </View>

        <PrimaryButton
          title={"Verify"}
          weight={INTER_MEDIUM}
          disabled={!signId}
          buttonStyle={{ marginTop: 20 }}
          onPress={handleVerifyUpi}
        />
      </View>
      <SpinnerSecond loading={loading} />
    </View>
  );
};

export default AddUPI;

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
