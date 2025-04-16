import {
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import Header from "../common/Header";
import RadioButton from "../common/RadioButton";
import { colors } from "../theme/color";
import {
  AppText,
  BLACK,
  BLUE,
  EIGHTEEN,
  FIFTEEN,
  FORTEEN,
  GOLDEN,
  GREEN,
  INTER_BOLD,
  INTER_MEDIUM,
  INTER_REGULAR,
  INTER_SEMI_BOLD,
  MENUTEXT,
  RED,
  SIXTEEN,
  TEN,
  TWELVE,
  WITHDRAWBLUE,
} from "../common/AppText";
import FastImage from "react-native-fast-image";
import {
  bankIcon,
  infoIcon,
  instantWithdrawIcon,
  standardWithdrawIcon,
  successfullIcon,
  upiIcon,
} from "../helper/image";
import { useEffect, useRef, useState } from "react";
import InputBox from "../common/InputBox";
import { universalPaddingHorizontal } from "../theme/dimens";
import PrimaryButton from "../common/PrimaryButton";
import RBSheet from "react-native-raw-bottom-sheet";
import AddUPI from "../common/AddUPI";
import BankAccount from "../common/BankAccount";
import { useDispatch, useSelector } from "react-redux";
import {
  getPaymentType,
  getUserPaymentMode,
  userStandardWithdrawal,
  userWithdrawal,
} from "../actions/profileAction";
import Checkbox from "../common/CheckBox";
import { formatNumber, toastAlert } from "../helper/utility";
import NavigationService from "../navigation/NavigationService";
import { TERMS_OF_USE_SCREEN } from "../navigation/routes";
import TaxableWinnings from "../common/TaxableWinnings";
import moment from "moment";

const Withdrawal = () => {
  const dispatch = useDispatch();
  const refRBSheetUPI = useRef();
  const refRBSheetBank = useRef();
  const refRBSheetTaxable = useRef();
  const refRBSheetPayStatus = useRef();
  const [withdrawType, setWithdrawType] = useState("standard");
  const [amount, setAmount] = useState("");
  const [amountFocus, setAmountFocus] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [tdsAmount, setTdsAmount] = useState(0);
  const [baseAmount, setBaseAmount] = useState(0);
  const [charges, setCharges] = useState(0);

  const userData = useSelector((state) => {
    return state.profile.userData;
  });

  const kycDetails = useSelector((state) => {
    return state.profile.kycDetails;
  });

  const paymentType = useSelector((state) => {
    return state.profile.paymentType;
  });

  const userWallet = useSelector((state) => {
    return state.profile.userWallet;
  });

  const userUPI = useSelector((state) => {
    return state.profile.userUPI;
  });

  const userBank = useSelector((state) => {
    return state.profile.userBank;
  });

  const withdrawResponse = useSelector((state) => {
    return state.profile.withdrawResponse;
  });

  const remainingInstantWithdraw = useSelector((state) => {
    return state.profile.remainingInstantWithdraw;
  });

  const tdsPaid = useSelector((state) => {
    return state.profile.tdsPaid;
  });

  const withdrawalFee = useSelector((state) => {
    return state.profile.withdrawalFee;
  });

  useEffect(() => {
    dispatch(getUserPaymentMode());
    dispatch(getPaymentType());
  }, []);

  const handleCloseUPI = () => {
    refRBSheetUPI.current.close();
  };

  const handleCloseBank = () => {
    refRBSheetBank.current.close();
  };

  const handleUserWithdrawal = () => {
    if (!paymentMethod) {
      toastAlert.showToastError("Please select Payment Method");
      return;
    }
    if (withdrawType === "instant") {
      if (remainingInstantWithdraw < 1) {
        setError(
          `You have ${remainingInstantWithdraw} Remaining Instant per day`
        );
        return;
      }
    }
    setError("");

    let data = {
      amount: amount,
      fundAccountId: paymentMethod?.fundAccountId,
      accountType: paymentMethod?.upiId ? "vpa" : "bank_account",
      withdrawalType: withdrawType === "standard" ? "Standard" : "Instant",
    };

    let data2 = {
      amount: amount,
      bankDetails: paymentMethod
    };

    {
      withdrawType === "standard"
        ? dispatch(userStandardWithdrawal(data2, handleShowWithdrawStatus))
        : dispatch(userWithdrawal(data, handleShowWithdrawStatus));
    }
  };

  const handleValidAmount = (value) => {
    console.log(value, "value");
    let pay = parseInt(value ? value : 0);
    setAmount(pay);
    if (pay < 50) {
      setError("Minimum withdrawal is ₹100");
    } else if (pay > 100000) {
      setError("Maximun withdrawal ₹ 100,000");
    } else if (pay > userWallet?.winningAmount) {
      setError("Withdrawal max allowed is " + userWallet?.winningAmount);
    } else {
      setError("");
    }
    handleCalculateTds(pay);
  };

  const handleShowWithdrawStatus = () => {
    refRBSheetPayStatus.current?.open();
  };

  const handleCalculateTds = (pay) => {
    const tdsLess = userWallet.totalWithdrawnAmount - userWallet.totalDepositedBalance;
        const tds = tdsLess > 0 ? paymentType?.tds : 0;
        const finalTds = tds;
        const finalTdsAmount = (tdsLess * (finalTds / 100)) - tdsPaid;
        setTdsAmount(finalTdsAmount);
        let charges = withdrawType === "instant" ? pay * (withdrawalFee / 100) : 0;
        setCharges(charges);
        const netAmount = pay - finalTdsAmount - charges;
        setBaseAmount(netAmount);
        
    // const tdsless =
    //   userWallet?.totalDepositedBalance -
    //   userWallet?.totalWithdrawnAmount +
    //   tdsPaid;
    // let tds;
    // let tdsPaid = 0;
    
    // console.log(pay, "pay");
    console.log(tdsPaid, "tdsPaid");
    // let tdsLess = userWallet.totalDepositedBalance - userWallet.totalWithdrawnAmount;
    // console.log(tdsLess, "tdsLess");
    //     let tds = tdsLess > 0 ? 30 : 0;
    //     console.log(tds, "tds");
    //     const finalTdsAmount = pay * (tds / 100);
    //     console.log(finalTdsAmount, "finalTdsAmount");
    //     const finalTds = pay - finalTdsAmount - tdsPaid;
    //     console.log(finalTds, "finalTds");
    //     setTdsAmount(finalTds)
    //     const baseAmount = (finalTds) - charges;
    // console.log(baseAmount, "baseAmount");
        
    // let charges = withdrawType === "instant" ? pay * (withdrawalFee / 100) : 0;
    // if (pay < tdsLess) {
    //   tds = 0;
    // } else {
    //   tds = 30;
    // }
    // const factor = 1 + tds / 100;
    // const baseAmount = Math.round(pay / factor) - charges;
   
    // const tdsAmount = baseAmount * (tds / 100);
    // setTdsAmount(tdsAmount);
    // setBaseAmount(baseAmount -  finalTdsAmount);
   
  };

  const handleWithdrawType = (type) => {
    setWithdrawType(type);
    setTdsAmount(0);
    setBaseAmount(0);
    setCharges(0);
    setAmount("");
  };

  // console.log(userBank, "userBank");

  return (
    <AppSafeAreaView statusColor={"#032146"}>
      <Header title={"Withdrawal"} commonHeader />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          justifyContent: "space-between",
          paddingBottom: 20,
        }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={[
                withdrawType === "standard"
                  ? styles.radioSelectedView
                  : styles.radioView,
              ]}
              onPress={() => handleWithdrawType("standard")}
            >
              <RadioButton
                selected={withdrawType === "standard"}
                style={{ marginRight: 5 }}
              />
              <AppText
                type={FORTEEN}
                weight={INTER_SEMI_BOLD}
                color={withdrawType === "standard" ? WITHDRAWBLUE : BLACK}
                style={{ marginRight: 5 }}
              >
                Standard Withdrawal
              </AppText>
              <FastImage
                source={standardWithdrawIcon}
                style={{ width: 14, height: 14 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                withdrawType === "instant"
                  ? styles.radioSelectedView
                  : styles.radioView,
              ]}
              onPress={() => handleWithdrawType("instant")}
            >
              <RadioButton
                selected={withdrawType === "instant"}
                style={{ marginRight: 5 }}
              />
              <AppText
                type={FORTEEN}
                weight={INTER_SEMI_BOLD}
                color={withdrawType === "instant" ? WITHDRAWBLUE : BLACK}
                style={{ marginRight: 5 }}
              >
                Instant Withdrawal
              </AppText>
              <FastImage
                source={instantWithdrawIcon}
                style={{ width: 14, height: 14 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          {withdrawType === "standard" ? (
            <View
              style={{
                marginHorizontal: 10,
                marginVertical: 10,
                flexDirection: "row",
              }}
            >
              <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={BLACK}>
                Note:{" "}
              </AppText>
              <AppText type={FORTEEN} weight={INTER_REGULAR} color={BLACK}>
                Standard withdrawal will be processed after
              </AppText>
              <AppText
                type={FORTEEN}
                weight={INTER_MEDIUM}
                style={{ color: "#ECBA16" }}
              >
                {" "}
                24 hrs.
              </AppText>
            </View>
          ) : (
            <View
              style={{
                marginHorizontal: 10,
                marginVertical: 10,
                flexDirection: "row",
              }}
            >
              <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={BLACK}>
                Note:{" "}
              </AppText>
              <AppText type={FORTEEN} weight={INTER_REGULAR} color={BLACK}>
                Remaing Instant withdrawal per day
              </AppText>
              <AppText
                type={FORTEEN}
                weight={INTER_MEDIUM}
                style={{ color: "#ECBA16" }}
              >
                {" "}
                {remainingInstantWithdraw}
              </AppText>
            </View>
          )}
          {/* Remaing Instant withdrawal per day 2 */}

          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 5,
              }}
            >
              <AppText color={BLACK} type={FORTEEN} weight={INTER_SEMI_BOLD}>
                Withdrawal Balance:-
              </AppText>
              <AppText color={BLACK} type={FORTEEN} weight={INTER_SEMI_BOLD}>
                ₹{userWallet?.winningAmount}
              </AppText>
            </View>

            <InputBox
              placeholder="Enter amount (Min ₹100)"
              style={{
                //   flex: 1,
                marginTop: 10,
                backgroundColor: "#F5F5F5",
                borderWidth: 1,
                // borderColor: "#0321461A",
                borderColor: error
                  ? colors.lightRed
                  : amountFocus
                  ? "#000000"
                  : "#0321461A",
                borderRadius: 13,
                height: 60,
                //   width: 20
              }}
              amount
              maxLength={6}
              textInputBox={styles.textInputBox}
              onChange={(value) => handleValidAmount(value)}
              closeImage={true}
              value={amount}
              onFocus={() => setAmountFocus(true)}
              onBlur={() => setAmountFocus(false)}
              onSubmit={() => Keyboard.dismiss()}
              onPressClose={() => setAmount("")}
              keyboardType={"number-pad"}
              cursorColor={colors.black}
              returnKeyType={"done"}
              placeholderTextColor={colors.disableText}
            />
            {error && (
              <AppText type={TWELVE} color={RED} style={{ marginTop: 5 }}>
                {error}
              </AppText>
            )}
            {withdrawType === "standard" && !error && amount && (
              <AppText type={TWELVE} color={RED} style={{ marginTop: 5 }}>
                {
                  "TDS will be calculated based on your ledger at the time of processing"
                }
              </AppText>
            )}
          </View>
          {amount ? (
            <View
              style={{
                borderWidth: 1,
                borderColor: "#F2F2F2",
                marginVertical: 20,
                borderRadius: 18,
                marginHorizontal: 12,
                marginTop: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15,
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => refRBSheetTaxable.current.open()}
                >
                  <AppText type={TWELVE} color={BLACK}>
                    TDS
                  </AppText>
                  <FastImage
                    source={infoIcon}
                    style={{ width: 13, height: 13, marginLeft: 5 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                {withdrawType === "standard" ? (
                  <AppText type={TWELVE} color={RED}>
                    To be calucated
                  </AppText>
                ) : (
                  <AppText type={TWELVE} color={RED}>
                    (-) ₹ {tdsAmount?.toFixed(2)}
                  </AppText>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <AppText type={TWELVE} color={BLACK}>
                    Processing Fee
                  </AppText>
                  <Tooltip
                    isVisible={toolTipVisible}
                    content={
                      <AppText type={TWELVE} color={BLACK}>
                        {withdrawType === "standard"
                          ? "Standard withdrawal Processing fee is free"
                          : `Instanst withdrawal Processing fee is ${withdrawalFee}%`}
                      </AppText>
                    }
                    placement="top"
                    onClose={() => setToolTipVisible(false)}
                  >
                    <TouchableOpacity
                      style={styles.touchable}
                      onPress={() => setToolTipVisible(true)}
                    >
                      <FastImage
                        source={infoIcon}
                        style={{ width: 13, height: 13, marginLeft: 5 }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </Tooltip>
                </View>

                <AppText type={TWELVE} color={GREEN}>
                  {charges === 0 ? "FREE" : charges?.toFixed(2)}
                </AppText>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  justifyContent: "space-between",
                  backgroundColor: "#FEF9E7",
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#ECC883",
                  borderBottomLeftRadius: 18,
                  borderBottomRightRadius: 18,
                }}
              >
                <AppText type={TWELVE} color={BLACK}>
                  Withdrawal Amount:
                </AppText>
                <AppText type={EIGHTEEN} color={BLACK}>
                  ₹ {baseAmount?.toFixed(2)}
                </AppText>
              </View>
            </View>
          ) : (
            <></>
          )}
          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            <AppText
              type={SIXTEEN}
              weight={INTER_SEMI_BOLD}
              color={BLACK}
              style={{ marginVertical: 10 }}
            >
              Payment Methods
            </AppText>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#E4E4E4",
                borderRadius: 13,
              }}
            >
              <View
                style={{
                  flexDirection: "row",

                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    marginLeft: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#F3DD97",
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FastImage
                      source={upiIcon}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                  </View>
                  <AppText
                    type={SIXTEEN}
                    weight={INTER_MEDIUM}
                    color={BLACK}
                    style={{ marginLeft: 12 }}
                  >
                    UPI
                  </AppText>
                </View>

                <AppText
                  type={FIFTEEN}
                  weight={INTER_MEDIUM}
                  style={{ marginRight: 15, color: "#0F65F8" }}
                  onPress={() => refRBSheetUPI.current.open()}
                >
                  Add New
                </AppText>
              </View>
              {userUPI?.length > 0
                ? userUPI.map((item) => (
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopWidth: 1,
                        borderTopColor: "#E4E4E4",
                        padding: 10,
                      }}
                      onPress={() => setPaymentMethod(item)}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <AppText color={BLACK}>{item?.upiId}</AppText>
                        <FastImage
                          source={successfullIcon}
                          resizeMode="contain"
                          style={{ width: 12, height: 12, marginLeft: 5 }}
                        />
                      </View>
                      <View
                        style={[
                          paymentMethod?.upiId === item?.upiId &&
                            styles.selectedMethod,
                        ]}
                      >
                        <RadioButton
                          selected={paymentMethod?.upiId === item?.upiId}
                          style={{ marginRight: 5 }}
                        />
                      </View>
                    </TouchableOpacity>
                  ))
                : ""}
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#E4E4E4",
                borderRadius: 13,
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // marginTop: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    marginLeft: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: "#F3DD97",
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FastImage
                      source={bankIcon}
                      style={{ width: 20, height: 20 }}
                      resizeMode="contain"
                    />
                  </View>
                  <AppText
                    type={SIXTEEN}
                    weight={INTER_MEDIUM}
                    color={BLACK}
                    style={{ marginLeft: 12 }}
                  >
                    Bank Account
                  </AppText>
                </View>

                <AppText
                  type={FIFTEEN}
                  weight={INTER_MEDIUM}
                  style={{ marginRight: 15, color: "#0F65F8" }}
                  onPress={() => refRBSheetBank.current.open()}
                >
                  Add New
                </AppText>
              </View>
              {userBank?.length > 0
                ? userBank.map((item) => (
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopWidth: 1,
                        borderTopColor: "#E4E4E4",
                        padding: 10,
                      }}
                      onPress={() => setPaymentMethod(item)}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <AppText color={BLACK}>{item?.bankName}</AppText>
                        <FastImage
                          source={successfullIcon}
                          resizeMode="contain"
                          style={{ width: 12, height: 12, marginLeft: 5 }}
                        />
                      </View>
                      <View
                        style={[
                          paymentMethod?.bankName === item?.bankName &&
                            styles.selectedMethod,
                        ]}
                      >
                        <RadioButton
                          selected={paymentMethod?.bankName === item?.bankName}
                          style={{ marginRight: 5 }}
                        />
                      </View>
                    </TouchableOpacity>
                  ))
                : ""}
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            paddingHorizontal: universalPaddingHorizontal,
            // marginTop: 80,
            alignItems: "center",
          }}
        >
          <AppText
            color={BLACK}
            type={TEN}
            style={{ marginBottom: 15 }}
            onPress={() => NavigationService.navigate(TERMS_OF_USE_SCREEN)}
          >
            I hereby confirm my understanding of the
            <AppText
              type={TEN}
              style={{ color: "#CC3536", textDecorationLine: "underline" }}
            >
              {" "}
              Withdrawal & TDS policy.
            </AppText>{" "}
          </AppText>

          <PrimaryButton
            title={amount > 0 ? "Withdraw ₹ " + amount : "Withdraw "}
            disabled={
              amount < 100 ||
              amount > 100000 ||
              isNaN(amount) ||
              amount > userWallet?.winningAmount
            }
            // disabled={true}
            buttonStyle={{
              backgroundColor:
                amount < 100 ||
                amount > 100000 ||
                isNaN(amount) ||
                amount > userWallet?.winningAmount
                  ? colors.disableText
                  : "#01B9F5",
              width: "100%",
            }}
            onPress={handleUserWithdrawal}
          />
        </View>
      </View>
      <RBSheet
        ref={refRBSheetUPI}
        closeOnDragDown={true}
        height={350}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <AddUPI
          onClose={handleCloseUPI}
          userName={kycDetails?.panKyc?.nameOnPan}
          mobileNumber={userData?.mobileNumber}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheetBank}
        closeOnDragDown={true}
        height={550}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <BankAccount onCloseBank={handleCloseBank} />
      </RBSheet>
      <RBSheet
        ref={refRBSheetTaxable}
        closeOnDragDown={true}
        height={350}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <TaxableWinnings />
      </RBSheet>
      <RBSheet
        ref={refRBSheetPayStatus}
        closeOnDragDown={false}
        openDuration={100}
        height={500}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopRightRadius: 40,
            borderTopLeftRadius: 40,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <View style={styles.bottomRbContainer}>
          <View style={{ marginVertical: 30, alignItems: "center" }}>
            <FastImage
              source={successfullIcon}
              resizeMode="contain"
              style={{ width: 80, height: 80 }}
            />
            <AppText
              color={BLUE}
              type={EIGHTEEN}
              weight={INTER_SEMI_BOLD}
              style={{ marginTop: 10 }}
            >
              Withdrawal Request Placed
            </AppText>
            <AppText
              color={BLUE}
              type={EIGHTEEN}
              weight={INTER_SEMI_BOLD}
              style={{ marginTop: 10 }}
            >
              ₹{withdrawResponse?.amount}
            </AppText>
            <AppText
              color={BLUE}
              style={{ marginTop: 10, marginHorizontal: 20 }}
            >
              You will receive : - ₹{withdrawResponse?.netAmount}.
            </AppText>
          </View>
          <AppText
            color={BLUE}
            type={FORTEEN}
            weight={INTER_SEMI_BOLD}
            style={{ paddingLeft: 30 }}
          >
            Transaction Details
          </AppText>
          <View
            style={{
              borderWidth: 1,
              borderColor: "#F2F2F2",
              marginVertical: 10,
              borderRadius: 18,
              marginHorizontal: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
            >
              <AppText type={TWELVE} color={BLACK}>
                Payment Method:-
              </AppText>
              <AppText type={TWELVE} color={BLACK}>
                {withdrawResponse?.withdrawalType}
              </AppText>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
            >
              <AppText type={TWELVE} color={BLACK}>
                Reference id
              </AppText>
              <AppText type={TWELVE} color={BLACK}>
                {/* {'UPI'} */}
                {withdrawResponse?.payoutDetails?.reference_id || withdrawResponse?._id}
              </AppText>
              {/* <FastImage
                source={method}
                resizeMode="contain"
                style={{ width: 30, height: 30, borderRadius: 10 }}
              /> */}
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                marginBottom: 10,
              }}
            >
              <AppText type={TWELVE} color={BLACK}>
                Date/Time
              </AppText>
              <AppText type={TWELVE} color={BLACK}>
                {moment(withdrawResponse?.transaction?.paymentTime).format(
                  "LLL"
                )}
              </AppText>
            </View>
          </View>
          {withdrawType === "standard" && (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={BLACK}>
                Note:{" "}
              </AppText>
              <AppText type={FORTEEN} weight={INTER_REGULAR} color={BLACK}>
                Standard withdrawal will be processed after
              </AppText>
              <AppText
                type={FORTEEN}
                weight={INTER_MEDIUM}
                style={{ color: "#ECBA16" }}
              >
                {" "}
                24 hrs.
              </AppText>
            </View>
          )}
        </View>
      </RBSheet>
    </AppSafeAreaView>
  );
};

export default Withdrawal;

const styles = StyleSheet.create({
  radioView: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#F2F2F2",
    borderRadius: 8,
    padding: 10,
    width: "47%",
    // justifyContent: "space-around",
    alignItems: "center",
  },
  radioSelectedView: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#0F65F8",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#DBEFFF",
    width: "47%",
    // justifyContent: "space-around",
    alignItems: "center",
  },
  selectedMethod: {
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: "#0F65F8",
    // borderRadius: 8,
    // padding: 10,
    // backgroundColor: "#DBEFFF",
    // justifyContent: "space-around",
    alignItems: "center",
  },
  textInputBox: {
    // height: 50,
    fontWeight: 700,
    fontSize: 20,
    paddingHorizontal: 5,
    // color: colors.black,
  },
});
