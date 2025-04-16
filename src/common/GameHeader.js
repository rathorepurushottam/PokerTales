import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from "react-native";
// import { TouchableOpacityView } from './TouchableOpacityView';
import NavigationService from "../navigation/NavigationService";
// import {
//   MY_BALANCE,
// } from '../navigation/routes';
import {
  headerLogo,
  vector,
  userIcon,
  cashierIcon,
  plusIcon,
  backIcon,
} from "../helper/image";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import { formatNumber, IMAGE_BASE_URL } from "../helper/utility";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../theme/color";
import {
  AppText,
  BROWNYELLOW,
  EIGHTEEN,
  FORTEEN,
  INTER_MEDIUM,
  SIXTEEN,
  TWELVE,
  WHITE,
} from "./AppText";
import { BOTTOM_NAVIGATION_STACK, BOTTOM_TAB_WALLET_SCREEN, CASHIER_SCREEN } from "../navigation/routes";
// import { StatusBar } from 'native-base';
// import {
//   AppText,
//   INTER_SEMI_BOLD,
//   TWELVE,
//   WHITE,
// } from './AppText';

const GameHeader = ({
  handleAddCash = () => {},
  title,
  onNavigationToApp = () => {}
}) => {
  const [random, setRandom] = useState("");
  const userData = useSelector((state) => {
    return state.profile.userData;
  });
  const userWallet = useSelector((state) => {
    return state.profile.userWallet;
  });

  const { bonus, depositBalance, winningAmount } = userWallet ?? "";

  let totalBalance = bonus + depositBalance + winningAmount;
  return (
    <>
      <LinearGradient
        colors={["#070C19", "#032146"]}
        style={styles.topContainer}
      >
        <TouchableOpacity
          style={styles.arrowview}
          onPress={onNavigationToApp}
        >
          <FastImage
            style={styles.arrowIcon}
            resizeMode="contain"
            source={backIcon}
            tintColor={colors.white}
          />
        </TouchableOpacity>
        <View style={{ width: "33.33%", alignItems: "flex-start", marginTop: 10, }}>
          <AppText
            color={WHITE}
            type={EIGHTEEN}
            weight={INTER_MEDIUM}
            //   style={styles.title}
          >
            {title}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "33.33%",
            gap: 12,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              justifyContent: "space-between",
              gap: 5,
              width: "50%",
            }}
            onPress={() => NavigationService.navigate("CASHIER_SCREEN")}
          >
            <FastImage
              source={cashierIcon}
              resizeMode="contain"
              style={{ width: 12, height: 12 }}
            />
            <AppText color={BROWNYELLOW} type={TWELVE}>
              ₹{formatNumber(totalBalance?.toFixed(2))}
            </AppText>
          </TouchableOpacity>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#309B36",
              width: "50%",
              padding: 4,
              // height: 25,
              justifyContent: "center",
              borderRadius: 5,
              marginTop: 10,
            }}
            onPress={handleAddCash}
          >
            {/* <AppText style={{marginRight: 5, marginBottom: 3}} type={SIXTEEN}>+</AppText> */}
            <FastImage
              source={plusIcon}
              style={{ width: 10, height: 10, marginRight: 5 }}
              resizeMode="contain"
            />
            <AppText type={FORTEEN}>Cash</AppText>
          </Pressable>
        </View>
      </LinearGradient>
    </>
  );
};
export { GameHeader };

const styles = StyleSheet.create({
  topContainer: {
    height: 70,
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    justifyContent: "space-between",
  },
  personImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
    // marginLeft: 20,
    borderWidth: 1,
    borderColor: colors.brownYellow,
  },
  combineIcon: {
    height: 32,
    width: 91,
    // marginLeft: 60,
    // marginRight: 20,
    marginTop: 10,
  },
  notificationIcon: {
    height: 28,
    width: 28,
    right: 25,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    // marginTop: 20,
  },
  walletView: {
    borderRadius: 59,
    flexDirection: "row",
    marginTop: 2,
    height: 30,
    width: 80,
    borderWidth: 2,
    borderColor: "#C1AA9966",
    marginLeft: 30,
  },
  userfilter: {
    position: "absolute",
    alignSelf: "flex-end",
    top: 26,
    left: 25,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderBlueColor,
    width: 15,
    height: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  walletbox: {
    height: 28,
    width: 28,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#DBA73E",
    right: 10,
  },
  logoview: {
    //  justifyContent:"space-between"
  },
  belldot: {
    height: 4,
    width: 4,
    backgroundColor: "#EC536A",
    position: "absolute",
    borderRadius: 10,
  },
  notifiView: {
    height: 28,
    with: 28,
    marginTop: 3,
    marginRight: -5,
    backgroundColor: "black",
    borderWidth: 1,
  },
  arrowview: {
    width: "30.33%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 10,
  },
  arrowIcon: {
    height: 24,
    width: 24,
  },
});
