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
import { useEffect, useState } from "react";
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
import { getTdsTransactions, getTransactions } from "../actions/profileAction";
import FastImage from "react-native-fast-image";
import { failedVector, inprocessVector, successVector } from "../helper/image";
import moment from "moment";
import { toastAlert } from "../helper/utility";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNFS from "react-native-fs";
import { setDepositTransactions, setWithdrawTransactions } from "../slices/profileSlice";

const Transactions = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("deposit");
  const [subTabActive, setSubTabActive] = useState('');

  const depositTransactions = useSelector((state) => {
    return state.profile.despositTransactions;
  });

  const bonusTransactions = useSelector((state) => {
    return state.profile.bonusTransaction;
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
    dispatch(getTransactions());
    dispatch(getTdsTransactions());
  }, []);

  const generatePDF = async (item) => {
    try {
      // Define your HTML content for the invoice
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { text-align: center; color: #333; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              table, th, td { border: 1px solid #ddd; }
              th, td { padding: 8px; text-align: left; }
              th { background-color: #f4f4f4; }
            </style>
          </head>
          <body>
            <h1>Invoice</h1>
            <p><strong>Date:</strong> ${moment(item?.createdAt).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}</p>
            <p><strong>Customer Name:</strong> ${userData?.fullName}</p>
            <table>
              <tr>
                <th>Amount</th>
                <th>Reference Id</th>
                <th>Payment Gateway</th>
              </tr>
              
              <tr>
                <td>${item?.totalAmount}</td>
                <td>${item?.merchantTransactionId}</td>
                <td>${item?.gateway}</td>
              </tr>
              
            </table>
          </body>
        </html>
      `;

      // Generate PDF
      const options = {
        html: htmlContent,
        fileName: "invoice",
        directory: "Documents", // Saved in the app's Documents folder
      };

      const file = await RNHTMLtoPDF.convert(options);
      toastAlert.showToastError(`PDF saved at ${file.filePath}`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toastAlert.showToastError("Failed to generate the PDF.");
    }
    await RNFS.moveFile(
      file.filePath,
      RNFS.DownloadDirectoryPath + "/invoice.pdf"
    );
    toastAlert.showToastError("PDF has been saved to the Downloads folder!");
  };

  const FAQItem = ({ item }) => {
    // console.log(item, "item");
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
      <>
        <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
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
              ₹ {item?.totalAmount}
            </AppText>
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
            <View>
              <AppText type={FORTEEN} style={{ color: "#797979CC" }}>
                Reference Id:-{" "}
              </AppText>
              <AppText type={FORTEEN} color={MENUTEXT}>
                {item?.merchantTransactionId}
              </AppText>
            </View>
            <AppText
              type={FORTEEN}
              color={WITHDRAWBLUE}
              style={{ textDecorationLine: "underline" }}
              onPress={() => generatePDF(item)}
            >
              Download invoice
            </AppText>
          </View>
        </Collapsible>
      </>
    );
  };


  const handleFilterTransaction = (type) => {
    setSubTabActive(type)
    if(activeTab === "deposit") {
      let filterData = depositTransactions?.filter(item => item?.status === type);
        dispatch(setDepositTransactions(filterData));
    }else if(activeTab === "withdraw") {
      let filterData = withdrawTransactions?.filter(item => item?.status === type);
        dispatch(setWithdrawTransactions(filterData));
    }

  }

  // console.log(tdsTransaction, "tdsTransaction");

  return (
    <AppSafeAreaView statusColor={"#032146"}>
      <Header title={"My Transactions"} />
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <View style={styles.container}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {["Deposit", "Withdraw", "TDS", "LB", "Bonus"].map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(
                  tab.toLowerCase(),
                  setSubTabActive('')
                )}
                style={[
                  styles.tab,
                  activeTab === tab.toLowerCase()
                    ? styles.activeTab
                    : styles.inactiveTab,
                ]}
              >
                <AppText style={styles.tabText}>{tab}</AppText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity style={[styles.subTab, {backgroundColor: subTabActive === "Success" ? "#C7F2C9" : "#F4F4F4"}]} onPress={() => handleFilterTransaction("Success")}>
            <AppText style={{ color: subTabActive === "Success" ? "#309B36" : "#3B3B3B" }}>Success</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.subTab, {backgroundColor: subTabActive === "Pending" ? "#C7F2C9" : "#F4F4F4"}]} onPress={() => handleFilterTransaction('Pending')}>
            <AppText style={{ color: subTabActive === "Pending" ? "#309B36" : "#3B3B3B" }}>Pending</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.subTab, {backgroundColor: subTabActive === "Rejected" ? "#C7F2C9" : "#F4F4F4"}]} onPress={() => handleFilterTransaction('Rejected')}>
            <AppText style={{ color: subTabActive === "Rejected" ? "#309B36" : "#3B3B3B" }}>Rejected</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.subTab, {backgroundColor: subTabActive === "Refund" ? "#C7F2C9" : "#F4F4F4"}]} onPress={() => handleFilterTransaction('Refund')}>
            <AppText style={{ color: subTabActive === "Refund" ? "#309B36" : "#3B3B3B" }}>Refund</AppText>
          </TouchableOpacity>
        </View>
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
              depositTransactions?.length > 0 ? (
                depositTransactions?.map((item) => (
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
                      <View style={{ alignItems: "center" }}>
                        <AppText
                          type={SIXTEEN}
                          weight={INTER_BOLD}
                          color={BLACK}
                        >
                          ₹ {item?.amount}
                        </AppText>
                        <AppText
                          type={FORTEEN}
                          weight={INTER_BOLD}
                          color={GOLDEN}
                        >
                          {item?.withdrawalType}
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
                                  :  item?.paymentType === "Credit"
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
                          ₹ {item?.bonusAmount}
                        </AppText>
                        <AppText
                          type={TEN}
                          weight={INTER_BOLD}
                          color={GOLDEN}
                        >
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
                tdsTransaction?.map((item) => (
                  item?.tdsAmount != 0 ?  <>
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
                        <View style={{flexDirection: "row", gap: 5}}>
                        <AppText type={TWELVE}
                            weight={INTER_SEMI_BOLD} style={{color: "#797979CC"}}>TDS Amount: -</AppText>
                          <AppText type={FIFTEEN}
                            weight={INTER_SEMI_BOLD} color={BLACK}>₹{item?.tdsAmount}</AppText>
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
                      <View style={{flexDirection: "row", gap: 5}}>
                      <AppText type={TWELVE}
                            weight={INTER_SEMI_BOLD} style={{color: "#797979CC"}}>
                        Total Amount: -
                      </AppText>
                      <AppText type={SIXTEEN} weight={INTER_BOLD} color={BLACK}>
                        ₹ {item?.amount}
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
                  </>: ""
                 
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
            ) : ("")}
          </View>
        </ScrollView>
      </View>
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
