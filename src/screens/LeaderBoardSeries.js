import { useRef } from "react";
import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import Header from "../common/Header";
import {
  bannerText2Image,
  refreshIcon,
  seriesLeaderboardBg,
  topRankIcon,
  topWinnerIcon,
  totalPrizeIcon,
  totalWinningIcon,
} from "../helper/image";
import FastImage from "react-native-fast-image";
import {
  AppText,
  BLACK,
  EIGHTEEN,
  FIFTEEN,
  FORTEEN,
  INTER_BOLD,
  SIXTEEN,
} from "../common/AppText";
import RBSheet from "react-native-raw-bottom-sheet";
import LeaderBoardPrize from "../common/LeaderBoardPrize";


const LeaderBoardSeries = () => {
    const refRBSheetLeaderBoard = useRef();
  return (
    <AppSafeAreaView statusColor={"#032146"}>
      <Header title={"Badshah Series"} />
      <ImageBackground
        source={seriesLeaderboardBg}
        style={{ height: "100%", width: "100%" }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ backgroundColor: "#091831" }}>
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                // justifyContent: "space-between",
                width: '80%'
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  // gap: 2,
                }}
              >
                <View
                  style={{
                    width: "35%",
                    height: 100,
                    borderWidth: 1,
                    borderColor: "#032753",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#091831",
                    borderRadius: 11,
                  }}
                >
                  <FastImage
                    source={bannerText2Image}
                    resizeMode="contain"
                    style={{ width: "90%", height: "100%" }}
                  />
                </View>
                <View style={{ justifyContent: "space-around" }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <FastImage
                      source={totalPrizeIcon}
                      resizeMode="contain"
                      style={{ width: 22, height: 22 }}
                    />
                    <View>
                      <AppText type={EIGHTEEN} weight={INTER_BOLD}>
                        25
                      </AppText>
                      <AppText style={{ color: "#FFFFFFB2" }}>
                        Total Prize
                      </AppText>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <FastImage
                      source={totalWinningIcon}
                      resizeMode="contain"
                      style={{ width: 22, height: 22 }}
                    />
                    <View>
                      <AppText type={EIGHTEEN} weight={INTER_BOLD}>
                        5
                      </AppText>
                      <AppText style={{ color: "#FFFFFFB2" }}>
                        Total Winners
                      </AppText>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "#223655D6",
                  height: "70%",
                  width: 1,
                  alignSelf: "center",
                  marginHorizontal: 5
                }}
              ></View>
              <View style={{ justifyContent: "space-around" }}>
                <View>
                  <AppText style={{ color: "#FFFFFFB2" }}>Date</AppText>
                  <AppText type={SIXTEEN} weight={INTER_BOLD}>
                    22 Oct 2024
                  </AppText>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 7,
                    }}
                  >
                    <AppText style={{ color: "#FFFFFFB2" }}>
                      Start Time:
                    </AppText>
                    <AppText>01.00 AM</AppText>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 7,
                    }}
                  >
                    <AppText style={{ color: "#FFFFFFB2" }}>End Time:</AppText>
                    <AppText>12.49 M</AppText>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderTopWidth: 1,
                borderTopColor: "#223655D6",
                padding: 10,
              }}
            >
              <AppText type={FORTEEN}>Last Update: 12:59 PM</AppText>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 6,
                }}
              >
                <FastImage
                  source={refreshIcon}
                  resizeMode="contain"
                  style={{ width: 16, height: 16 }}
                />
                <AppText type={FIFTEEN}>Refresh</AppText>
              </View>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <FastImage source={topWinnerIcon} resizeMode="contain" style={{width: "80%", height: "39%", alignSelf: "center"}} />
            <FastImage source={topRankIcon} resizeMode="contain"  style={{width: "90%", height: "25%", alignSelf: "center"}} />
            <View style={{flexDirection: "row", justifyContent: "space-between", backgroundColor: "#032146", padding: 15}}>
                <AppText>RANK</AppText>
                <AppText>USERNAME</AppText>
                <AppText>VIP POINTS</AppText>
                <AppText>PRIZE</AppText>
                <AppText>LB POINTS</AppText>
            </View>
            <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <TouchableOpacity style={{flexDirection: "row", justifyContent :"space-between", alignItems: "center", padding: 10, paddingHorizontal: 20}} onPress={() => refRBSheetLeaderBoard.current.open()}>
                <View style={{backgroundColor:"#FFD562", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 20}}>
                    <AppText color={BLACK}>1</AppText>
                </View>
                <AppText>gova3546</AppText>
                <AppText>220</AppText>
                <AppText>₹5000</AppText>
                <AppText>5</AppText>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: "row", justifyContent :"space-between", alignItems: "center", padding: 10 , paddingHorizontal: 20}} onPress={() => refRBSheetLeaderBoard.current.open()}>
                <View style={{backgroundColor:"#FFD562", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 20}}>
                    <AppText color={BLACK}>2</AppText>
                </View>
                <AppText>gova3546</AppText>
                <AppText>220</AppText>
                <AppText>₹5000</AppText>
                <AppText>5</AppText>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: "row", justifyContent :"space-between", alignItems: "center", padding: 10, paddingHorizontal: 20}} onPress={() => refRBSheetLeaderBoard.current.open()}>
                <View style={{backgroundColor:"#FFD562", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 20}}>
                    <AppText color={BLACK}>3</AppText>
                </View>
                <AppText>gova3546</AppText>
                <AppText>220</AppText>
                <AppText>₹5000</AppText>
                <AppText>5</AppText>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: "row", justifyContent :"space-between", alignItems: "center", padding: 10,paddingHorizontal: 20}} onPress={() => refRBSheetLeaderBoard.current.open()}>
                <View style={{backgroundColor:"#FFD562", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 20}}>
                    <AppText color={BLACK}>4</AppText>
                </View>
                <AppText>gova3546</AppText>
                <AppText>220</AppText>
                <AppText>₹5000</AppText>
                <AppText>5</AppText>
                </TouchableOpacity>
            </ScrollView>
            </View>
          </View>
          
        </View>
      </ImageBackground>
      <RBSheet
        ref={refRBSheetLeaderBoard}
        closeOnDragDown={true}
        height={450}
        customStyles={{
          container: {
            backgroundColor: '#091831',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <LeaderBoardPrize />
      </RBSheet>
    </AppSafeAreaView>
  );
};

export default LeaderBoardSeries;
