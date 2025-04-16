import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../theme/color";
import {
  backIcon,
  cashfreePaymentsIcon,
  failedVector,
  inprocessVector,
  phonepeIcon,
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
import { useState } from "react";
import Clipboard from "@react-native-clipboard/clipboard";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNFS from "react-native-fs";

const TransactionDetails = ({ title, onClose, details }) => {
  const [copyText, setCopyText] = useState("Copy");
  console.log(details, "details");
  const handleCodeCopy = () => {
    Clipboard.setString(details?._id);
    setCopyText("Copied");
  };

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
        <View style={{ width: "33.33%", alignItems: "center" }}>
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
                : details?.status === "Success" ||
                  details?.status === "Confirmed"
                ? "#E7FCEB"
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
                    : details?.status === "Success" ||
                      details?.status === "Confirmed"
                    ? "#309B36"
                    : "#CB2E2E",
              }}
            >
              ₹ {details?.totalAmount?.toFixed(2)}
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
                      details?.status === "Success" ||
                      details?.status === "Confirmed"
                          ? "#C7F2C9"
                          : "#CB2E2E33",
                    },
                  ]}
                >
                  <FastImage
                    source={
                        details?.status === "Success" || details?.status === "Confirmed"
                        ? successVector
                        : failedVector
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
              From
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
                {details?.gateway}
              </AppText>
              <FastImage
                source={
                  details?.gateway === "CashFree"
                    ? cashfreePaymentsIcon
                    : phonepeIcon
                }
                resizeMode="cover"
                style={{ width: details?.gateway === "CashFree" ? 50 : 35, height: details?.gateway === "CashFree" ? 50 : 35 }}
              />
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
                #{details?.utr}
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

export default TransactionDetails;

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
