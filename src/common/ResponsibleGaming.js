import { Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  AppText,
  BLACK,
  FORTEEN,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  MENUTEXT,
  RED,
  SIXTEEN,
  THIRTEEN,
  TWELVE,
} from "./AppText";
import { colors } from "../theme/color";
import LinearGradient from "react-native-linear-gradient";
import { useEffect, useState } from "react";
import InputBox from "./InputBox";
import PrimaryButton from "./PrimaryButton";
import RadioButton from "./RadioButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getRemainingCashLimit,
  updateRemainingCashLimit,
  updateTimeLimit,
} from "../actions/profileAction";
import { toastAlert } from "../helper/utility";
import FastImage from "react-native-fast-image";
import { backIcon } from "../helper/image";

const ResponsibleGaming = ({ setDesc, setIsOpen, onCloseGaming }) => {
  const dispatch = useDispatch();
  const remainingCashLimit = useSelector((state) => {
    return state.profile.remainingCashLimit;
  });
  const [activeTab, setActiveTab] = useState("cash");
  const [depositAmount, setDepositAmount] = useState(0);
  const [depositCount, setDepositCount] = useState(0);
  const [timeLimit, setTimeLimit] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(getRemainingCashLimit());
  }, []);

  const handleDespostLimit = () => {
    if (depositAmount <= 0) {
      setError("Please enter correct Deposit Limit");
      return;
    }
    if (depositCount <= 0) {
      setError("Please enter correct Deposit Count");
      return;
    }
    let amount = parseInt(depositAmount);
    let count = parseInt(depositCount);
    let data = {
      depositBreak: true,
      depositAmountLimit: amount,
      depositNoLimit: count,
    };
    dispatch(updateRemainingCashLimit(data, setDesc, setIsOpen, onCloseGaming, setError));
  };

  const handleTimeLimit = () => {
    let data = {
      screenTimeLimit: timeLimit,
      screenTimeBreak: true,
    };
    dispatch(updateTimeLimit(data, setDesc, setIsOpen, onCloseGaming), setError);
  };

  // console.log(remainingCashLimit, "remainingCashLimit");
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.sheetHeader}>
        <TouchableOpacity onPress={onCloseGaming}>
          <FastImage
            source={backIcon}
            resizeMode="contain"
            style={{ width: 15, height: 15, marginRight: 10 }}
          />
        </TouchableOpacity>

        <AppText
          type={SIXTEEN}
          weight={INTER_MEDIUM}
          style={{ marginLeft: 80 }}
        >
          Responsible Gaming
        </AppText>
      </View>
      <View style={styles.bannerView}>
        <AppText style={{ color: "#FFFFFF1A" }}>BANNER HERE</AppText>
      </View>
      <View style={styles.tabSwitch}>
        <TouchableOpacity
          style={activeTab === "cash" ? styles.selectTab : styles.unSelectedTab}
          onPress={() => setActiveTab("cash")}
        >
          <AppText color={MENUTEXT} weight={INTER_SEMI_BOLD} type={THIRTEEN}>
            Add Cash Limit
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTab === "time" ? styles.selectTab : styles.unSelectedTab}
          onPress={() => setActiveTab("time")}
        >
          <AppText color={MENUTEXT} weight={INTER_SEMI_BOLD} type={THIRTEEN}>
            Daily Time Limit
          </AppText>
        </TouchableOpacity>
      </View>
      {activeTab === "cash" ? (
        <>
          <LinearGradient
            colors={["#FFFEED", "#FEF7E5"]}
            style={styles.cashView}
          >
            <AppText
              color={MENUTEXT}
              weight={INTER_SEMI_BOLD}
              type={THIRTEEN}
              style={{ marginVertical: 15, marginLeft: 30 }}
            >
              Daily Cash Limit
            </AppText>
            <View
              style={{ height: 1, backgroundColor: "#EFD6A3", width: "100%" }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: 20,
                width: "100%",
                // marginHorizontal: 5
              }}
            >
              <View style={{width: "45%"}}>
                <AppText type={TWELVE} color={MENUTEXT}>
                  Deposit Amount Limit
                </AppText>
                <InputBox
                  // placeholder="Enter amount"
                  style={{
                    //   flex: 1,
                    marginTop: 10,
                    backgroundColor: "#FFFFFF",
                    borderWidth: 1,
                    borderColor: "#F4DAA8",
                    borderRadius: 13,
                    height: 48,
                    width: "100%",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                  amount
                  textInputBox={styles.textInputBox}
                  onChange={(value) => setDepositAmount(value)}
                  closeImage={true}
                  value={depositAmount}
                  // onPressClose={() => setAmount("")}
                  keyboardType={"number-pad"}
                  cursorColor={colors.black}
                  returnKeyType={"done"}
                  placeholderTextColor={colors.disableText}
                />
                <AppText type={TWELVE} color={MENUTEXT}>
                  Remaining Limit: {remainingCashLimit?.remainingDepositAmount}
                </AppText>
              </View>
              <View style={{width: "45%"}}>
                <AppText type={TWELVE} color={MENUTEXT}>
                  Deposit Count
                </AppText>
                <InputBox
                  // placeholder="Enter amount"
                  style={{
                    //   flex: 1,
                    marginTop: 10,
                    backgroundColor: "#FFFFFF",
                    borderWidth: 1,
                    borderColor: "#F4DAA8",
                    borderRadius: 13,
                    height: 48,
                    width: "100%",
                    marginBottom: 10,
                    justifyContent: "center",
                  }}
                  // amount
                  textInputBox={styles.textInputBox}
                  onChange={(value) => setDepositCount(value)}
                  closeImage={true}
                  value={depositCount}
                  // onPressClose={() => setAmount("")}
                  keyboardType={"number-pad"}
                  cursorColor={colors.black}
                  returnKeyType={"done"}
                  placeholderTextColor={colors.disableText}
                />
                <AppText type={TWELVE} color={MENUTEXT}>
                  Remaining Count : {remainingCashLimit?.remainingDepositlimit}
                </AppText>
              </View>
            </View>
            {error && (
        <AppText
          type={TWELVE}
          color={RED}
          style={{
            // marginVertical: 5,
            marginTop: 10,
            paddingHorizontal: 10,
            // textAlign: "center",
          }}
          weight={INTER_SEMI_BOLD}
        >
          {error}
        </AppText>
      )}
            <PrimaryButton
              title={"Apply & Save"}
              buttonStyle={{
                width: "50%",
                marginVertical: 20,
                alignSelf: "center",
              }}
              disabled={!depositAmount || !depositCount}
              onPress={handleDespostLimit}
            />
          </LinearGradient>
          <AppText
            type={TWELVE}
            color={MENUTEXT}
            style={{ alignSelf: "center", marginTop: 10 }}
          >
            <AppText weight={INTER_SEMI_BOLD} color={MENUTEXT}>
              Note:{" "}
            </AppText>{" "}
            Add cash limit can be changed after 24hrs.
          </AppText>
        </>
      ) : (
        <>
          <LinearGradient
            colors={["#FFFEED", "#FEF7E5"]}
            style={styles.cashView}
          >
            <AppText
              color={MENUTEXT}
              weight={INTER_SEMI_BOLD}
              type={THIRTEEN}
              style={{ marginVertical: 15, marginLeft: 30 }}
            >
              Daily Cash Limit
            </AppText>
            <View
              style={{ height: 1, backgroundColor: "#EFD6A3", width: "100%" }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "space-evenly",
                marginTop: 20,
                // flex: 1
              }}
            >
              <ScrollView style={styles.timeView}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                  }}
                  onPress={() => setTimeLimit(24)}
                >
                  <AppText color={MENUTEXT} type={THIRTEEN}>
                   24 Hours
                  </AppText>
                  <RadioButton selected={timeLimit === 1} />
                </TouchableOpacity>
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.menuText,
                    width: "100%",
                    opacity: 0.1,
                    marginVertical: 5,
                  }}
                ></View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                  }}
                  onPress={() => setTimeLimit(48)}
                >
                  <AppText color={MENUTEXT} type={THIRTEEN}>
                  48 Hours
                  </AppText>
                  <RadioButton selected={timeLimit === 2} />
                </TouchableOpacity>
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.menuText,
                    width: "100%",
                    opacity: 0.1,
                    marginVertical: 5,
                  }}
                ></View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                  }}
                  onPress={() => setTimeLimit(72)}
                >
                  <AppText color={MENUTEXT} type={THIRTEEN}>
                  72 Hours
                  </AppText>
                  <RadioButton selected={timeLimit === 4} />
                </TouchableOpacity>
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.menuText,
                    width: "100%",
                    opacity: 0.1,
                    marginVertical: 5,
                  }}
                ></View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                  }}
                  onPress={() => setTimeLimit(1)}
                >
                  <AppText color={MENUTEXT} type={THIRTEEN}>
                    1 Week
                  </AppText>
                  <RadioButton selected={timeLimit === 6} />
                </TouchableOpacity>
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.menuText,
                    width: "100%",
                    opacity: 0.1,
                    marginVertical: 5,
                  }}
                ></View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                  }}
                  onPress={() => setTimeLimit(2)}
                >
                  <AppText color={MENUTEXT} type={THIRTEEN}>
                    2 Week
                  </AppText>
                  <RadioButton selected={timeLimit === 6} />
                </TouchableOpacity>
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.menuText,
                    width: "100%",
                    opacity: 0.1,
                    marginVertical: 5,
                  }}
                ></View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,
                    marginBottom: 10
                  }}
                  onPress={() => setTimeLimit(4)}
                >
                  <AppText color={MENUTEXT} type={THIRTEEN}>
                    1 Month
                  </AppText>
                  <RadioButton selected={timeLimit === 4} />
                </TouchableOpacity>
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.menuText,
                    width: "100%",
                    opacity: 0.1,
                    marginVertical: 5,
                  }}
                ></View>
              </ScrollView>
            </View>
            {error && (
        <AppText
          type={TWELVE}
          color={RED}
          style={{
            // marginVertical: 5,
            marginTop: 10,
            paddingHorizontal: 10,
            // textAlign: "center",
          }}
          weight={INTER_SEMI_BOLD}
        >
          {error}
        </AppText>
      )}
            <PrimaryButton
              title={"Apply & Save"}
              buttonStyle={{
                width: "50%",
                marginVertical: 20,
                alignSelf: "center",
              }}
              disabled={!timeLimit}
              onPress={handleTimeLimit}
            />
          </LinearGradient>
          <AppText
            type={TWELVE}
            color={MENUTEXT}
            style={{ alignSelf: "center", marginTop: 10 }}
          >
            <AppText weight={INTER_SEMI_BOLD} color={MENUTEXT}>
              Note:{" "}
            </AppText>{" "}
            Daily Time limit can be changed after 24hrs.
          </AppText>
        </>
      )}
    </View>
  );
};

export default ResponsibleGaming;

const styles = StyleSheet.create({
  sheetHeader: {
    backgroundColor: colors.menuText,
    height: 70,
    flexDirection: "row",
    // justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  bannerView: {
    backgroundColor: colors.bannerBackColor,
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  tabSwitch: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E4E4E4",
    height: "7%",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "75%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 8,
  },
  selectTab: {
    backgroundColor: "#EFD6A3",
    padding: 8,
    borderRadius: 8,
    width: "45%",
    alignItems: "center",
  },
  unSelectedTab: {
    width: "50%",
    alignItems: "center",
  },
  cashView: {
    borderWidth: 1,
    borderColor: "#ECC883",
    borderRadius: 12,
    marginTop: 20,
    marginHorizontal: 12,
  },
  timeView: {
    borderWidth: 1,
    borderColor: "#ECC883",
    borderRadius: 12,
    // marginTop: 3,
    marginHorizontal: 12,
    backgroundColor: "#FFFFFF",
    width: "90%",
    padding: 10,
    height: "70%",
  },
});
