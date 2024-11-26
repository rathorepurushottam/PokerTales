import { useState } from "react";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import {
  AppText,
  BLUE,
  FORTEEN,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  TWENTY,
} from "./AppText";
import InputBox from "./InputBox";
import { useDispatch } from "react-redux";
import { valideReferCode } from "../actions/authActions";
import FastImage from "react-native-fast-image";
import { logo } from "../helper/image";
import SecondaryButton from "./SecondaryButton";
import { userLogOut } from "../actions/profileAction";

const Logout = ({ onCloseLogout }) => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(userLogOut());
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
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <FastImage
          source={logo}
          resizeMode="contain"
          style={{ width: 50, height: 50 }}
        />
        <AppText
          type={FORTEEN}
          color={BLUE}
          style={{ marginVertical: 15 }}
          weight={INTER_SEMI_BOLD}
        >
          Are you sure you want to logout?
        </AppText>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <SecondaryButton
          title={"No"}
          weight={INTER_MEDIUM}
          buttonStyle={{ marginTop: 20, width: 140 }}
          onPress={onCloseLogout}
        />
        <PrimaryButton
          title={"Yes"}
          weight={INTER_MEDIUM}
          buttonStyle={{ marginTop: 20, width: 140 }}
          onPress={handleLogOut}
        />
      </View>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
