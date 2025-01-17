import {
  Linking,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AppText,
  BLACK,
  BLUE,
  DISABLETEXT,
  FORTEEN,
  INTER_BOLD,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  MENUTEXT,
  SIXTEEN,
  TWELVE,
  TWENTY_TWO,
  WITHDRAWBLUE,
} from "./AppText";
import { colors } from "../theme/color";
import FastImage from "react-native-fast-image";
import {
  userReferIcon,
  referImage,
  friendReferIcon,
  copyIcon,
  shareIcon,
  backIcon,
} from "../helper/image";
import LinearGradient from "react-native-linear-gradient";
import PrimaryButton from "./PrimaryButton";
import Clipboard from "@react-native-clipboard/clipboard";
import { useState } from "react";
import { shareMessage, shareToAny } from "../helper/utility";
import InvitaionModal from "./InvitaionModal";
import { useSelector } from "react-redux";

const InviteAndEarn = ({ code, onCloseInvite }) => {
  const [copyText, setCopyText] = useState("copy");
  const [isOpen, setIsOpen] = useState(false);

  const handleCodeCopy = () => {
    Clipboard.setString(code);
    setCopyText("copied");
  };

  const userData = useSelector((state) => {
    return state.profile.userData;
  });

  return (
    <View>
      <View style={styles.sheetHeader}>
        <TouchableOpacity onPress={onCloseInvite} style={{ width: "33.33%" }}>
          <FastImage
            source={backIcon}
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
            tintColor={colors.white}
          />
        </TouchableOpacity>
        <View style={{ width: "33.33%", alignItems: "center" }}>
          <AppText
            type={SIXTEEN}
            weight={INTER_MEDIUM}
            // style={{ marginRight: 130 }}
          >
            Refer & Earn
          </AppText>
        </View>
      </View>
      <View style={styles.bannerView}>
        <AppText style={{ color: "#FFFFFF1A" }}>BANNER HERE</AppText>
      </View>
      <View>
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <AppText color={MENUTEXT} type={TWENTY_TWO} weight={INTER_SEMI_BOLD}>
            Refer your friends.
          </AppText>
          <AppText
            type={FORTEEN}
            weight={INTER_MEDIUM}
            style={{ color: "#4A607B" }}
          >
            Tap on below button to share referral link
          </AppText>
        </View>
        <FastImage
          source={referImage}
          resizeMode="center"
          style={{
            width: 200,
            height: 100,
            marginBottom: 20,
            alignSelf: "center",
          }}
        />
        <AppText
          color={MENUTEXT}
          type={SIXTEEN}
          weight={INTER_SEMI_BOLD}
          style={{ alignSelf: "center" }}
        >
          Your friend signup on Poker Tales.
        </AppText>
        <LinearGradient
          style={styles.referView}
          colors={["#FFFEED", "#FEF7E5"]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View>
              <FastImage
                source={userReferIcon}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </View>
            <View style={{ marginLeft: 20 }}>
              <AppText color={MENUTEXT}>You Get</AppText>
              <AppText color={MENUTEXT} type={SIXTEEN} weight={INTER_SEMI_BOLD}>
                ₹100
              </AppText>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: "#CECECE",
              marginLeft: 46,
            }}
          ></View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: 20 }}>
              <AppText color={MENUTEXT}>Your friend gets</AppText>
              <AppText
                color={MENUTEXT}
                type={SIXTEEN}
                weight={INTER_SEMI_BOLD}
                style={{ alignSelf: "flex-end" }}
              >
                ₹25
              </AppText>
            </View>
            <FastImage
              source={friendReferIcon}
              resizeMode="contain"
              style={{ width: 30, height: 30 }}
            />
          </View>
        </LinearGradient>
        <AppText
          type={FORTEEN}
          weight={INTER_SEMI_BOLD}
          color={WITHDRAWBLUE}
          style={{ alignSelf: "center", marginVertical: 10 }}
          onPress={() => setIsOpen(true)}
        >
          Read more..
        </AppText>

        {userData?.kycStatus === "Approved" && (
          <>
            <PrimaryButton
              title={"Share on Whatsapp"}
              buttonStyle={{ marginHorizontal: 20 }}
              onPress={() => {
                Linking.openURL(`whatsapp://send?text=${shareMessage(code)}`);
              }}
            />
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.darkBlue,
                marginVertical: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
                paddingHorizontal: 15,
                marginHorizontal: 20,
                borderRadius: 13,
              }}
            >
              <View>
                <AppText style={{ color: "#03214699" }} type={TWELVE}>
                  Your referral code
                </AppText>
                <AppText type={TWELVE} color={MENUTEXT} weight={INTER_BOLD}>
                  {code}
                </AppText>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ alignItems: "center", marginRight: 20 }}
                  onPress={handleCodeCopy}
                >
                  <FastImage
                    source={copyIcon}
                    style={{ width: 15, height: 15 }}
                    resizeMode="contain"
                  />
                  <AppText
                    weight={INTER_SEMI_BOLD}
                    style={{ color: "#01B9F5" }}
                  >
                    {copyText}
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={() => shareToAny(shareMessage(code))}
                >
                  <FastImage
                    source={shareIcon}
                    style={{ width: 15, height: 14 }}
                    resizeMode="contain"
                  />
                  <AppText
                    weight={INTER_SEMI_BOLD}
                    style={{ color: "#01B9F5" }}
                  >
                    share
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
      <InvitaionModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </View>
  );
};

export default InviteAndEarn;

const styles = StyleSheet.create({
  sheetHeader: {
    backgroundColor: colors.menuText,
    height: 70,
    flexDirection: "row",
    // justifyContent: "center",
    // justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  bannerView: {
    backgroundColor: colors.bannerBackColor,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  referView: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ECC883",
    marginHorizontal: 20,
    justifyContent: "space-around",
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
  },
});
