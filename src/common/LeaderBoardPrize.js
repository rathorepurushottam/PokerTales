import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import {
  AppText,
  BLACK,
  FORTEEN,
  INTER_BOLD,
  INTER_SEMI_BOLD,
  SIXTEEN,
  TWELVE,
} from "./AppText";
import FastImage from "react-native-fast-image";
import { carPrizeIcon, dynamicDescImage } from "../helper/image";
import LinearGradient from "react-native-linear-gradient";
import { colors } from "../theme/color";

const LeaderBoardPrize = () => {
  const [activeTab, setActiveTab] = useState("weekly");
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderColor: "#5E6272",
          backgroundColor: "#5E6272",
          borderWidth: 2,
          width: "20%",
          alignSelf: "center",
          borderRadius: 10,
          marginVertical: 10,
        }}
      ></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
          paddingVertical: 15,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: activeTab == "weekly" ? "#F3DE98" : "#032146",
            paddingBottom: 10,
            width: "33.33%",
          }}
          onPress={() => setActiveTab("weekly")}
        >
          <AppText type={FORTEEN}>Weekly</AppText>
          <AppText type={FORTEEN}> Leaderboard</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: activeTab == "hours" ? "#F3DE98" : "#032146",
            width: "33.33%",
            paddingBottom: 10,
          }}
          onPress={() => setActiveTab("hours")}
        >
          <AppText type={FORTEEN}>8 Hrs</AppText>
          <AppText type={FORTEEN}>Leaderboard</AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: activeTab == "point" ? "#F3DE98" : "#032146",
            width: "33.33%",
            paddingBottom: 10,
          }}
          onPress={() => setActiveTab("point")}
        >
          <AppText type={FORTEEN}>Point</AppText>
          <AppText type={FORTEEN}>Collaboration</AppText>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#414865",
          marginHorizontal: 15,
          borderRadius: 8,
          padding: 5,
          alignItems: "center",
        }}
      >
        <AppText>Play 10/20 & get a chance to win</AppText>
      </View>
      {/* <View style={{flex: 1}}> */}
     
      {activeTab === "point" ? (
         <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
            <FastImage
          source={dynamicDescImage}
          resizeMode="contain"
          style={{ width: 200, height: 200 }}
          tintColor={colors.white}
        />
         </View>
        
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 15,
              marginVertical: 10,
            }}
          >
            <AppText type={TWELVE} weight={INTER_SEMI_BOLD}>
              Top Grinders
            </AppText>
            <AppText type={TWELVE} weight={INTER_SEMI_BOLD}>
              Prizes
            </AppText>
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginBottom: 8,
                backgroundColor: "#032146",
                marginHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFD562",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                }}
              >
                <AppText color={BLACK}>1</AppText>
              </View>
              {activeTab === "weekly" ? (
                <FastImage
                  source={carPrizeIcon}
                  resizeMode="contain"
                  style={{ width: 30, height: 30 }}
                />
              ) : (
                <AppText type={SIXTEEN} weight={INTER_SEMI_BOLD}>
                  ₹1000
                </AppText>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginBottom: 8,
                backgroundColor: "#032146",
                marginHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFD562",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                }}
              >
                <AppText color={BLACK}>2</AppText>
              </View>
              {activeTab === "weekly" ? (
                <FastImage
                  source={carPrizeIcon}
                  resizeMode="contain"
                  style={{ width: 30, height: 30 }}
                />
              ) : (
                <AppText type={SIXTEEN} weight={INTER_SEMI_BOLD}>
                  ₹1000
                </AppText>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginBottom: 8,
                backgroundColor: "#032146",
                marginHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFD562",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                }}
              >
                <AppText color={BLACK}>3</AppText>
              </View>
              {activeTab === "weekly" ? (
                <FastImage
                  source={carPrizeIcon}
                  resizeMode="contain"
                  style={{ width: 30, height: 30 }}
                />
              ) : (
                <AppText type={SIXTEEN} weight={INTER_SEMI_BOLD}>
                  ₹1000
                </AppText>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginBottom: 8,
                backgroundColor: "#032146",
                marginHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFD562",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 30,
                  height: 30,
                  borderRadius: 20,
                }}
              >
                <AppText color={BLACK}>4</AppText>
              </View>
              {activeTab === "weekly" ? (
                <FastImage
                  source={carPrizeIcon}
                  resizeMode="contain"
                  style={{ width: 30, height: 30 }}
                />
              ) : (
                <AppText type={SIXTEEN} weight={INTER_SEMI_BOLD}>
                  ₹1000
                </AppText>
              )}
            </View>
          </ScrollView>
        </View>
      )}

      {/* </View> */}
    </View>
  );
};

export default LeaderBoardPrize;
