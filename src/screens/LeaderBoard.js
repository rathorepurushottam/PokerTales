import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { AppText, FORTEEN, INTER_BOLD, SIXTEEN } from "../common/AppText";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import Header from "../common/Header";
import LinearGradient from "react-native-linear-gradient";
import FastImage from "react-native-fast-image";
import { bannerText2Image } from "../helper/image";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import JoinButton from "../common/JoinButton";
import NavigationService from "../navigation/NavigationService";
import { LEADERBOARD_SERIES_SCREEN } from "../navigation/routes";

const LeaderBoard = () => {
  const [activeTab, setActiveTab] = useState("active");
  return (
    <AppSafeAreaView statusColor={'#032146'}>
      <Header title={"Leaderboard"} />
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#070C19", "#032044"]}
          style={{
            width: "100%",
            height: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FastImage
            source={bannerText2Image}
            resizeMode="center"
            style={{ width: 120, height: 100 }}
          ></FastImage>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginVertical: 10,
              marginHorizontal: 5,
            }}
          >
            <TouchableOpacity
              style={{
                borderBottomWidth: 2,
                borderBottomColor:
                  activeTab === "active" ? "#F3DE98" : "#032146",
                width: "50%",
                paddingVertical: 10,
              }}
              onPress={() => setActiveTab("active")}
            >
              <AppText type={SIXTEEN} style={{ alignSelf: "center" }}>
                Active
              </AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderBottomWidth: 2,
                borderBottomColor:
                  activeTab === "completed" ? "#F3DE98" : "#032146",
                width: "50%",
                paddingVertical: 10,
              }}
              onPress={() => setActiveTab("completed")}
            >
              <AppText type={SIXTEEN} style={{ alignSelf: "center" }}>
                Completed
              </AppText>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 10, paddingHorizontal: 5 }}
          >
            <LinearGradient
              colors={["#032146", "#041A39"]}
              style={{
                flexDirection: "row",
                padding: 10,
                borderWidth: 1,
                borderColor: "#032753",
                borderRadius: 13,
                marginBottom: 8,
                width: "100%"
              }}
            >
              <View
                style={{
                  width: "32%",
                  height: 120,
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
                  resizeMode="center"
                  style={{ width: "90%", height: 120 }}
                />
              </View>
              <View
                style={{
                  marginLeft: 30,
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <AppText weight={INTER_BOLD} type={SIXTEEN}>
                  Badshah Series
                </AppText>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#2E4563",
                    width: "60%",
                  }}
                ></View>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-start" }}
                >
                  <View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon
                        name="calendar-month-outline"
                        size={20}
                        color="#FFFFFF"
                      />
                      <AppText style={{ marginLeft: 5 }}>
                        23rd Sept 2024
                      </AppText>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 8,
                      }}
                    >
                      <Icon name="timer-outline" size={20} color="#FFFFFF" />
                      <AppText style={{ marginLeft: 5 }}>
                        00:00 to 23:55
                      </AppText>
                    </View>
                  </View>
                  {activeTab === "active" && (
                    <JoinButton
                      title={"Join"}
                      smallBtn={{ width: 60, height: 35, marginLeft: 20 }}
                      onPress={() =>
                        NavigationService.navigate(LEADERBOARD_SERIES_SCREEN)
                      }
                    />
                  )}
                </View>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={["#032146", "#041A39"]}
              style={{
                flexDirection: "row",
                padding: 10,
                borderWidth: 1,
                borderColor: "#032753",
                borderRadius: 13,
                marginBottom: 8,
                width: "100%"
              }}
            >
              <View
                style={{
                  width: "32%",
                  height: 120,
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
                  resizeMode="center"
                  style={{ width: "90%", height: 120 }}
                />
              </View>
              <View
                style={{
                  marginLeft: 30,
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <AppText weight={INTER_BOLD} type={SIXTEEN}>
                  Badshah Series
                </AppText>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#2E4563",
                    width: "60%",
                  }}
                ></View>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-start" }}
                >
                  <View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon
                        name="calendar-month-outline"
                        size={20}
                        color="#FFFFFF"
                      />
                      <AppText style={{ marginLeft: 5 }}>
                        23rd Sept 2024
                      </AppText>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 8,
                      }}
                    >
                      <Icon name="timer-outline" size={20} color="#FFFFFF" />
                      <AppText style={{ marginLeft: 5 }}>
                        00:00 to 23:55
                      </AppText>
                    </View>
                  </View>
                  {activeTab === "active" && (
                    <JoinButton
                      title={"Join"}
                      smallBtn={{ width: 60, height: 35, marginLeft: 20 }}
                      onPress={() =>
                        NavigationService.navigate(LEADERBOARD_SERIES_SCREEN)
                      }
                    />
                  )}
                </View>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={["#032146", "#041A39"]}
              style={{
                flexDirection: "row",
                padding: 10,
                borderWidth: 1,
                borderColor: "#032753",
                borderRadius: 13,
                marginBottom: 8,
                width: "100%"
              }}
            >
              <View
                style={{
                  width: "32%",
                  height: 120,
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
                  resizeMode="center"
                  style={{ width: "90%", height: 120 }}
                />
              </View>
              <View
                style={{
                  marginLeft: 30,
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <AppText weight={INTER_BOLD} type={SIXTEEN}>
                  Badshah Series
                </AppText>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#2E4563",
                    width: "60%",
                  }}
                ></View>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-start" }}
                >
                  <View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon
                        name="calendar-month-outline"
                        size={20}
                        color="#FFFFFF"
                      />
                      <AppText style={{ marginLeft: 5 }}>
                        23rd Sept 2024
                      </AppText>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 8,
                      }}
                    >
                      <Icon name="timer-outline" size={20} color="#FFFFFF" />
                      <AppText style={{ marginLeft: 5 }}>
                        00:00 to 23:55
                      </AppText>
                    </View>
                  </View>
                  {activeTab === "active" && (
                    <JoinButton
                      title={"Join"}
                      smallBtn={{ width: 60, height: 35, marginLeft: 20 }}
                      onPress={() =>
                        NavigationService.navigate(LEADERBOARD_SERIES_SCREEN)
                      }
                    />
                  )}
                </View>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={["#032146", "#041A39"]}
              style={{
                flexDirection: "row",
                padding: 10,
                borderWidth: 1,
                borderColor: "#032753",
                borderRadius: 13,
                marginBottom: 8,
                width: "100%"
              }}
            >
              <View
                style={{
                  width: "32%",
                  height: 120,
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
                  resizeMode="center"
                  style={{ width: "90%", height: 120 }}
                />
              </View>
              <View
                style={{
                  marginLeft: 30,
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <AppText weight={INTER_BOLD} type={SIXTEEN}>
                  Badshah Series
                </AppText>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: "#2E4563",
                    width: "60%",
                  }}
                ></View>
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-start" }}
                >
                  <View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Icon
                        name="calendar-month-outline"
                        size={20}
                        color="#FFFFFF"
                      />
                      <AppText style={{ marginLeft: 5 }}>
                        23rd Sept 2024
                      </AppText>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 8,
                      }}
                    >
                      <Icon name="timer-outline" size={20} color="#FFFFFF" />
                      <AppText style={{ marginLeft: 5 }}>
                        00:00 to 23:55
                      </AppText>
                    </View>
                  </View>
                  {activeTab === "active" && (
                    <JoinButton
                      title={"Join"}
                      smallBtn={{ width: 60, height: 35, marginLeft: 20 }}
                      onPress={() =>
                        NavigationService.navigate(LEADERBOARD_SERIES_SCREEN)
                      }
                    />
                  )}
                </View>
              </View>
            </LinearGradient>
          </ScrollView>
        </View>
      </View>
    </AppSafeAreaView>
  );
};

export default LeaderBoard;
