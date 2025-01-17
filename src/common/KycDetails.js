import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import {
  AppText,
  BLUE,
  FORTEEN,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  SIXTEEN,
  TWENTY,
} from "./AppText";
import InputBox from "./InputBox";
import { toastAlert, validateAadharNumber } from "../helper/utility";
import { userSignup } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../theme/color";
import FastImage from "react-native-fast-image";
import { backIcon } from "../helper/image";
import { universalPaddingHorizontal } from "../theme/dimens";
import { getAadharOtp, submitAadharDetails } from "../actions/profileAction";
import { SpinnerSecond } from "./SnipperSecond";
import SecondaryButton from "./SecondaryButton";

const KycDetails = ({ onCloseAadharDetails, onChangeAddhar, aadharNumber }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return state.auth.isLoading;
  });
  const kycDetails = useSelector((state) => {
    return state.profile.kycDetails;
  });

  const aadharDetails = useSelector((state) => {
    return state.profile.aadharDetails;
  });

  const handleAadharDetails = () => {
    dispatch(submitAadharDetails(onCloseAadharDetails));
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
        //   style={{ marginRight: 110 }}
        >
          Confirm Details
        </AppText>
      </View>
      <View
        style={{ paddingHorizontal: universalPaddingHorizontal, marginTop: 30 }}
      >
        <InputBox
          top
          placeholderTextColor={"#00000066"}
          textInputStyle={{
            borderWidth: 1,
            borderColor: "#E4E4E4",
            borderRadius: 12,
            backgroundColor: "#F5F5F5",
            height: 50,
            color: colors.menuText,
            fontWeight: 600,
          }}
          editable={false}
          value={kycDetails?.aadharKyc?.aadharStatus !== "Not Submitted" || kycDetails === null ? kycDetails?.aadharKyc?.nameOnAadhar : aadharDetails?.name}
          label={"Name on Aadhar Card"}
          labelStyle={{ color: "#00000066" }}
        />
        <InputBox
          top
          placeholderTextColor={"#00000066"}
          textInputStyle={{
            borderWidth: 1,
            borderColor: "#E4E4E4",
            borderRadius: 12,
            backgroundColor: "#F5F5F5",
            height: 50,
            color: colors.menuText,
            fontWeight: 600,
          }}
          style={{ marginTop: 5 }}
          editable={false}
          value={kycDetails?.aadharKyc?.aadharStatus !== "Not Submitted" || kycDetails === null ? kycDetails?.aadharKyc?.dob : aadharDetails?.dob}
          label={"Date of Birth"}
          labelStyle={{ color: "#00000066" }}
        />
        <InputBox
          top
          placeholderTextColor={"#00000066"}
          textInputStyle={{
            borderWidth: 1,
            borderColor: "#E4E4E4",
            borderRadius: 12,
            backgroundColor: "#F5F5F5",
            height: 50,
            color: colors.menuText,
            fontWeight: 600,
          }}
          style={{ marginTop: 5 }}
          editable={false}
          value={kycDetails?.aadharKyc?.aadharStatus !== "Not Submitted" || kycDetails === null ? kycDetails?.aadharKyc?.aadharNumber : aadharNumber}
          label={"Aadhar Number"}
          labelStyle={{ color: "#00000066" }}
        />

        <View style={{ marginTop: 15 }}>
          <AppText
            style={{ color: "#00000066", marginBottom: 10 }}
            type={FORTEEN}
            weight={INTER_MEDIUM}
          >
            Aadhar Address
          </AppText>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#E4E4E4",
              borderRadius: 12,
              backgroundColor: "#F5F5F5",
              height: 80,
              justifyContent: "center",
              paddingHorizontal: 10,
              alignItems: "center",
            }}
          >
            <AppText style={{ color: colors.black }} weight={INTER_SEMI_BOLD}>
              {kycDetails?.aadharKyc?.aadharStatus !== "Not Submitted" || kycDetails === null ? kycDetails?.aadharKyc?.aadharAddress : aadharDetails?.address}
            </AppText>
          </View>
        </View>

        <PrimaryButton
          title={"Confirm"}
          weight={INTER_MEDIUM}
          buttonStyle={{ marginTop: 20 }}
          onPress={handleAadharDetails}
        />
        <SecondaryButton
        title={"Try again"}
        weight={INTER_MEDIUM}
        buttonStyle={{ marginTop: 20 }}
        onPress={onChangeAddhar}
      />
      </View>
      <SpinnerSecond loading={loading} />
    </View>
  );
};

export default KycDetails;

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
