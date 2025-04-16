import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  AppText,
  EIGHTEEN,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  MENUTEXT,
  SIXTEEN,
  THIRTEEN,
  TWELVE,
} from "./AppText";
import { colors } from "../theme/color";
import LinearGradient from "react-native-linear-gradient";
import InputBox from "./InputBox";
import PrimaryButton from "./PrimaryButton";
import RadioButton from "./RadioButton";
import { backIcon, soundIcon, notificationSoundIcon, vibrateIcon } from "../helper/image";
import FastImage from "react-native-fast-image";
import ToggleSwitch from "toggle-switch-react-native";
import { useState } from "react";

const FinancialYear = ({ onClose, financialYear, setFinancialYear }) => {
    
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.sheetHeader}>
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "70%"}}>
        <TouchableOpacity onPress={onClose}>
          <FastImage
            source={backIcon}
            resizeMode="contain"
            style={{ width: 15, height: 15, marginLeft: 10 }}
          />
        </TouchableOpacity>

        <AppText
          type={EIGHTEEN}
          weight={INTER_MEDIUM}
        //   style={{ marginLeft: 120 }}
        >
          Select Financial Year
        </AppText>
        </View>
        
      </View>
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
          onPress={() => setFinancialYear('Apr 2024 - March 2025')}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            
            <RadioButton selected={financialYear === "Apr 2024 - March 2025"}/>
            <AppText
              type={SIXTEEN}
              weight={INTER_SEMI_BOLD}
              color={MENUTEXT}
              style={{ marginLeft: 20 }}
            >
              Apr 2024 - March 2025
            </AppText>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            backgroundColor: colors.menuText,
            width: "100%",
            opacity: 0.1,
            marginVertical: 15,
          }}
        ></View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
          onPress={() => setFinancialYear('Apr 2023 - March 2024')}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            
            <RadioButton  selected={financialYear === "Apr 2023 - March 2024"} />
            <AppText
              type={SIXTEEN}
              weight={INTER_SEMI_BOLD}
              color={MENUTEXT}
              style={{ marginLeft: 20 }}
            >
              Apr 2023 - March 2024
            </AppText>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            backgroundColor: colors.menuText,
            width: "100%",
            opacity: 0.1,
            marginVertical: 15,
          }}
        ></View>
         <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
          onPress={() => setFinancialYear('Apr 2022 - March 2023')}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            
            <RadioButton selected={financialYear === "Apr 2022 - March 2023"}/>
            <AppText
              type={SIXTEEN}
              weight={INTER_SEMI_BOLD}
              color={MENUTEXT}
              style={{ marginLeft: 20 }}
            >
              Apr 2022 - March 2023
            </AppText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FinancialYear;

const styles = StyleSheet.create({
  sheetHeader: {
    backgroundColor: colors.menuText,
    height: 70,
    flexDirection: "row",
    width: "100%",
    // justifyContent: "center",
    paddingHorizontal: 20,
    // alignItems: "center",
  },
  iconView: {
    backgroundColor: "#F3DD97",
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
