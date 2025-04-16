import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import Header from "../common/Header";
import { colors } from "../theme/color";
import { useEffect, useRef, useState } from "react";
import Collapsible from "react-native-collapsible";

import {
  AppText,
  BLACK,
  ELEVEN,
  FIFTEEN,
  FORTEEN,
  GOLDEN,
  INTER_BOLD,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  MENUTEXT,
  SIXTEEN,
  TEN,
  TWELVE,
  WITHDRAWBLUE,
} from "../common/AppText";
import { useDispatch, useSelector } from "react-redux";
import { getTdsTransactions, getTransactions, revertTransaction } from "../actions/profileAction";
import FastImage from "react-native-fast-image";
import {
  backIcon,
  copyIcon,
  failedVector,
  inprocessVector,
  revertedIcon,
  successVector,
} from "../helper/image";
import moment from "moment";
import { toastAlert } from "../helper/utility";
import {
  setDepositTransactions,
  setWithdrawTransactions,
} from "../slices/profileSlice";
import Clipboard from "@react-native-clipboard/clipboard";
import TransactionDetails from "../common/TransactionDetails";
import RBSheet from "react-native-raw-bottom-sheet";
import WithdrawDetails from "../common/WithdrawDetails";
import SecondaryButton from "../common/SecondaryButton";

