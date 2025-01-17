import { Pressable, StyleSheet, View } from "react-native";
import {
  AppText,
  BLACK,
  FORTEEN,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  SIXTEEN,
  TWELVE,
} from "./AppText";
import { colors } from "../theme/color";
import FastImage from "react-native-fast-image";
import { backIcon, aadharIcon, panIcon } from "../helper/image";
import LinearGradient from "react-native-linear-gradient";

const KycOption = ({ onCloseKycOptions, aadharStatus, panStatus }) => {
  return (
    <View>
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
          KYC Verification
        </AppText>
      </View>
      <View style={styles.bannerView}>
        <AppText style={{ color: "#FFFFFF1A" }}>BANNER HERE</AppText>
      </View>
      <View style={styles.aadharView}>
        {/* <AppText
          color={BLACK}
          weight={INTER_SEMI_BOLD}
          type={FORTEEN}
          style={{ marginVertical: 20 }}
        >
          Verify KYC
        </AppText> */}
        <Pressable style={{ width: "80%" }} onPress={() => onCloseKycOptions('aadhar')}>
          <LinearGradient
            colors={["#D92537", "#FBB613"]}
            style={styles.aadharOption}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <FastImage
              source={aadharIcon}
              resizeMode="contain"
              style={{ width: 40, height: 40, marginLeft: 10 }}
            />
            <View
              style={{
                backgroundColor: "#0000001A",
                width: 1.5,
                height: 48,
                marginLeft: 20,
              }}
            ></View>
            <AppText
              weight={INTER_SEMI_BOLD}
              type={FORTEEN}
              style={{ marginLeft: 30 }}
            >
             {aadharStatus === "Approved" ? 'Aadhar KYC is completed' : 'Aadhar using OTP'}
            </AppText>
          </LinearGradient>
        </Pressable>
      </View>
      <View
        style={{
          width: "80%",
          height: 1.5,
          backgroundColor: "#83B8CC",
          marginTop: 5,
          alignSelf: "center",
        }}
      ></View>
      <View style={styles.aadharView}>
        {/* <AppText
          color={BLACK}
          weight={INTER_SEMI_BOLD}
          type={FORTEEN}
          style={{ marginVertical: 20 }}
        >
          Verify PAN
        </AppText> */}
        <Pressable style={{ width: "80%" }} onPress={() => onCloseKycOptions('pan')} disabled={aadharStatus === undefined || aadharStatus === "Not Submitted"}>
          <LinearGradient
            colors={aadharStatus === undefined || aadharStatus === "Not Submitted" ?[colors.disableText, colors.disableText] :["#CFBEDE", "#7BB8CA"]}
            style={styles.aadharOption}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <FastImage
              source={panIcon}
              resizeMode="contain"
              style={{ width: 40, height: 40, marginLeft: 10 }}
            />
            <View
              style={{
                backgroundColor: "#0000001A",
                width: 1.5,
                height: 48,
                marginLeft: 20,
              }}
            ></View>
            <AppText
              weight={INTER_SEMI_BOLD}
              type={FORTEEN}
              style={{ marginLeft: 30 }}
            >
              {panStatus === "Approved" ? 'PAN KYC is completed' : 'PAN Number'}
            </AppText>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

export default KycOption;

const styles = StyleSheet.create({
  sheetHeader: {
    backgroundColor: colors.menuText,
    height: 70,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  bannerView: {
    backgroundColor: colors.bannerBackColor,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  aadharView: {
    justifyContent: "center",
    alignItems: "center",
  },
  aadharOption: {
    height: 50,
    marginVertical: 25,
    // justifyContent: "space-evenly",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
});
