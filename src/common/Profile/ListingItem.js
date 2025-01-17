import { StyleSheet, View } from "react-native";
import React from "react";
import {
  AppText,
  BLACK,
  EIGHTEEN,
  ELEVEN,
  FORTEEN,
  FOURTEEN,
  INTER_MEDIUM,
  INTER_REGULAR,
  INTER_SEMI_BOLD,
} from "../AppText";
import { Button } from "../Button";
import { useSelector, useDispatch } from "react-redux";
import NavigationService from "../../navigation/NavigationService";
// import { KYC_SCREEN, WITHDRAW_SCREEN } from '../../navigation/routes';
import { getKycDetails, getUserProfile } from "../../actions/profileAction";
import FastImage from "react-native-fast-image";
import {
  unPlayableBalanceIcon,
  walletBalanceIcon,
  winningIcon,
} from "../../helper/image";
import SecondaryButton from "../SecondaryButton";
import { colors } from "../../theme/color";
import { ADD_CASH_SCREEN, WITHDRAW_SCREEN } from "../../navigation/routes";
const ListingItem = ({ title, info, button, border, onOpenKycOption }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => {
    return state.profile.userData;
  });

  // console.log(kycDetails, "kycDetails");
  return (
    <View
      style={[
        {
          width: "100%",
          flexDirection: "row",
          // justifyContent: "center",
          borderBottomWidth: !border ? 1 : 0,
          borderBottomColor: "#E7D5AE80",
          paddingHorizontal: 10,
          paddingVertical: 10,
          alignItems: "center",
          // backgroundColor: 'red',
        },
      ]}
    >
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: colors.goldenColor,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          marginRight: 10,
        }}
      >
        <FastImage
          source={
            title === "Wallet Balance"
              ? walletBalanceIcon
              : title === "Unplayed Balance"
              ? unPlayableBalanceIcon
              : winningIcon
          }
          style={{ width: 26, height: 26 }}
          resizeMode="contain"
          tintColor={'#846500'}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ marginRight: 60 }}>
          <AppText type={FORTEEN} weight={INTER_MEDIUM} color={BLACK}>
            {title}
          </AppText>
          <AppText type={EIGHTEEN} weight={INTER_SEMI_BOLD} color={BLACK}>
            ₹{info}
          </AppText>
        </View>
        {button && title === "Wallet Balance" ? (
          <SecondaryButton
            onPress={() => NavigationService.navigate(ADD_CASH_SCREEN)}
            buttonStyle={{
              backgroundColor: "#01B9F5",
              width: 89,
              height: 40,
              // marginLeft: 10,
            }}
            titleStyle={{ color: colors.white, fontSize: 12 }}
            title={"Add Cash"}
          />
        ) : button &&
          title === "Winnings" &&
          userData?.kycStatus === "Approved" ? (
          <SecondaryButton
            onPress={() => NavigationService.navigate(WITHDRAW_SCREEN)}
            buttonStyle={{
              backgroundColor: "#309B36",
              width: 89,
              height: 40,
              marginLeft: 35,
            }}
            titleStyle={{ color: colors.white, fontSize: 12 }}
            title={"Withdraw"}
          />
        ) : button &&
          title === "Winnings" &&
          userData?.kycStatus !== "Approved" ? (
          <SecondaryButton
            onPress={onOpenKycOption}
            buttonStyle={{
              backgroundColor: "transparent",
              width: 89,
              height: 35,
              marginLeft: 35,
              borderWidth: 1,
              borderColor: "#CC3536",
              marginTop: 5,
            }}
            titleStyle={{ color: "#CC3536", fontSize: 12 }}
            title={"Verify Now"}
          />
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

export default ListingItem;
