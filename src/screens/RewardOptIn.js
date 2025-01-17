import { useRef } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import Header from "../common/Header";
import { colors } from "../theme/color";
import {
  AppText,
  INTER_MEDIUM,
  TEN,
  THIRTEEN,
  THIRTEENTH,
  TWELVE,
} from "../common/AppText";
import FastImage from "react-native-fast-image";
import {
  rewardOptInBanner,
  bannerTextImage,
  backIcon,
  optInTimeImage,
  optInCompleteImage,
} from "../helper/image";
import NavigationService from "../navigation/NavigationService";
import OptInButton from "../common/OptInButton";
import OptInUsers from "../common/OptInUsers";
import RBSheet from "react-native-raw-bottom-sheet";

const RewardOptIn = () => {
  const refRBSheetOptInUser = useRef();
  return (
    <AppSafeAreaView statusColor={"#FFFEED"} barStyle={"dark-content"}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <View>
          <TouchableOpacity
            style={{ position: "absolute", top: 10, zIndex: 999, left: 20 }}
            onPress={() => NavigationService.goBack()}
          >
            <FastImage
              source={backIcon}
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              tintColor={colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: "100%", alignItems: "center" }}>
            <FastImage
              source={rewardOptInBanner}
              resizeMode="cover"
              style={{ width: 500, height: 200 }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }}>
          <ScrollView style={{ paddingHorizontal: 10, marginVertical: 20 }}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <View style={{ alignItems: "center", width: "20%" }}>
                <FastImage
                  source={optInTimeImage}
                  resizeMode="contain"
                  style={{ width: 80, height: 80 }}
                />
                <AppText
                  weight={INTER_MEDIUM}
                  type={THIRTEENTH}
                  style={{ color: "#03214699" }}
                >
                  Jan 12
                </AppText>
                <AppText
                  weight={INTER_MEDIUM}
                  type={THIRTEENTH}
                  style={{ color: "#03214699" }}
                >
                  11:59AM
                </AppText>
              </View>

              <View
                style={{
                  backgroundColor: "#F5F5F5",
                  width: "75%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderColor: "#EBECED",
                  borderWidth: 1,
                }}
              >
                <FastImage
                  source={bannerTextImage}
                  resizeMode="contain"
                  style={{
                    width: 150,
                    height: 30,
                    alignSelf: "flex-start",
                    marginTop: 25,
                    marginHorizontal: 20,
                  }}
                />
                <View
                  style={{
                    alignSelf: "flex-end",
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderStyle: "dashed",
                    borderColor: "#00000054",
                    paddingLeft: 20,
                    paddingRight: 5,
                    paddingVertical: 10,
                    // borderTopLeftRadius: 10
                  }}
                >
                  <OptInButton
                    title={"OPT-IN"}
                    type={TEN}
                    buttonStyle={{ width: 80, height: 30 }}
                    onPress={() => refRBSheetOptInUser.current.open()}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginVertical: 15,
              }}
            >
              <View style={{ alignItems: "center", width: "20%" }}>
                <FastImage
                  source={optInTimeImage}
                  resizeMode="contain"
                  style={{ width: 80, height: 80 }}
                />
                <AppText
                  weight={INTER_MEDIUM}
                  type={THIRTEENTH}
                  style={{ color: "#03214699" }}
                >
                  Jan 12
                </AppText>
                <AppText
                  weight={INTER_MEDIUM}
                  type={THIRTEENTH}
                  style={{ color: "#03214699" }}
                >
                  11:59AM
                </AppText>
              </View>

              <View
                style={{
                  backgroundColor: "#F5F5F5",
                  width: "75%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderColor: "#EBECED",
                  borderWidth: 1,
                }}
              >
                <FastImage
                  source={bannerTextImage}
                  resizeMode="contain"
                  style={{
                    width: 150,
                    height: 30,
                    alignSelf: "flex-start",
                    marginTop: 25,
                    marginHorizontal: 20,
                  }}
                />
                <View
                  style={{
                    alignSelf: "flex-end",
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderStyle: "dashed",
                    borderColor: "#00000054",
                    paddingLeft: 20,
                    paddingRight: 5,
                    paddingVertical: 10,
                    // borderTopLeftRadius: 10
                  }}
                >
                  <OptInButton
                    title={"OPT-IN"}
                    type={TEN}
                    buttonStyle={{ width: 80, height: 30 }}
                    onPress={() => refRBSheetOptInUser.current.open()}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                // marginVertical: 15
              }}
            >
              <View style={{ alignItems: "center", width: "20%" }}>
                <FastImage
                  source={optInCompleteImage}
                  resizeMode="contain"
                  style={{ width: 70, height: 80 }}
                />
                <AppText
                  weight={INTER_MEDIUM}
                  type={THIRTEENTH}
                  style={{ color: "#03214699" }}
                >
                  Completed
                </AppText>
              </View>

              <View
                style={{
                  backgroundColor: "#F5F5F5",
                  width: "75%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderColor: "#EBECED",
                  borderWidth: 1,
                }}
              >
                <FastImage
                  source={bannerTextImage}
                  resizeMode="contain"
                  style={{
                    width: 150,
                    height: 30,
                    alignSelf: "flex-start",
                    marginTop: 25,
                    marginHorizontal: 20,
                  }}
                />
                <View
                  style={{
                    alignSelf: "flex-end",
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderStyle: "dashed",
                    borderColor: "#00000054",
                    paddingLeft: 20,
                    paddingRight: 5,
                    paddingVertical: 10,
                    // borderTopLeftRadius: 10
                  }}
                >
                  <OptInButton
                    title={"OPT-IN"}
                    type={TEN}
                    buttonStyle={{ width: 80, height: 30 }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                marginVertical: 15,
              }}
            >
              <View style={{ alignItems: "center", width: "20%" }}>
                <FastImage
                  source={optInTimeImage}
                  resizeMode="contain"
                  style={{ width: 80, height: 80 }}
                />
                <AppText
                  weight={INTER_MEDIUM}
                  type={THIRTEENTH}
                  style={{ color: "#03214699" }}
                >
                  Jan 12
                </AppText>
                <AppText
                  weight={INTER_MEDIUM}
                  type={THIRTEENTH}
                  style={{ color: "#03214699" }}
                >
                  11:59AM
                </AppText>
              </View>

              <View
                style={{
                  backgroundColor: "#F5F5F5",
                  width: "75%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderColor: "#EBECED",
                  borderWidth: 1,
                }}
              >
                <FastImage
                  source={bannerTextImage}
                  resizeMode="contain"
                  style={{
                    width: 150,
                    height: 30,
                    alignSelf: "flex-start",
                    marginTop: 25,
                    marginHorizontal: 20,
                  }}
                />
                <View
                  style={{
                    alignSelf: "flex-end",
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderStyle: "dashed",
                    borderColor: "#00000054",
                    paddingLeft: 20,
                    paddingRight: 5,
                    paddingVertical: 10,
                    // borderTopLeftRadius: 10
                  }}
                >
                  <OptInButton
                    title={"OPT-IN"}
                    type={TEN}
                    buttonStyle={{ width: 80, height: 30 }}
                    onPress={() => refRBSheetOptInUser.current.open()}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                // marginVertical: 15
              }}
            >
              <View style={{ alignItems: "center", width: "20%" }}>
                <FastImage
                  source={optInTimeImage}
                  resizeMode="contain"
                  style={{ width: 80, height: 80 }}
                />
                <AppText
                  weight={INTER_MEDIUM}
                  type={THIRTEENTH}
                  style={{ color: "#03214699" }}
                >
                  Jan 12
                </AppText>
                <AppText
                  weight={INTER_MEDIUM}
                  type={THIRTEENTH}
                  style={{ color: "#03214699" }}
                >
                  11:59AM
                </AppText>
              </View>

              <View
                style={{
                  backgroundColor: "#F5F5F5",
                  width: "75%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderColor: "#EBECED",
                  borderWidth: 1,
                }}
              >
                <FastImage
                  source={bannerTextImage}
                  resizeMode="contain"
                  style={{
                    width: 150,
                    height: 30,
                    alignSelf: "flex-start",
                    marginTop: 25,
                    marginHorizontal: 20,
                  }}
                />
                <View
                  style={{
                    alignSelf: "flex-end",
                    borderTopWidth: 1,
                    borderLeftWidth: 1,
                    borderStyle: "dashed",
                    borderColor: "#00000054",
                    paddingLeft: 20,
                    paddingRight: 5,
                    paddingVertical: 10,
                    // borderTopLeftRadius: 10
                  }}
                >
                  <OptInButton
                    title={"OPT-IN"}
                    type={TEN}
                    buttonStyle={{ width: 80, height: 30 }}
                    onPress={() => refRBSheetOptInUser.current.open()}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <RBSheet
        ref={refRBSheetOptInUser}
        closeOnDragDown={true}
        height={500}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <OptInUsers
        //   onCloseRefer={handleCloseRefer}
        //   setReferCode={setReferCode}
        //   referCode={referCode}
        />
      </RBSheet>
    </AppSafeAreaView>
  );
};

export default RewardOptIn;

const styles = StyleSheet.create({
  bannerView: {
    height: 152,
    width: 390,
    borderWidth: 1,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});
