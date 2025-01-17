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
  validateIfsc,
  validatePanNumber,
  validateUpiId,
} from "../helper/utility";
import { userSignup } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../theme/color";
import FastImage from "react-native-fast-image";
import { backIcon } from "../helper/image";
import { universalPaddingHorizontal } from "../theme/dimens";
import { getAadharOtp, submitBank, verifyPanNumber } from "../actions/profileAction";
import { SpinnerSecond } from "./SnipperSecond";

const BankAccount = ({ onCloseBank }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return state.auth.isLoading;
  });
  const [accountNumber, setAccountNumber] = useState("");
  const [accountNumberFocus, setAccountNumberFocus] = useState(false);
  const [reAccountNumber, setReAccountNumber] = useState("");
  const [reAccountNumberFocus, setReAccountNumberFocus] = useState(false);
  const [numberError, setNumberError] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNameFocus, setAccountNameFocus] = useState(false);
  const [ifsc, setIfsc] = useState('');
  const [ifscFocus, setIfscFocus] = useState(false);
  const [errorIfsc, setErrorIfsc] = useState('');
  

  const handleVerifyBank = () => {
    if (!accountNumber) {
      toastAlert.showToastError("Please enter Account Number");
      return;
    };
    if (!reAccountNumber) {
      toastAlert.showToastError("Please enter Re Account Number");
      return;
    };
    if (accountNumber !== reAccountNumber ) {
      setNumberError("Account number does not match.");
      return;
    };
    if (!accountName) {
      toastAlert.showToastError("Please enter Beneficiary Name");
      return;
    };
    if (!ifsc) {
      toastAlert.showToastError("Please enter IFSC");
      return;
    };
    if (!validateIfsc(ifsc)) {
      setErrorIfsc("Please enter valid IFSC Code");
      return;
    };

    let data = {
      accountNumber: accountNumber,
      ifscCode: ifsc
    };
    
   
    dispatch(submitBank(data, onCloseBank));
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
        Add Bank Account
        </AppText>
      </View>
      <View
        style={{ paddingHorizontal: universalPaddingHorizontal, marginTop: 30 }}
      >
        <InputBox
          placeholder={"Enter Account Number"}
          top
          placeholderTextColor={"#00000066"}
          textInputStyle={{
            borderWidth: 1,
            borderColor: accountNumberFocus ? "#1251AE" : "#E4E4E4",
            borderRadius: 12,
            backgroundColor: "#F5F5F5",
            height: 55,
          }}
          maxLength={16}
          keyboardType="numeric"
          onFocus={() => setAccountNumberFocus(true)}
          onBlur={() => setAccountNumberFocus(false)}
          onChange={(text) => {
            setAccountNumber(text);
          }}
          // isPassword
          secureTextEntry
          value={accountNumber}
          cursorColor={colors.black}
        />
        <InputBox
          placeholder={"Re-Enter Account Number"}
          top
          style={{marginTop: 10}}
          placeholderTextColor={"#00000066"}
          textInputStyle={{
            borderWidth: 1,
            borderColor:  numberError ? colors.lightRed : reAccountNumberFocus ? "#1251AE" : "#E4E4E4",
            borderRadius: 12,
            backgroundColor: "#F5F5F5",
            height: 55,
          }}
          maxLength={16}
          keyboardType="numeric"
          onFocus={() => setReAccountNumberFocus(true)}
          onBlur={() => setReAccountNumberFocus(false)}
          onChange={(text) => {
            setReAccountNumber(text);
          }}
          // autoCapitalize={"characters"}
          value={reAccountNumber}
          cursorColor={colors.black}
        />
        {numberError && (
        <AppText
          type={TWELVE}
          color={RED}
          style={{
            marginVertical: 5,
            // paddingHorizontal: universalPaddingHorizontal,
            // textAlign: "center",
          }}
          weight={INTER_SEMI_BOLD}
        >
          {numberError}
        </AppText>
      )}
        <InputBox
          placeholder={"Account holder Name"}
          top
          style={{marginTop: 10}}
          placeholderTextColor={"#00000066"}
          textInputStyle={{
            borderWidth: 1,
            borderColor: accountNameFocus ? "#1251AE" : "#E4E4E4",
            borderRadius: 12,
            backgroundColor: "#F5F5F5",
            height: 55,
          }}
          // maxLength={16}
          // keyboardType="numeric"
          onFocus={() => setAccountNameFocus(true)}
          onBlur={() => setAccountNameFocus(false)}
          onChange={(text) => {
            setAccountName(text);
          }}
          // autoCapitalize={"characters"}
          value={accountName}
          cursorColor={colors.black}
        />
        <InputBox
          placeholder={"IFSC Code"}
          top
          style={{marginTop: 10}}
          placeholderTextColor={"#00000066"}
          textInputStyle={{
            borderWidth: 1,
            borderColor:  errorIfsc ? colors.lightRed : ifscFocus ? "#1251AE" : "#E4E4E4",
            borderRadius: 12,
            backgroundColor: "#F5F5F5",
            height: 55,
          }}
          maxLength={11}
          // keyboardType="numeric"
          onFocus={() => setIfscFocus(true)}
          onBlur={() => setIfscFocus(false)}
          onChange={(text) => {
            setIfsc(text);
          }}
          autoCapitalize={"characters"}
          value={ifsc}
          cursorColor={colors.black}
        />
         {errorIfsc && (
        <AppText
          type={TWELVE}
          color={RED}
          style={{
            marginVertical: 5,
            // paddingHorizontal: universalPaddingHorizontal,
            // textAlign: "center",
          }}
          weight={INTER_SEMI_BOLD}
        >
          {errorIfsc}
        </AppText>
      )}
        <View style={{ marginTop: 20 }}>
          <AppText color={BLACK} weight={INTER_SEMI_BOLD} type={TWELVE}>
            Note:{" "}
            <AppText color={BLACK} weight={INTER_MEDIUM} type={TWELVE}>
          Account Holder Name and PAN Name must be same.{" "}
          </AppText>
          </AppText>
          
        </View>

        <PrimaryButton
          title={"Add Bank Account"}
          weight={INTER_MEDIUM}
          disabled={(!accountNumber || !reAccountNumber || !accountName || !ifsc)}
          buttonStyle={{ marginTop: 20 }}
          onPress={handleVerifyBank}
        />
      </View>
      <SpinnerSecond loading={loading} />
    </View>
  );
};

export default BankAccount;

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
