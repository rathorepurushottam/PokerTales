import React from "react";
import { TouchableOpacity, View } from "react-native";
import {
  AppText,
  BLACK,
  EIGHTEEN,
  FORTEEN,
  GOLDEN,
  INTER_MEDIUM,
  SIXTEEN,
  TWENTY_FOUR,
  TWENTY_TWO,
  WHITE,
} from "../AppText";

import { backIcon, cashierIcon } from "../../helper/image";
import styles from "./styles";
import NavigationService from "../../navigation/NavigationService";
import { TouchableOpacityView } from "../TouchableOpacityView";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import { formatNumber } from "../../helper/utility";

const Header = (props) => {
  const { commonHeader, title, color, addCash, style } = props;

  const userWallet = useSelector((state) => {
    return state.profile.userWallet;
  });

  const { bonus, depositBalance, winningAmount } = userWallet ?? "";

  let totalBalance =  depositBalance + bonus + winningAmount;

  console.log(userWallet, "userWallet");

  return (
    <>

        <LinearGradient
          colors={["#000000BD", "#0000005C", "#00000000", "#032146"]}
          style={[styles.header, style]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0 }}
        >
          <TouchableOpacity
            style={styles.arrowview}
            onPress={() => {
              NavigationService.goBack();
            }}
          >
            <FastImage
              style={styles.arrowIcon}
              resizeMode="contain"
              source={backIcon}
              // tintColor={tintColor ? tintColor : colors.white}
            />
          </TouchableOpacity>
          {title !== "Wallet" ? (
            <View style={{width: title?.length > 12 ? '50%' : '36.33%', alignItems: "flex-start"}}>
               <AppText
              color={color ? color : WHITE}
              type={EIGHTEEN}
              weight={INTER_MEDIUM}
              style={styles.title}
            >
              {title}
            </AppText>
            </View>
           
          ) : (
            <View style={{flexDirection: "row", alignItems: "center", width: "33.33%"}}>
              <FastImage
                style={styles.walletIcon}
                resizeMode="contain"
                source={cashierIcon}
              />
              <AppText
                color={color ? color : WHITE}
                type={EIGHTEEN}
                weight={INTER_MEDIUM}
                style={{ marginTop:2, marginLeft: 10}}
              >
                {title}
              </AppText>
            </View>
          )}
          <View style={{width: "33.33%", alignItems: "flex-end"}}>
          {addCash && (
            <AppText
              color={GOLDEN}
              type={EIGHTEEN}
              weight={INTER_MEDIUM}
              style={styles.balance}
            >
              ₹{formatNumber(totalBalance?.toFixed(2))}
            </AppText>
          )}
          </View>
          
          

         
        </LinearGradient>
    </>
  );
};

export default Header;
