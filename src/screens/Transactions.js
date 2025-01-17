import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import Header from "../common/Header";
import { colors } from "../theme/color";
import { useEffect, useState } from "react";
import {
  AppText,
  BLACK,
  ELEVEN,
  FIFTEEN,
  FORTEEN,
  INTER_BOLD,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  SIXTEEN,
  TEN,
  TWELVE,
} from "../common/AppText";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../actions/profileAction";
import FastImage from "react-native-fast-image";
import { failedVector, inprocessVector, successVector } from "../helper/image";
import moment from "moment";

const Transactions = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("deposit");

  const depositTransactions = useSelector((state) => {
    return state.profile.despositTransactions;
  });

  const lobbyTransactions = useSelector((state) => {
    return state.profile.lobbyTransactions;
  });

  const withdrawTransactions = useSelector((state) => {
    return state.profile.withdrawTransactions;
  });

  useEffect(() => {
    dispatch(getTransactions());
  }, []);

  return (
    <AppSafeAreaView statusColor={"#032146"}>
      <Header title={"My Transactions"} />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            borderWidth: 2,
            borderColor: "#F2F2F2",
            marginHorizontal: 15,
            borderRadius: 8,
            marginVertical: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => setActiveTab("deposit")}
            style={
              activeTab === "deposit" ? styles.selectTab : styles.unSelectTab
            }
          >
            <AppText
              type={TWELVE}
              weight={INTER_SEMI_BOLD}
              style={{ color: "#032146B2" }}
            >
              Deposit
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("withdraw")}
            style={
              activeTab === "withdraw" ? styles.selectTab : styles.unSelectTab
            }
          >
            <AppText
              type={TWELVE}
              weight={INTER_SEMI_BOLD}
              style={{ color: "#032146B2" }}
            >
              Withdraw
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("lb")}
            style={activeTab === "lb" ? styles.selectTab : styles.unSelectTab}
          >
            <AppText
              type={TWELVE}
              weight={INTER_SEMI_BOLD}
              style={{ color: "#032146B2" }}
            >
              LB
            </AppText>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={styles.subTab}>
            <AppText style={{ color: "#3B3B3B" }}>Success</AppText>
          </View>
          <View style={styles.subTab}>
            <AppText style={{ color: "#3B3B3B" }}>In Progress</AppText>
          </View>
          <View style={styles.subTab}>
            <AppText style={{ color: "#3B3B3B" }}>Failed</AppText>
          </View>
          <View style={styles.subTab}>
            <AppText style={{ color: "#3B3B3B" }}>Refund</AppText>
          </View>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#F2F2F2",
            margin: 10,
            borderRadius: 8,
            flex: 1,
          }}
        >
          {activeTab === "deposit" ? (
            depositTransactions?.length > 0 ? (
              depositTransactions?.map((item) => (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: 20,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 10,
                      }}
                    >
                      {item?.status === "Pending" ? (
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <FastImage
                            source={inprocessVector}
                            resizeMode="contain"
                            style={{ width: 40, height: 40 }}
                          />
                        </View>
                      ) : (
                        <View
                          style={[
                            styles.statusView,
                            {
                              backgroundColor:
                                item?.status === "Success"
                                  ? "#C7F2C9"
                                  : "#CB2E2E33",
                            },
                          ]}
                        >
                          <FastImage
                            source={
                              item?.status === "Success"
                                ? successVector
                                : failedVector
                            }
                            resizeMode="contain"
                            style={{ width: 15, height: 15 }}
                          />
                        </View>
                      )}

                      <View>
                        <AppText
                          type={FIFTEEN}
                          weight={INTER_SEMI_BOLD}
                          style={{
                            color:
                              item?.status === "Pending"
                                ? "#0187F5"
                                : item?.status === "Success"
                                ? "#309B36"
                                : "#CB2E2E",
                          }}
                        >
                          {item?.status}
                        </AppText>
                        <AppText
                          type={ELEVEN}
                          weight={INTER_SEMI_BOLD}
                          style={{ color: "#797979CC" }}
                        >
                          {moment(item?.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </AppText>
                      </View>
                    </View>

                    <AppText type={SIXTEEN} weight={INTER_BOLD} color={BLACK}>
                      ₹ {item?.totalAmount}
                    </AppText>
                  </View>
                  <View
                    style={{
                      height: 2,
                      width: "100%",
                      backgroundColor: "#F2F2F2",
                    }}
                  ></View>
                </>
              ))
            ) : (
              <AppText
                color={BLACK}
                type={FORTEEN}
                style={{ alignSelf: "center", marginTop: 30 }}
              >
                No Transactions
              </AppText>
            )
          ) : activeTab === "lb" ? (
            lobbyTransactions?.length > 0 ? (
              lobbyTransactions?.map((item) => (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: 20,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 10,
                      }}
                    >
                      <View
                        style={[
                          styles.statusView,
                          {
                            backgroundColor:
                              item?.paymentType === "Credit"
                                ? "#C7F2C9"
                                : "#CB2E2E33",
                          },
                        ]}
                      >
                        <FastImage
                          source={
                            item?.paymentType === "Credit"
                              ? successVector
                              : failedVector
                          }
                          resizeMode="contain"
                          style={{ width: 15, height: 15 }}
                        />
                      </View>

                      <View>
                        <AppText
                          type={FIFTEEN}
                          weight={INTER_SEMI_BOLD}
                          style={{
                            color:
                              item?.paymentType === "Credit"
                                ? "#309B36"
                                : "#CB2E2E",
                          }}
                        >
                          {item?.paymentType}
                        </AppText>
                        <AppText
                          type={ELEVEN}
                          weight={INTER_SEMI_BOLD}
                          style={{ color: "#797979CC" }}
                        >
                          {moment(item?.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </AppText>
                      </View>
                    </View>

                    <AppText type={SIXTEEN} weight={INTER_BOLD} color={BLACK}>
                      ₹ {item?.amount}
                    </AppText>
                  </View>
                  <View
                    style={{
                      height: 2,
                      width: "100%",
                      backgroundColor: "#F2F2F2",
                    }}
                  ></View>
                </>
              ))
            ) : (
              <AppText
                color={BLACK}
                type={FORTEEN}
                style={{ alignSelf: "center", marginTop: 30 }}
              >
                No Transactions
              </AppText>
            )
          ) : activeTab === "withdraw" ? (
            withdrawTransactions?.length > 0 ? (
              withdrawTransactions?.map((item) => (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      margin: 20,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 10,
                      }}
                    >
                      {item?.status === "Pending" ? (
                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <FastImage
                            source={inprocessVector}
                            resizeMode="contain"
                            style={{ width: 40, height: 40 }}
                          />
                        </View>
                      ) : (
                        <View
                          style={[
                            styles.statusView,
                            {
                              backgroundColor:
                                item?.status === "Success"
                                  ? "#C7F2C9"
                                  : "#CB2E2E33",
                            },
                          ]}
                        >
                          <FastImage
                            source={
                              item?.status === "Success"
                                ? successVector
                                : failedVector
                            }
                            resizeMode="contain"
                            style={{ width: 15, height: 15 }}
                          />
                        </View>
                      )}

                      <View>
                        <AppText
                          type={FIFTEEN}
                          weight={INTER_SEMI_BOLD}
                          style={{
                            color:
                              item?.status === "Pending"
                                ? "#0187F5"
                                : item?.status === "Success"
                                ? "#309B36"
                                : "#CB2E2E",
                          }}
                        >
                          {item?.status}
                        </AppText>
                        <AppText
                          type={ELEVEN}
                          weight={INTER_SEMI_BOLD}
                          style={{ color: "#797979CC" }}
                        >
                          {moment(item?.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </AppText>
                      </View>
                    </View>

                    <AppText type={SIXTEEN} weight={INTER_BOLD} color={BLACK}>
                      ₹ {item?.amount}
                    </AppText>
                  </View>
                  <View
                    style={{
                      height: 2,
                      width: "100%",
                      backgroundColor: "#F2F2F2",
                    }}
                  ></View>
                </>
              ))
            ) : (
              <AppText
                color={BLACK}
                type={FORTEEN}
                style={{ alignSelf: "center", marginTop: 30 }}
              >
                No Transactions
              </AppText>
            )
          ) : (
            ""
          )}
        </View>
      </View>
    </AppSafeAreaView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  selectTab: {
    backgroundColor: "#DBEFFF",
    borderWidth: 1.5,
    borderColor: "#0F65F8",
    width: "33.33%",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  unSelectTab: {
    backgroundColor: "#FFFFFF",
    width: "33.33%",
    padding: 10,
    alignItems: "center",
  },
  subTab: {
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusView: {
    paddingHorizontal: 12,
    alignItems: "center",
    borderRadius: 40,
    justifyContent: "center",
  },
});