const Transactions = () => {
  const dispatch = useDispatch();
  const refRBSheetDetails = useRef();
  const refRBSheetWithdrawDetails = useRef();
  const [activeTab, setActiveTab] = useState("deposit");
  const [subTabActive, setSubTabActive] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [filterDepositData, setFilterDepositData] = useState([]);
  const [filterWithdrawData, setFilterWithdrawData] = useState([]);

  const depositTransactions = useSelector((state) => {
    return state.profile.despositTransactions;
  });

  const bonusTransactions = useSelector((state) => {
    return state.profile.bonusTransaction;
  });

  const leaderBoardTransactions = useSelector((state) => {
    return state.profile.leaderBoardTransaction;
  });

  const lobbyTransactions = useSelector((state) => {
    return state.profile.lobbyTransactions;
  });

  const withdrawTransactions = useSelector((state) => {
    return state.profile.withdrawTransactions;
  });

  const tdsTransaction = useSelector((state) => {
    return state.profile.tdsTransaction;
  });

  const userData = useSelector((state) => {
    return state.profile.userData;
  });

  useEffect(() => {
    dispatch(getTransactions(setFilterDepositData, setFilterWithdrawData));
    dispatch(getTdsTransactions());
  }, []);

  useEffect(() => {
    setFilterDepositData(depositTransactions);
    setFilterWithdrawData(withdrawTransactions);
  }, []);

 

  const handleCodeCopy = (id) => {
    Clipboard.setString(id);
    toastAlert.showToastError("Copied");
  };

  const FAQItem = ({ item }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    console.log(item, "item");
    return (
      <>
        <TouchableOpacity
          onPress={() => handleTransactionDetails("Deposit Details", item)}
        >
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
                        item?.status === "Success" ||
                        item?.status === "Confirmed"
                          ? "#C7F2C9"
                          : "#CB2E2E33",
                    },
                  ]}
                >
                  <FastImage
                    source={
                      item?.status === "Success" || item?.status === "Confirmed"
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
                        : item?.status === "Success" ||
                          item?.status === "Confirmed"
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
                  {moment(item?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </AppText>
              </View>
            </View>

            <AppText type={SIXTEEN} weight={INTER_BOLD} color={BLACK}>
              ₹ {item?.totalAmount?.toFixed(2)}
            </AppText>
            <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
              <FastImage
                source={backIcon}
                tintColor={colors.black}
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 15,
                  transform: [{ rotateZ: isCollapsed ? "270deg" : "90deg" }],
                }}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={isCollapsed}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderTopWidth: 1,
              borderTopColor: "#E4E4E4",
              alignItems: "center",
            }}
          >
            {/* <View style={{flexDirection: "row", justifyContent: "space-between"}}> */}
              <AppText type={FORTEEN} style={{ color: "#797979CC" }}>
                Reference Id:-{" "}
              </AppText>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  // marginRight: 20,
                }}
                onPress={() => handleCodeCopy(item?._id)}
              >
                <AppText type={FORTEEN} color={MENUTEXT}>
                  {/* {} */}
                  {/* {item?.gateway === "CashFree"
                    ? item?.utr
                    : item?.merchantTransactionId} */}
                    {item?.utr}
                </AppText>
                <FastImage
                  source={copyIcon}
                  style={{ width: 15, height: 15, marginLeft: 5 }}
                  resizeMode="contain"
                  tintColor={colors.blue}
                />
              </TouchableOpacity>
            {/* </View> */}
            {/* {(item?.status === "Success" || item?.status === "Confirmed") && (
              <AppText
                type={FORTEEN}
                color={WITHDRAWBLUE}
                style={{ textDecorationLine: "underline" }}
                onPress={() => generatePDF(item)}
              >
                Download invoice
              </AppText>
            )} */}
          </View>
        </Collapsible>
      </>
    );
  };

  const handleFilterTransaction = (type) => {
    console.log(subTabActive , type,"setSubTabActive");
    setSubTabActive(subTabActive === type ? "": type);
    if (activeTab === "deposit") {
      if (subTabActive === type) {
        setFilterDepositData(depositTransactions);
      } else {
        let filterData = depositTransactions?.filter(
          (item) => item?.status === type
        );
        setFilterDepositData(filterData);
      }
     
    } else if (activeTab === "withdraw") {
      if (subTabActive === type) {
          setFilterWithdrawData(withdrawTransactions);
      } else {
        let filterData = withdrawTransactions?.filter(
          (item) => item?.status === type
        );
        setFilterWithdrawData(filterData);
      }
      
    }
  };

  const handleTransactionDetails = (title, item) => {
    refRBSheetDetails.current.open();
    setTitle(title);
    setDetails(item);
  };

  const handleWithdrawDetails = (title, item) => {
    refRBSheetWithdrawDetails.current.open();
    setTitle(title);
    setDetails(item);
  };

  const handleCloseDetails = () => {
    refRBSheetDetails.current.close();
  };

  const handleSwitchTab = (tab) => {
    setActiveTab(tab.toLowerCase());
    setSubTabActive("");
    if (tab === 'Deposit') {
      setFilterDepositData(depositTransactions);
    };
    if (tab === 'Withdraw') {
      setFilterWithdrawData(withdrawTransactions);
    }
  };

  const handleRevertTransaction = (item) => {
    let data = {
      withdrawalId: item?._id
    };
    dispatch(revertTransaction(data));
  }

  // console.log(tdsTransaction, "tdsTransaction");

  return (
    <AppSafeAreaView statusColor={"#032146"}>
      <Header title={"My Transactions"} />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={styles.container}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {["Deposit", "Withdraw", "TDS", "LeaderBoard", "Bonus", "Game"].map(
              (tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() =>
                    handleSwitchTab(tab)
                  }
                  style={[
                    styles.tab,
                    activeTab === tab.toLowerCase()
                      ? styles.activeTab
                      : styles.inactiveTab,
                  ]}
                >
                  <AppText style={styles.tabText}>{tab}</AppText>
                </TouchableOpacity>
              )
            )}
          </ScrollView>
        </View>
        {activeTab === 'deposit' ? <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            style={[
              styles.subTab,
              {
                backgroundColor:
                  subTabActive === "Confirmed" ? "#C7F2C9" : "#F4F4F4",
              },
            ]}
            onPress={() => handleFilterTransaction("Confirmed" )}
          >
            <AppText
              style={{
                color: subTabActive === "Confirmed" ? "#309B36" : "#3B3B3B",
              }}
            >
              Success
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.subTab,
              {
                backgroundColor:
                  subTabActive === "Pending" ? "#C7F2C9" : "#F4F4F4",
              },
            ]}
            onPress={() => handleFilterTransaction("Pending")}
          >
            <AppText
              style={{
                color: subTabActive === "Pending" ? "#309B36" : "#3B3B3B",
              }}
            >
              Pending
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.subTab,
              {
                backgroundColor:
                  subTabActive === "Rejected" ? "#C7F2C9" : "#F4F4F4",
              },
            ]}
            onPress={() => handleFilterTransaction("Rejected")}
          >
            <AppText
              style={{
                color: subTabActive === "Rejected" ? "#309B36" : "#3B3B3B",
              }}
            >
              Rejected
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.subTab,
              {
                backgroundColor:
                  subTabActive === "Refund" ? "#C7F2C9" : "#F4F4F4",
              },
            ]}
            onPress={() => handleFilterTransaction("Refund")}
          >
            <AppText
              style={{
                color: subTabActive === "Refund" ? "#309B36" : "#3B3B3B",
              }}
            >
              Revert
            </AppText>
          </TouchableOpacity>
        </View> : activeTab === "withdraw" ? <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            style={[
              styles.subTab,
              {
                backgroundColor:
                  subTabActive === "Completed" ? "#C7F2C9" : "#F4F4F4",
              },
            ]}
            onPress={() => handleFilterTransaction("Completed" )}
          >
            <AppText
              style={{
                color: subTabActive === "Completed" ? "#309B36" : "#3B3B3B",
              }}
            >
              Completed
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.subTab,
              {
                backgroundColor:
                  subTabActive === "Pending" ? "#C7F2C9" : "#F4F4F4",
              },
            ]}
            onPress={() => handleFilterTransaction("Pending")}
          >
            <AppText
              style={{
                color: subTabActive === "Pending" ? "#309B36" : "#3B3B3B",
              }}
            >
              Pending
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.subTab,
              {
                backgroundColor:
                  subTabActive === "Failed" ? "#C7F2C9" : "#F4F4F4",
              },
            ]}
            onPress={() => handleFilterTransaction("Failed")}
          >
            <AppText
              style={{
                color: subTabActive === "Failed" ? "#309B36" : "#3B3B3B",
              }}
            >
              Failed
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.subTab,
              {
                backgroundColor:
                  subTabActive === "Reverted" ? "#C7F2C9" : "#F4F4F4",
              },
            ]}
            onPress={() => handleFilterTransaction("Reverted")}
          >
            <AppText
              style={{
                color: subTabActive === "Reverted" ? "#309B36" : "#3B3B3B",
              }}
            >
              Reverted
            </AppText>
          </TouchableOpacity>
        </View>: ""}
        
        <ScrollView
          style={{ backgroundColor: colors.white }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
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
              filterDepositData?.length > 0 ? (
                filterDepositData?.map((item) => (
                  <>
                    <FAQItem item={item} />
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
            ) : activeTab === "leaderboard" ? (
              leaderBoardTransactions?.length > 0 ? (
                leaderBoardTransactions?.map((item) => (
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
                        ₹ {item?.amount?.toFixed(2)}
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
              filterWithdrawData?.length > 0 ? (
                filterWithdrawData?.map((item) => (
                  <>
                    <TouchableOpacity
                      style={{
                        // flexDirection: "row",
                        // alignItems: "center",
                        // justifyContent: "space-between",
                        // margin: 20,
                      }}
                      onPress={() => handleWithdrawDetails("Withdraw Details", item)}
                    >
                      <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        margin: 20,
                      }}><View
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
                                  item?.status === "Completed"
                                    ? "#C7F2C9"
                                    : item?.status === "Reverted" ? "#1355B624" : "#CB2E2E33",
                              },
                            ]}
                          >
                            <FastImage
                              source={
                                item?.status === "Completed"
                                  ? successVector
                                  :  item?.status === "Reverted" ? revertedIcon :failedVector
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
                                  : item?.status === "Completed"
                                  ? "#309B36"
                                  : item?.status === "Reverted" ? "#1355B6" : "#CB2E2E",
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
                      <View style={{ alignItems: "center" }}>
                        <AppText
                          type={SIXTEEN}
                          weight={INTER_BOLD}
                          color={BLACK}
                        >
                          ₹ {item?.amount?.toFixed(2)}
                        </AppText>
                        <AppText
                          type={FORTEEN}
                          weight={INTER_BOLD}
                          color={GOLDEN}
                        >
                          {item?.withdrawalType}
                        </AppText>
                        
                      </View></View>
                      
                      {(item?.status === "Pending" && item?.withdrawalType === "Standard") && <SecondaryButton
                title={"Revert"}
                buttonStyle={{
                  backgroundColor:
                    "#1355B6",
                  width: "50%",
                  alignSelf: "center",
                  height: 30,
                  marginBottom: 5
                  
                }}
                titleStyle={{ color: colors.white }}
                onPress={() =>  handleRevertTransaction(item)}
              />}
                      
                     
                    </TouchableOpacity>
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
            ) : activeTab === "bonus" ? (
              bonusTransactions?.length > 0 ? (
                bonusTransactions?.map((item) => (
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
                        {item?.paymentType === "Pending" ? (
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
                        )}

                        <View>
                          <AppText
                            type={FIFTEEN}
                            weight={INTER_SEMI_BOLD}
                            style={{
                              color:
                                item?.status === "Pending"
                                  ? "#0187F5"
                                  : item?.paymentType === "Credit"
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
                      <View style={{ alignItems: "center" }}>
                        <AppText
                          type={SIXTEEN}
                          weight={INTER_BOLD}
                          color={BLACK}
                        >
                          ₹ {item?.bonusAmount?.toFixed(2)}
                        </AppText>
                        <AppText type={TEN} weight={INTER_BOLD} color={GOLDEN}>
                          {item?.description}
                        </AppText>
                      </View>
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
            ) : activeTab === "tds" ? (
              tdsTransaction?.length > 0 ? (
                tdsTransaction?.map((item) =>
                  item?.tdsAmount != 0 ? (
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
                            // flexDirection: "row",
                            justifyContent: "space-between",
                            gap: 10,
                          }}
                        >
                          <View>
                            <View style={{ flexDirection: "row", gap: 5 }}>
                              <AppText
                                type={TWELVE}
                                weight={INTER_SEMI_BOLD}
                                style={{ color: "#797979CC" }}
                              >
                                TDS Amount: -
                              </AppText>
                              <AppText
                                type={FIFTEEN}
                                weight={INTER_SEMI_BOLD}
                                color={BLACK}
                              >
                                ₹{item?.tdsAmount?.toFixed(2)}
                              </AppText>
                            </View>
                          </View>
                          <View>
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
                        <View style={{ flexDirection: "row", gap: 5 }}>
                          <AppText
                            type={TWELVE}
                            weight={INTER_SEMI_BOLD}
                            style={{ color: "#797979CC" }}
                          >
                            Total Amount: -
                          </AppText>
                          <AppText
                            type={SIXTEEN}
                            weight={INTER_BOLD}
                            color={BLACK}
                          >
                            ₹ {item?.amount?.toFixed(2)}
                          </AppText>
                        </View>
                      </View>
                      <View
                        style={{
                          height: 2,
                          width: "100%",
                          backgroundColor: "#F2F2F2",
                        }}
                      ></View>
                    </>
                  ) : (
                    ""
                  )
                )
              ) : (
                <AppText
                  color={BLACK}
                  type={FORTEEN}
                  style={{ alignSelf: "center", marginTop: 30 }}
                >
                  No Transactions
                </AppText>
              )
            ) : activeTab === "game" ? (
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
                        ₹ {item?.amount?.toFixed(2)}
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
        </ScrollView>
      </View>
      <RBSheet
        ref={refRBSheetDetails}
        closeOnDragDown={true}
        height={520}
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
        <TransactionDetails
          title={title}
          onClose={handleCloseDetails}
          details={details}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheetWithdrawDetails}
        closeOnDragDown={true}
        height={520}
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
        <WithdrawDetails
          title={title}
          onClose={handleCloseDetails}
          details={details}
        />
      </RBSheet>
    </AppSafeAreaView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#F2F2F2",
    // paddingHorizontal: 10,
    borderRadius: 8,
    //  width: "100%",
  },
  scrollContent: {
    flexDirection: "row", // Ensures horizontal alignment
    paddingHorizontal: 10,
    height: 40,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    // width: "20%",
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#DBEFFF",
    borderWidth: 1,
    borderColor: "#0F65F8",
  },
  inactiveTab: {
    // backgroundColor: "#E0E0E0",
  },
  tabText: {
    color: "#032146B2",
    fontSize: 14,
  },
  subTab: {
    // backgroundColor: "#F4F4F4",
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
