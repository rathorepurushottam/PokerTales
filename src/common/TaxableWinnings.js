import { useState } from "react";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import {
  AppText,
  BLUE,
  BOLD,
  EIGHTEEN,
  FORTEEN,
  INTER_BOLD,
  INTER_LIGHT,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  MENUTEXT,
  RED,
  SEMI_BOLD,
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
} from "../helper/utility";
import { userSignup } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../theme/color";
import FastImage from "react-native-fast-image";
import { backIcon } from "../helper/image";
import { universalPaddingHorizontal } from "../theme/dimens";
import { getAadharOtp, verifyPanNumber } from "../actions/profileAction";
import { SpinnerSecond } from "./SnipperSecond";

const TaxableWinnings = ({ onClosePan }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return state.auth.isLoading;
  });
  const [signId, setSignId] = useState("");
  const [signFocus, setSignFocus] = useState(false);
  const [error, setError] = useState("");

  const handleVerifyPanNumber = () => {
    if (!signId) {
      toastAlert.showToastError("Please enter Pan Number");
      return;
    }
    if (!validatePanNumber(signId)) {
      toastAlert.showToastError("Please Enter Correct Pan Number");
      setSignFocus(false);
      setError("Please Enter Correct Pan Number");
      return;
    }
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
        <AppText type={SIXTEEN} weight={INTER_MEDIUM}>
          Taxable Net Winnings
        </AppText>
      </View>
      <View>
      <View
        style={{
            marginVertical: 15,
          marginHorizontal: 10,
          borderWidth: 1,
          borderColor: "#D4D4D4",
          borderRadius: 19,
          padding: 10
        }}
      >
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          <View>
            <AppText color={MENUTEXT} type={FORTEEN} weight={INTER_BOLD}>
              Taxable Net Winnings
            </AppText>
            <AppText style={{ color: "#032146B2" }} type={TEN}>
              Total Withdrawals -Total Deposit* - TDS Paid Net Winning
            </AppText>
          </View>
          <AppText color={MENUTEXT} type={EIGHTEEN} weight={INTER_BOLD}>₹ 200</AppText>
        </View>
        <View style={{borderWidth: StyleSheet.hairlineWidth, borderColor: '#D4D4D4', marginVertical: 15}}></View>
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          <View>
            <AppText color={MENUTEXT} type={FORTEEN} weight={INTER_BOLD}>
            TDS Paid Net Winnings
            </AppText>
            <AppText style={{ color: "#032146B2" }} type={TEN}>
            Winning on witch TDS was paid 
            </AppText>
          </View>
          <AppText color={MENUTEXT} type={EIGHTEEN} weight={INTER_BOLD}>₹ 60</AppText>
        </View>
        <View style={{borderWidth: StyleSheet.hairlineWidth, borderColor: '#D4D4D4', marginVertical: 15}}></View>
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          <View>
            <AppText color={MENUTEXT} type={FORTEEN} weight={INTER_BOLD}>
            Total TDS paid
            </AppText>
            <AppText style={{ color: "#032146B2" }} type={TEN}>
            30% of TDS Paid on Winnings
            </AppText>
          </View>
          <AppText color={MENUTEXT} type={EIGHTEEN} weight={INTER_BOLD}>₹ 140</AppText>
        </View>
      </View>
      <View style={{marginHorizontal: 18}}>
        <AppText color={MENUTEXT} type={INTER_LIGHT}>Calculated from <AppText color={MENUTEXT} weight={INTER_BOLD}>1 April 2024</AppText> to <AppText color={MENUTEXT} weight={INTER_BOLD}>31 March 2025</AppText>.</AppText>
        <AppText color={MENUTEXT} type={INTER_LIGHT}><AppText color={MENUTEXT} weight={INTER_BOLD}>Total Deposit</AppText> = Deposit in FY 2024 + Opening Balance</AppText>
      </View>
      </View>
      <SpinnerSecond loading={loading} />
    </View>
  );
};

export default TaxableWinnings;

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
