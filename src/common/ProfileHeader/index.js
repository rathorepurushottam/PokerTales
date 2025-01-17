import React from "react";
import { Pressable,TouchableOpacity,View } from "react-native";

import { backIcon, editIcon, userAvatarHolder, verifiedIcon, unverifiedIcon } from "../../helper/image";
import styles from "./styles";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
import { AppText, GREEN, INTER_SEMI_BOLD, RED } from "../AppText";
import NavigationService from "../../navigation/NavigationService";
import { IMAGE_BASE_URL } from "../../helper/utility";

const ProfileHeader = (props) => {
  const { commonHeader, title, color, addCash, style, onOpenAvatar } = props;

  const userData = useSelector((state) => {
    return state.profile.userData;
  });

  const kycDetails = useSelector((state) => {
    return state.profile.kycDetails;
  });
  // const isVerified = kycDetails
// console.log(kycDetails, "kycDetails");

  return (
    <LinearGradient
      colors={["#000000BD", "#0000005C", "#00000000", "#032146"]}
      style={[styles.topContainer, style]}
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
      <Pressable
        style={{ height: 40, width: 40, marginLeft: 10 }}
        onPress={onOpenAvatar}
      >
        <FastImage
          resizeMode="contain"
          source={
            userData?.avatar
              ? { uri: `${IMAGE_BASE_URL}${userData?.avatar}` }
              : userAvatarHolder
          }
          style={styles.personImage}
        />
        <View style={styles.userfilter}>
          <FastImage
            source={editIcon}
            resizeMode="contain"
            style={{ height: 15, width: 15 }}
          />
        </View>
      </Pressable>
      <View style={{marginLeft: 20}}>
        <AppText weight={INTER_SEMI_BOLD}>{userData?.userName}</AppText>
        <View style={{flexDirection: "row",alignItems: "center"}}>
            <FastImage source={userData?.kycStatus !== "Approved" ? unverifiedIcon : verifiedIcon} style={{width: 12, height: 12, marginRight: 5}} resizeMode="cover" />
        <AppText weight={INTER_SEMI_BOLD} color={userData?.kycStatus !== "Approved" ? RED : GREEN} >{userData?.kycStatus !== "Approved" ? 'KYC Unverified' : 'KYC Verified'}</AppText>
        </View>
       
      </View>
    </LinearGradient>
  );
};

export default ProfileHeader;
