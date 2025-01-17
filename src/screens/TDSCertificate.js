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
import { getTdsTransactions, getTransactions } from "../actions/profileAction";
import FastImage from "react-native-fast-image";
import { failedVector, inprocessVector, successVector } from "../helper/image";
import moment from "moment";

const TDSCertificate = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("tds");

  const tdsTransaction = useSelector((state) => {
    return state.profile.tdsTransaction;
  });

  const gstTransaction = useSelector((state) => {
    return state.profile.gstTransaction;
  });

  useEffect(() => {
    dispatch(getTdsTransactions());
  }, []);

  console.log(gstTransaction, "gstTransaction");

  return (
    <AppSafeAreaView statusColor={"#032146"}>
      <Header title={"TDS Certificate"} />
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
            onPress={() => setActiveTab("tds")}
            style={activeTab === "tds" ? styles.selectTab : styles.unSelectTab}
          >
            <AppText
              type={TWELVE}
              weight={INTER_SEMI_BOLD}
              style={{ color: "#032146B2" }}
            >
              TDS
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("gst")}
            style={activeTab === "gst" ? styles.selectTab : styles.unSelectTab}
          >
            <AppText
              type={TWELVE}
              weight={INTER_SEMI_BOLD}
              style={{ color: "#032146B2" }}
            >
              GST
            </AppText>
          </TouchableOpacity>
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
          {activeTab === "tds" ? (
            tdsTransaction?.length > 0 ? (
              tdsTransaction?.map((item) => (
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
          ) : activeTab === "gst" ? (
            gstTransaction?.length > 0 ? (
              gstTransaction?.map((item) => (
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
                      <View style={{flexDirection: "row", gap: 5}}>
                      <AppText type={TWELVE}
                          weight={INTER_SEMI_BOLD} style={{color: "#797979CC"}}>Total GST Amount: -</AppText>
                        <AppText type={FIFTEEN}
                          weight={INTER_SEMI_BOLD} color={BLACK}>₹{item?.gstDetails?.totalGstAmount}</AppText>
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
                      ₹ {item?.totalAmount}
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
          ) : (
            ""
          )}
        </View>
      </View>
    </AppSafeAreaView>
  );
};

export default TDSCertificate;

const styles = StyleSheet.create({
  selectTab: {
    backgroundColor: "#DBEFFF",
    borderWidth: 1.5,
    borderColor: "#0F65F8",
    width: "50%",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  unSelectTab: {
    backgroundColor: "#FFFFFF",
    width: "50%",
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
