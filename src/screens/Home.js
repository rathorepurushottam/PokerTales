import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import NavigationService from "../navigation/NavigationService";
import { HomeHeader } from "../common/HomeHeader";
import { colors } from "../theme/color";
import FastImage from "react-native-fast-image";
import {
  pokerTextIcon,
  talesTextIcon,
  cashGameIcon,
  referHomeIcon,
  leaderBoardIcon,
  tournamentIcon,
  homeFooterIcon,
  tournamentLeaderIcon,
  signupBonusIcon,
} from "../helper/image";
import HomeSlider from "../common/HomeSlider";
import {
  AppText,
  FORTEEN,
  GREEN,
  INTER_BOLD,
  MENUTEXT,
  TWENTY,
  TWENTY_FOUR,
  WHITE,
} from "../common/AppText";
import { useDispatch, useSelector } from "react-redux";
import {
  getInitGame,
  getKycDetails,
  getUserWallet,
  upateTrackUser,
} from "../actions/profileAction";
import {
  ADD_CASH_SCREEN,
  LEADERBOARD_SCREEN,
  WEB_URL_SCREEN,
} from "../navigation/routes";
import { getBrand } from "react-native-device-info";
import RBSheet from "react-native-raw-bottom-sheet";
import InviteAndEarn from "../common/InviteAndEarn";

const Home = () => {
  const dispatch = useDispatch();
  const refRBSheetSignupBonus = useRef();
  const refRBSheetInvite = useRef();
  const [refreshing, setRefreshing] = useState(false);

  const userData = useSelector((state) => {
    return state.profile.userData;
  });

  // console.log(userData, "userData");

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getUserWallet());
    dispatch(getKycDetails());
    setTimeout(() => {
      console.log("Refreshed!");
      setRefreshing(false);
    }, 2000); // Refresh completes after 2 seconds
  };

  useEffect(() => {
    dispatch(getUserWallet());
    userData?.firstTime && refRBSheetSignupBonus.current.open();
  }, []);

  const handleOpenEventBet = (type) => {
    dispatch(getInitGame(type));
  };

  useEffect(() => {
    const windowWidth = Dimensions.get("window").width?.toFixed(2);
    const windowHeight = Dimensions.get("window").height?.toFixed(2);
    let data = {
      deviceType: getBrand(),
      deviceOS: Platform.OS,
      screenSize: windowWidth + "X" + windowHeight,
    };
    console.log(data, "data");
    dispatch(upateTrackUser(data));
  }, []);

  const handleCloseInvite = () => {
    refRBSheetInvite.current.close();
  };

  return (
    <AppSafeAreaView>
      <HomeHeader
        walletIcon={true}
        personClick={() => NavigationService.drawerAction()}
        handleAddCash={() => NavigationService.navigate(ADD_CASH_SCREEN)}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }} // Ensures the content can scroll if it exceeds the viewport
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#032146"]} // Customize the loader color
          />
        }
      >
        <View style={{ flex: 1 }}>
          {/* Banner Section */}
          <View
            style={{
              backgroundColor: colors.bannerBackColor,
              justifyContent: "space-between",
              paddingVertical: 20,
            }}
          >
            <FastImage
              source={pokerTextIcon}
              style={{ height: 80, width: "100%" }}
              resizeMode="center"
            />
            <FastImage
              source={talesTextIcon}
              style={{ height: 80, width: "90%", alignSelf: "center" }}
              resizeMode="center"
            />
          </View>

          {/* Slider Section */}
          <HomeSlider />

          {/* Feature Buttons Section */}
          <View style={{ padding: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <TouchableOpacity
                onPress={() => handleOpenEventBet("cashGame")}
                style={{
                  height: 220,
                  width: "48%",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <FastImage
                  source={cashGameIcon}
                  style={{ height: "100%", width: "100%" }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleOpenEventBet("tournaments")}
                style={{
                  height: 220,
                  width: "48%",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <FastImage
                  source={tournamentIcon}
                  style={{ height: "100%", width: "100%" }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => refRBSheetInvite.current.open()}
                style={{
                  height: 150,
                  width: "48%",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <FastImage
                  source={referHomeIcon}
                  style={{ height: "100%", width: "100%" }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={{ width: "48%" }}>
                <TouchableOpacity
                  style={{ height: 70, marginBottom: 10 }}
                  onPress={() => NavigationService.navigate(LEADERBOARD_SCREEN)}
                >
                  <FastImage
                    source={leaderBoardIcon}
                    style={{ height: "100%", width: "100%" }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 70 }}>
                  <FastImage
                    source={tournamentLeaderIcon}
                    style={{ height: "100%", width: "100%" }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Banner Bottom Section */}
          <View style={styles.bannerBottomView}>
            <AppText style={{ color: "#FFFFFF1A" }}>BANNER HERE</AppText>
          </View>
          <FastImage
            source={homeFooterIcon}
            resizeMode="contain"
            style={{ width: "100%", height: 250, marginTop: 20 }}
          />
        </View>
      </ScrollView>

      <RBSheet
        ref={refRBSheetSignupBonus}
        closeOnDragDown={true}
        height={280}
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
        <View style={{ flex: 1, backgroundColor: colors.darkBlue }}>
          <View
            style={{
              alignItems: "center",
              marginTop: 20,
              justifyContent: "space-between",
              gap: 15,
            }}
          >
            <AppText
              type={TWENTY_FOUR}
              weight={INTER_BOLD}
              style={{ color: "#309B36" }}
            >
              Congratulations 💰
            </AppText>
            <AppText type={FORTEEN} weight={INTER_BOLD} color={WHITE}>
              You got ₹25 Signup Bonus
            </AppText>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <FastImage
              source={signupBonusIcon}
              resizeMode="contain"
              style={{ width: 90, height: 90 }}
            />
          </View>
        </View>
      </RBSheet>
      <RBSheet
        ref={refRBSheetInvite}
        closeOnDragDown={true}
        height={720}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            // paddingHorizontal: universalPaddingHorizontal,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <InviteAndEarn
          code={userData?.referralCode}
          onCloseInvite={handleCloseInvite}
        />
      </RBSheet>
    </AppSafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  bannerView: {
    backgroundColor: colors.bannerBackColor,
    height: 66,
    width: 183,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#223655D6",
    borderRadius: 10,
  },
  bannerBottomView: {
    backgroundColor: colors.bannerBackColor,
    // height: 66,
    // width: 390,
    width: "95%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#223655D6",
    borderRadius: 19,
    // marginVertical: 12
    marginHorizontal: 10,
    marginTop: 12,
    alignSelf: "center",
  },
});
