import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
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
} from "../helper/image";
import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../helper/utility";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../theme/color";
import { AppText, BROWNYELLOW, FORTEEN, SIXTEEN, TWELVE } from "./AppText";
// import { StatusBar } from 'native-base';
// import {
//   AppText,
//   INTER_SEMI_BOLD,
//   TWELVE,
//   WHITE,
// } from './AppText';

const HomeHeader = ({ personClick, walletIcon }) => {
  const [random, setRandom] = useState("");
  const userData = useSelector((state) => {
    return state.profile.userData;
  });
  // const { total_balance, cash_bonus, winning_amount } = userData ?? '';
  // let totalbalance = winning_amount + cash_bonus + total_balance
  // useEffect(() => {
  //   setRandom(Math.random())
  // }, [total_balance])
  return (
    <>
      <StatusBar
        backgroundColor={"transparent"}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />

      <LinearGradient
        colors={["#070C19", "#032146"]}
        style={styles.topContainer}
      >
        <TouchableOpacity
          style={{ height: 28, width: 28 }}
          onPress={personClick}
        >
          <FastImage
            resizeMode="contain"
            source={
              userData?.logo
                ? { uri: `${IMAGE_BASE_URL}${userData?.logo}` }
                : userIcon
            }
            style={styles.personImage}
          />
          <View style={styles.userfilter}>
            <FastImage
              source={vector}
              resizeMode="contain"
              style={{ height: 8, width: 8 }}
            />
          </View>
        </TouchableOpacity>
        <FastImage
          source={headerLogo}
          style={styles.combineIcon}
          resizeMode="contain"
        />
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <FastImage
            source={cashierIcon}
            resizeMode="contain"
            style={{ width: 12, height: 12, marginRight: 5 }}
          />
          <AppText color={BROWNYELLOW} type={TWELVE}>
            ₹ 150
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#309B36",
            width: 60,
            height: 25,
            justifyContent: "center",
            borderRadius: 5,
            marginTop: 10
          }}
        >
          {/* <AppText style={{marginRight: 5, marginBottom: 3}} type={SIXTEEN}>+</AppText> */}
          <FastImage
            source={plusIcon}
            style={{ width: 10, height: 10, marginRight: 5 }}
            resizeMode="contain"
          />
          <AppText type={FORTEEN}>Cash</AppText>
        </View>
      </LinearGradient>
    </>
  );
};
export { HomeHeader };

const styles = StyleSheet.create({
  topContainer: {
    height: 70,
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    justifyContent: "space-between",
  },
  personImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: colors.brownYellow,
  },
  combineIcon: {
    height: 32,
    width: 91,
    marginLeft: 80,
    marginRight: 20,
    marginTop: 10
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
    left: 45,
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
});
