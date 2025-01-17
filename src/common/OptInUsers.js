import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import {
  AppText,
  BLUE,
  FORTEEN,
  INTER_BOLD,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  MENUTEXT,
  RED,
  SIXTEEN,
  TWELVE,
  TWENTY,
} from "./AppText";
import { colors } from "../theme/color";
import FastImage from "react-native-fast-image";
import { rewardPageBanner1, userIcon, userDefaultIcon } from "../helper/image";

const OptInUsers = () => {
  return (
    <View styles={styles.mainView}>
      <View style={{ width: "100%" }}>
        <FastImage
          source={rewardPageBanner1}
          resizeMode="cover"
          style={{ width: 420, height: 180 }}
        />
        <View
          style={{
            borderColor: "#5E6272",
            backgroundColor: "#5E6272",
            borderWidth: 2,
            width: "20%",
            alignSelf: "center",
            borderRadius: 10,
            marginVertical: 10,
            position: "absolute",
            top: 10,
            zIndex: 999,
          }}
        />
      </View>
      <View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <AppText
          color={MENUTEXT}
          type={SIXTEEN}
          weight={INTER_BOLD}
          style={{ marginVertical: 15, marginHorizontal: 15 }}
        >
          Users
        </AppText>
        <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 20}}>
          <FastImage
            source={userDefaultIcon}
            resizeMode="center"
            style={{ width: 30, height: 30, marginRight: 20 }}
          />
          <AppText color={MENUTEXT} type={SIXTEEN} weight={INTER_BOLD}>
            User Name
          </AppText>
        </View>
        <View style={{borderBottomWidth: 0.2, borderColor: colors.disableText, marginVertical: 15}} />
        <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 20}}>
          <FastImage
            source={userDefaultIcon}
            resizeMode="center"
            style={{ width: 30, height: 30, marginRight: 20 }}
          />
          <AppText color={MENUTEXT} type={SIXTEEN} weight={INTER_BOLD}>
            User Name
          </AppText>
        </View>
        <View style={{borderBottomWidth: 0.2, borderColor: colors.disableText, marginVertical: 15}} />
        <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 20}}>
          <FastImage
            source={userDefaultIcon}
            resizeMode="center"
            style={{ width: 30, height: 30, marginRight: 20 }}
          />
          <AppText color={MENUTEXT} type={SIXTEEN} weight={INTER_BOLD}>
            User Name
          </AppText>
        </View>
        <View style={{borderBottomWidth: 0.2, borderColor: colors.disableText, marginVertical: 15}} />
        <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 20}}>
          <FastImage
            source={userDefaultIcon}
            resizeMode="center"
            style={{ width: 30, height: 30, marginRight: 20 }}
          />
          <AppText color={MENUTEXT} type={SIXTEEN} weight={INTER_BOLD}>
            User Name
          </AppText>
        </View>
        <View style={{borderBottomWidth: 0.2, borderColor: colors.disableText, marginVertical: 15}} />
        {/* <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 20}}>
          <FastImage
            source={userDefaultIcon}
            resizeMode="center"
            style={{ width: 30, height: 30, marginRight: 20 }}
          />
          <AppText color={MENUTEXT} type={SIXTEEN} weight={INTER_BOLD}>
            User Name
          </AppText>
        </View> */}
        {/* <View style={{borderBottomWidth: 0.2, borderColor: colors.disableText, marginVertical: 15}} />
        <View style={{flexDirection: "row", alignItems: "center", paddingHorizontal: 20}}>
          <FastImage
            source={userDefaultIcon}
            resizeMode="center"
            style={{ width: 30, height: 30, marginRight: 20 }}
          />
          <AppText color={MENUTEXT} type={SIXTEEN} weight={INTER_BOLD}>
            User Name
          </AppText>
        </View>
        <View style={{borderBottomWidth: 0.2, borderColor: colors.disableText, marginVertical: 15}} /> */}
      </ScrollView>
      </View>
    </View>
  );
};

export default OptInUsers;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
});
