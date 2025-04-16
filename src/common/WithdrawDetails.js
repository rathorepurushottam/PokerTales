import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/color";
import {
  backIcon,
  cashfreePaymentsIcon,
  failedVector,
  inprocessVector,
  phonepeIcon,
  revertedIcon,
  successVector,
} from "../helper/image";
import {
  AppText,
  BLACK,
  FORTEEN,
  INTER_BOLD,
  INTER_LIGHT,
  INTER_MEDIUM,
  INTER_REGULAR,
  INTER_SEMI_BOLD,
  MENUTEXT,
  RED,
  SIXTEEN,
  TWELVE,
  TWENTY,
  TWENTY_FIVE,
} from "./AppText";
import FastImage from "react-native-fast-image";
import moment from "moment";
import { useEffect, useState } from "react";
import Clipboard from "@react-native-clipboard/clipboard";
import { useSelector } from "react-redux";

const WithdrawDetails = ({ title, onClose, details }) => {
  const [copyText, setCopyText] = useState("Copy");
  const [bankDetail, setBankDetail] = useState('')
  
  const userBank = useSelector((state) => {
    return state.profile.userBank;
  });

  useEffect(() =>{
    let bank = userBank.filter((item) => item?.fundAccountId === details?.payoutDetails?.fund_account_id);
    setBankDetail(bank);
  }, [])
  const handleCodeCopy = () => {
    Clipboard.setString(details?._id);
    setCopyText("Copied");
  };

  function maskNumber(number) {
    const str = number?.toString();
    const masked = "*****" + str?.slice(-4);
    return masked;
  };

  console.log(details, "details");
  return (
    <View>
      <View style={styles.sheetHeader}>
        <TouchableOpacity onPress={onClose} style={{ width: "33.33%" }}>
          <FastImage
            source={backIcon}
            resizeMode="contain"
            style={{ width: 20, height: 20 }}
            tintColor={colors.white}
          />
        </TouchableOpacity>
        <View style={{ width: "38.33%", alignItems: "center" }}>
          <AppText
            type={SIXTEEN}
            weight={INTER_MEDIUM}
            // style={{ marginRight: 130 }}
          >
            {title}
          </AppText>
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 25,
            marginVertical: 20,
            padding: 15,
            backgroundColor:
              details?.status === "Pending"
                ? "#0187F524"
                : details?.status === "Completed"
                ? "#E7FCEB": details?.status === "Reverted" ? "#1355B624"
                : "#FCF4F4",
            borderRadius: 19,
          }}
        >
          <View>
            <AppText
              type={TWENTY_FIVE}
              weight={INTER_BOLD}
              style={{
                color:
                  details?.status === "Pending"
                    ? "#0187F5"
                    : details?.status === "Completed"
                    ? "#309B36" : details?.status === "Reverted" ? "#1355B6"
                    : "#CB2E2E",
              }}
            >
              ₹ {details?.amount?.toFixed(2)}
            </AppText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppText type={TWELVE} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
                {details?.status}
              </AppText>
              <View
                style={{
                  backgroundColor: colors.menuText,
                  width: 5,
                  height: 5,
                  borderRadius: 50,
                  marginHorizontal: 5,
                }}
              ></View>
              <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
                {moment(details?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </AppText>
            </View>
          </View>
          {details?.status === "Pending" ? (
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
                      details?.status === "Completed"
                          ? "#C7F2C9":  details?.status === "Reverted" ? "#1355B624" 
                          : "#CB2E2E33",
                    },
                  ]}
                >
                  <FastImage
                    source={
                        details?.status === "Completed"
                        ? successVector
                        : details?.status === "Reverted" ? revertedIcon : failedVector
                    }
                    resizeMode="contain"
                    style={{ width: 15, height: 15 }}
                  />
                </View>
              )}
        </View>
        <View>
          <View style={{ marginHorizontal: 25, marginVertical: 10 }}>
            <AppText type={TWELVE} style={{ color: "#797979" }}>
              To
            </AppText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: details?.gateway === "CashFree" ? 8: 12,
                borderWidth: 1,
                borderColor: "#F2F2F2",
                borderRadius: 13,
                marginVertical: 10,
              }}
            >
              <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={BLACK}>
                {details?.withdrawalType === "Standard" ? details?.bankDetails?.bankName :bankDetail[0]?.bankName}
              </AppText>
              <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={BLACK}>
                {details?.withdrawalType === "Standard" ?maskNumber(details?.bankDetails?.accountNumber) :maskNumber(bankDetail[0]?.accountNumber)}
              </AppText>
              {/* <FastImage
                source={
                  details?.gateway === "CashFree"
                    ? cashfreePaymentsIcon
                    : phonepeIcon
                }
                resizeMode="cover"
                style={{ width: details?.gateway === "CashFree" ? 50 : 35, height: details?.gateway === "CashFree" ? 50 : 35 }}
              /> */}
            </View>
          </View>
          <View style={{ marginHorizontal: 25, marginVertical: 10 }}>
            <AppText type={TWELVE} style={{ color: "#797979" }}>
              Transaction Id
            </AppText>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 15,
                borderWidth: 1,
                borderColor: "#F2F2F2",
                borderRadius: 13,
                marginVertical: 10,
              }}
            >
              <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={BLACK}>
                #{details?._id}
              </AppText>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: "#032146",
                  backgroundColor: "#F5F5F5",
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                }}
                onPress={handleCodeCopy}
              >
                <AppText color={MENUTEXT}>{copyText}</AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {details?.status === "Success" || details?.status === "Confirmed" ? (
          <TouchableOpacity
            style={{
              marginHorizontal: 26,
              borderWidth: 1,
              borderColor: "#032146",
              borderRadius: 13,
              padding: 10,
              alignItems: "center",
            }}
          >
            <AppText type={SIXTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
              Tax Invoice
            </AppText>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 26,
              backgroundColor: "#051F440F",
              padding: 8,
              borderRadius: 10,
              justifyContent: "center",
            }}
          >
            <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
              Sorry!
            </AppText>
            <AppText type={FORTEEN} weight={INTER_REGULAR} color={MENUTEXT}>
              {" "}
              if debited, the amount will refund in 24 hours.
            </AppText>
          </View>
        )}
      </View>
    </View>
  );
};

export default WithdrawDetails;

const styles = StyleSheet.create({
  sheetHeader: {
    backgroundColor: colors.menuText,
    height: 70,
    flexDirection: "row",
    // justifyContent: "center",
    // justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  statusView: {
    padding: 20,
    alignItems: "center",
    borderRadius: 50,
    justifyContent: "center",
  },
});
