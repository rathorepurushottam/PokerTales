import { useEffect, useRef, useState } from "react";
import {
  AppState,
  Keyboard,
  Linking,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import { colors } from "../theme/color";
import Header from "../common/Header";
import {
  AppText,
  BLACK,
  BLUE,
  EIGHT,
  EIGHTEEN,
  ELEVEN,
  FIFTEEN,
  FORTEEN,
  GREEN,
  INTER_BOLD,
  INTER_ITALIC,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  MENUTEXT,
  RED,
  SIXTEEN,
  TEN,
  THIRTEEN,
  TWELVE,
  WHITE,
  WITHDRAWBLUE,
} from "../common/AppText";
import { Screen, universalPaddingHorizontal } from "../theme/dimens";
import InputBox from "../common/InputBox";

import {
  gpayIcon,
  phonepeIcon,
  bhimIcon,
  successfullIcon,
  paytmIcon,
  pendingIcon,
  rejectedIcon,
  backIcon,
  backgroundImage,
  visaIcon,
  masterCardIcon,
  upiIcon,
} from "../helper/image";
import RBSheet from "react-native-raw-bottom-sheet";
import FastImage from "react-native-fast-image";
import PrimaryButton from "../common/PrimaryButton";
import LinearGradient from "react-native-linear-gradient";
import SecondaryButton from "../common/SecondaryButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getDepositOffers,
  getKycDetails,
  getPaymentAuthToken,
  getPaymentInit,
  getPaymentLink,
  getPaymentSandboxState,
  getPaymentState,
  getPaymentType,
  getUserWallet,
  initDepositAmount,
} from "../actions/profileAction";
import moment from "moment";
import CustomModal from "../common/CustomModal";
import PhonePePaymentSDK from "react-native-phonepe-pg";
import NavigationService from "../navigation/NavigationService";
import { TERMS_OF_USE_SCREEN } from "../navigation/routes";
import { BASE_URL } from "../helper/utility";

const AddCash = () => {
  const rbsheetPayLink = useRef();
  const rbsheetPayStatus = useRef();
  const rbsheetOffers = useRef();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [amountFocus, setAmountFocus] = useState(false);
  const [method, setMethod] = useState("");
  const [depositCode, setDepositCode] = useState("");
  const [codeAmount, setCodeAmount] = useState("");
  const [codeAmountFocus, setCodeAmountFocus] = useState(false);
  const [appState, setAppState] = useState(AppState.currentState);
  const [codeApplied, setCodeApplied] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenn, setIsOpenn] = useState(false);
  const [upiApps, setUpiApps] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [depositError, setDepositError] = useState('');

  const paymentLink = useSelector((state) => {
    return state.profile.paymentLink;
  });
  const paymentInit = useSelector((state) => {
    return state.profile.paymentInit;
  });
  const paymentDetails = useSelector((state) => {
    return state.profile.paymentDetails;
  });
  const sanboxLinks = useSelector((state) => {
    return state.profile.sanboxLinks;
  });
  const paymentStatus = useSelector((state) => {
    return state.profile.paymentStatus;
  });
  const paymentType = useSelector((state) => {
    return state.profile.paymentType;
  });
  const paymentSandBoxStatus = useSelector((state) => {
    return state.profile.paymentSandBoxStatus;
  });
  const depositOffers = useSelector((state) => {
    return state.profile.depositOffers;
  });
  let depositType = paymentType?.paymenGateway;
  const data = [
    { id: "1", rupay: "100" },
    { id: "2", rupay: "250" },
    { id: "3", rupay: "500" },
    { id: "4", rupay: "1000" },
  ];
  let tdsamount = parseFloat((parseInt(amount) / 128) * 28).toFixed(2);
  let amounttoadd = amount + (codeAmount && parseInt(codeAmount));

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getPaymentType());
    dispatch(getUserWallet());
    dispatch(getKycDetails());
    setTimeout(() => {
      console.log("Refreshed!");
      setRefreshing(false);
    }, 2000); // Refresh completes after 2 seconds
  };

  useEffect(() => {
    dispatch(getUserWallet());
    dispatch(getPaymentType());
    initPhonePeSDK();
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        rbsheetPayLink?.current?.close();
        depositType === "phonePe"
          ? dispatch(
              getPaymentState(
                paymentDetails?.merchantOrderId,
                handlePaymetStatus
              )
            )
          : dispatch(
              getPaymentSandboxState(paymentInit?.order_id, handlePaymetStatus)
            );

        // setAmount('');
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    // Cleanup the subscription
    return () => {
      subscription.remove();
    };
  }, [appState]);

  const handleAddMoney = () => {
    let pay = parseInt(amount);
    let data = {
      amount: pay,
    };
    getUPIAppsInstalled();
    depositType === "phonePe"
      ? dispatch(getPaymentLink(data, handlePaymetOption, setIsOpenn, setDepositError))
      : dispatch(getPaymentInit(data, handlePaymetOption, setIsOpenn, setDepositError));
  };

  const handlePaymetOption = () => {
    rbsheetPayLink?.current?.open();
  };

  const handlePaymetStatus = () => {
    rbsheetPayStatus?.current?.open();
  };

  let paymentApp = [
    { id: "1", title: "Gpay", image: gpayIcon, link: sanboxLinks?.gpay },
    {
      id: "2",
      title: "Phonepe",
      image: phonepeIcon,
      link: sanboxLinks?.phonepe,
    },
    { id: "3", title: "Bhim", image: bhimIcon, link: sanboxLinks?.bhim },
    { id: "4", title: "Paytm", image: paytmIcon, link: sanboxLinks?.paytm },
  ];

  let paymentPhonepeApp = [
    {
      id: 1,
      packageName: "com.phonepe.simulator",
      icon: phonepeIcon,
      appName: "PhonePe Simulator",
    },
    {
      id: 2,
      packageName: "com.phonepe.app",
      icon: phonepeIcon,
      appName: "PhonePe",
    },
    {
      id: 3,
      packageName: "net.one97.paytm",
      icon: paytmIcon,
      appName: "Paytm",
    },
    {
      id: 4,
      packageName: "com.google.android.apps.nbu.paisa.user",
      icon: gpayIcon,
      appName: "Google Pay",
    },
  ];

  const handlePayLink = (item) => {
    setMethod(item?.title);
    Linking.openURL(item?.link);
  };

  const handleGetDespostOffers = () => {
    let data = {
      type: "deposit",
    };
    dispatch(getDepositOffers(data));
    rbsheetOffers.current.open();
  };

  const handleApplyDepositOffer = (code) => {
    setDepositCode(code?.code);
    setCodeAmount(code?.bonus);
    setCodeApplied(true);
    setIsOpen(true);
    rbsheetOffers.current.close();
  };

  const handleValidateDepostOffer = () => {
    let validate = depositOffers?.filter((value) => value.code === depositCode);
    console.log(validate, "validate");
    if (validate?.length === 1) {
      setCodeAmount(validate[0]?.bonus);
      setCodeApplied(true);
      setIsOpen(true);
      rbsheetOffers.current.close();
    } else {
      setCodeApplied(false);
    }
  };

  // const handleCloseOffers = () => {
  //   rbsheetOffers.current.close();
  // };

  const handleValidAmount = (value) => {
    let pay = parseInt(value);
    setAmount(pay);
    if (pay < 50) {
      setError("Minimum deposit is ₹50");
    } else if (pay > 100000) {
      setError("Maximun deposit ₹ 1Lakh only");
    } else {
      setError("");
    }
  };

  // console.log(paymentDetails, "paymentDetails");

  let environmentDropDownValue = "SANDBOX";
  let merchantId = "POKERTALESUAT";
  let flowId = "POKERTALESUPI";
  // PhonePePaymentSDK.getPackageSignatureForAndroid().then((packageSignture) => {
  //   setPackageSignture(packageSignture);
  // });

  const initPhonePeSDK = () => {
    PhonePePaymentSDK.init(environmentDropDownValue, merchantId, flowId, true)
      .then((result) => {
        console.log("Message: SDK Initialisation ->" + JSON.stringify(result));
      })
      .catch((error) => {
        console.log("error:" + error.message);
      });
  };

  const getUPIAppsInstalled = () => {
    if (Platform.OS == "ios") {
      // getUPIAppsInstalledForiOS();
    } else {
      PhonePePaymentSDK.getUPIAppsInstalled()
        .then((upiApps) => {
          if (upiApps != null) setUpiApps(JSON.stringify(JSON.parse(upiApps)));
          console.log(JSON.stringify(JSON.parse(upiApps)), "upi apps");
        })
        .catch((error) => {
          console.log("error:" + error.message);
        });
    }
  };

  const handlePayUpi = (item) => {
    setMethod(item?.appName);
    // console.log(item, paymentDetails?.data, "upi");
    let requestBody = {
      orderId: paymentDetails?.data?.orderId,
      merchantId: merchantId,
      token: paymentDetails?.data?.token,
      paymentMode: {
        type: "UPI_INTENT",
      },
      targetAppPackageName: item?.packageName,
    };
    const body = JSON.stringify(requestBody);
    console.log(body, "requestBody");
    let appSchema = null;
    // let callbackURL = BASE_URL+"payment/order/"+paymentDetails?.data?.orderId+"/status";
    PhonePePaymentSDK.startTransaction(body, appSchema)
      .then((a) => {
        console.log(JSON.stringify(a), "up");
      })
      .catch((error) => {
        console.log("error:" + error, "last");
      });
  };

  return (
    <AppSafeAreaView statusColor={"#032146"}>
      <Header commonHeader title={"Add Cash"} addCash />
      <ScrollView
        style={styles.bottomContainer}
        contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#032146"]} // Customize the loader color
          />
        }
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient colors={["#FFFEED", "#FEF7E5"]} style={[styles.box]}>
            <AppText color={BLACK} type={TWELVE} weight={INTER_MEDIUM}>
              Enter Amount
            </AppText>
            <View style={{ flexDirection: "row" }}>
              <InputBox
                placeholder="Amount(₹50 - ₹1L)"
                style={{
                  flex: 1,
                  marginTop: 10,
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1,
                  borderColor: error
                    ? colors.lightRed
                    : amountFocus
                    ? "#000000"
                    : "#E4E4E4",
                  borderRadius: 8,
                  height: 60,
                }}
                amount
                maxLength={6}
                textInputBox={styles.textInputBox}
                onSubmit={() => Keyboard.dismiss()}
                onChange={(value) => handleValidAmount(value)}
                closeImage={true}
                onFocus={() => setAmountFocus(true)}
                onBlur={() => setAmountFocus(false)}
                value={amount}
                onPressClose={() => setAmount("")}
                keyboardType={"number-pad"}
                cursorColor={colors.black}
                returnKeyType={"done"}
                placeholderTextColor={colors.disableText}
              />

              {/* <FastImage
                  style={{
                    height: 8,
                    width: 8,
                    alignSelf: 'center',
                    right: 20,
                    top: 4,
                  }}
                  resizeMode="contain"
                  source={cross}
                  tintColor={colors.white}
                /> */}
            </View>
            {error && (
              <AppText type={TWELVE} color={RED} style={{ marginTop: 5 }}>
                {error}
              </AppText>
            )}
            <View style={styles.buttonContainer}>
              {data?.map((item) => {
                return (
                  <TouchableOpacity
                    onPress={() => setAmount(item.rupay)}
                    style={
                      amount === item?.rupay
                        ? styles.rsSelectContainer
                        : styles.rsContainer
                    }
                  >
                    <AppText
                      color={BLACK}
                      weight={INTER_SEMI_BOLD}
                      type={TWELVE}
                      style={styles.rs}
                    >
                      ₹ {item.rupay}
                    </AppText>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* <TouchableOpacity onPress={() => rbsheet?.current?.open()} style={styles.voucherConatiner}>
                <AppText type={TWELVE} color={BLACK}>
                  Apply Voucher
                </AppText>
                <FastImage source={rightArrow} resizeMode='contain' style={{
                  height: 15,
                  width: 15
                }} />
              </TouchableOpacity> */}
          </LinearGradient>
          {amount ? (
            <View
              style={{
                borderWidth: 1,
                borderColor: "#F2F2F2",
                marginVertical: 20,
                borderRadius: 18,
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
                  Deposit Balance
                </AppText>
                <AppText type={TWELVE} color={BLACK}>
                  ₹ {parseFloat(amount)?.toFixed(2)}
                </AppText>
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
                <AppText type={TWELVE} color={BLACK}>
                  GST Applicable @28%
                </AppText>
                <AppText type={TWELVE} color={RED}>
                  {"(-)"} ₹ {parseFloat(tdsamount)?.toFixed(2)}
                </AppText>
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
                <AppText type={TWELVE} color={BLACK}>
                  Instant Bonus
                </AppText>
                <AppText type={TWELVE} color={GREEN}>
                  {"(+)"} ₹ {parseFloat(tdsamount)?.toFixed(2)}
                </AppText>
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
                <AppText type={TWELVE} color={BLACK}>
                  Processing Fee
                </AppText>
                <AppText type={TWELVE} color={GREEN}>
                  FREE
                </AppText>
              </View>
              {codeAmount && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                  }}
                >
                  <AppText type={TWELVE} color={BLACK}>
                    Deposit offer
                  </AppText>
                  <AppText type={TWELVE} color={GREEN}>
                    {"(+)"} ₹ {codeAmount}
                  </AppText>
                </View>
              )}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                  justifyContent: "space-between",
                  backgroundColor: "#DBEFFF",
                  padding: 10,
                  borderBottomLeftRadius: 18,
                  borderBottomRightRadius: 18,
                }}
              >
                <AppText type={TWELVE} color={BLACK}>
                  Total Deposit Balance:
                </AppText>
                <AppText type={EIGHTEEN} color={BLACK}>
                  ₹ {parseFloat(amounttoadd)?.toFixed(2)}
                </AppText>
              </View>
            </View>
          ) : (
            <></>
          )}
          <TouchableOpacity
            style={styles.offerView}
            onPress={handleGetDespostOffers}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: "#309B36",
                  width: 30,
                  height: 30,
                  borderRadius: 90,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <AppText type={FIFTEEN}>%</AppText>
              </View>
              {!codeAmount ? (
                <AppText
                  color={MENUTEXT}
                  type={FORTEEN}
                  weight={INTER_SEMI_BOLD}
                >
                  Offers
                </AppText>
              ) : (
                <>
                  <AppText
                    color={MENUTEXT}
                    type={FORTEEN}
                    weight={INTER_SEMI_BOLD}
                  >
                    You get ₹ {codeAmount} off
                  </AppText>
                  <View
                    style={{
                      borderWidth: 0.5,
                      borderColor: "#309B36",
                      borderRadius: 10,
                      padding: 3,
                      marginLeft: 5,
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <AppText color={GREEN} type={EIGHT} weight={INTER_ITALIC}>
                      Applied
                    </AppText>
                  </View>
                </>
              )}
            </View>
            {!codeAmount ? (
              <AppText
                style={{ color: "#01B9F5" }}
                type={TWELVE}
                weight={INTER_SEMI_BOLD}
              >
                View all
              </AppText>
            ) : (
              <AppText
                color={RED}
                type={FORTEEN}
                weight={INTER_SEMI_BOLD}
                onPress={() => {
                  setDepositCode(""), setCodeAmount("");
                }}
              >
                Remove
              </AppText>
            )}
          </TouchableOpacity>
        </ScrollView>
        <View
          style={{
            paddingHorizontal: universalPaddingHorizontal,
            // marginTop: 50,
            alignItems: "center",
          }}
        >
          <View style={{ width: "120%" }}>
            <AppText
              type={TEN}
              color={MENUTEXT}
              weight={INTER_BOLD}
              style={{ marginBottom: 10 }}
              onPress={() => NavigationService.navigate(TERMS_OF_USE_SCREEN)}
            >
              I accept{" "}
              <AppText
                type={TEN}
                color={RED}
                weight={INTER_BOLD}
                style={{ textDecorationLine: "underline" }}
              >
                Terms & Conditions
              </AppText>{" "}
              and I am above 18 years
            </AppText>
          </View>

          <SecondaryButton
            buttonStyle={{
              backgroundColor:
                (amount < 50 || amount > 100000 || isNaN(amount)) ? colors.disableText : "#01B9F5",
              width: "120%",
              alignSelf: "center",
            }}
            titleStyle={{ color: colors.white }}
            disabled={amount < 50 || amount > 100000 || isNaN(amount)}
            onPress={handleAddMoney}
            title={amount > 0 ? "Add ₹ " + amount : "Add "}
          />
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FastImage
              source={visaIcon}
              resizeMode="center"
              style={{ width: 40, height: 40 }}
            />
            <FastImage
              source={masterCardIcon}
              resizeMode="center"
              style={{ width: 40, height: 40 }}
            />
            <FastImage
              source={bhimIcon}
              resizeMode="center"
              style={{ width: 40, height: 40 }}
            />
            <FastImage
              source={gpayIcon}
              resizeMode="center"
              style={{ width: 26, height: 26 }}
            />
            <FastImage
              source={phonepeIcon}
              resizeMode="center"
              style={{ width: 26, height: 26, borderRadius: 10 }}
            />
            <FastImage
              source={paytmIcon}
              resizeMode="center"
              style={{ width: 26, height: 26 }}
            />
          </View>
        </View>
      </ScrollView>

      <RBSheet
        ref={rbsheetPayLink}
        closeOnDragDown={false}
        openDuration={100}
        height={450}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <View style={styles.bottomRbContainer}>
          <TouchableOpacity style={styles.innerContainer}>
            <AppText type={EIGHTEEN} weight={INTER_SEMI_BOLD} color={BLACK}>
              Choose Payment App
            </AppText>
          </TouchableOpacity>
          <View style={{ paddingHorizontal: 10 }}>
            {depositType !== "phonePe"
              ? paymentApp?.map((item) => {
                  return (
                    <Pressable
                      style={[
                        styles.box,
                        {
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        },
                      ]}
                      onPress={() => handlePayLink(item)}
                    >
                      <AppText
                        type={FORTEEN}
                        color={BLACK}
                        weight={INTER_SEMI_BOLD}
                      >
                        {item?.title}
                      </AppText>
                      <FastImage
                        source={item?.image}
                        resizeMode="contain"
                        style={{ width: 30, height: 30, borderRadius: 10 }}
                      />
                    </Pressable>
                  );
                })
              : paymentPhonepeApp?.map((item) => {
                  const isMatchingPackage = upiApps?.includes(item.packageName);
                  if (isMatchingPackage) {
                    return (
                      <Pressable
                        style={[
                          styles.box,
                          {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          },
                        ]}
                        onPress={() => handlePayUpi(item)}
                      >
                        <AppText
                          type={FORTEEN}
                          color={BLACK}
                          weight={INTER_SEMI_BOLD}
                        >
                          {item?.appName}
                        </AppText>
                        <FastImage
                          source={item?.icon}
                          resizeMode="contain"
                          style={{ width: 30, height: 30, borderRadius: 10 }}
                        />
                      </Pressable>
                    );
                  }
                })}
          </View>
        </View>
      </RBSheet>
      <RBSheet
        ref={rbsheetPayStatus}
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
              source={
                paymentSandBoxStatus?.message === "Payment successfull" ||
                paymentStatus?.transaction?.status === "Confirmed"
                  ? successfullIcon
                  : paymentStatus === "Pending"
                  ? pendingIcon
                  : rejectedIcon
              }
              resizeMode="contain"
              style={{ width: 80, height: 80 }}
            />
            <AppText
              color={BLUE}
              type={EIGHTEEN}
              weight={INTER_SEMI_BOLD}
              style={{ marginTop: 10 }}
            >
              {paymentSandBoxStatus?.message || paymentStatus?.message}
            </AppText>
            {paymentSandBoxStatus?.message !== "Payment successfull" &&
            paymentStatus?.transaction?.status !== "Confirmed" ? (
              <AppText
                color={BLUE}
                style={{ marginTop: 10, marginHorizontal: 20 }}
              >
                If money was detected from your account, kindly contact your
                bank with transaction id.
              </AppText>
            ) : undefined}
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
                Order Id:-
              </AppText>
              <AppText type={TWELVE} color={BLACK}>
                {paymentInit?.order_id || paymentDetails?.data?.orderId}
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
                Deposit Method
              </AppText>
              <AppText type={TWELVE} color={BLACK}>
                {/* {'UPI'} */}
                {method}
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
                {moment(paymentStatus?.transaction?.paymentTime).format("LLL")}
              </AppText>
            </View>
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            {paymentSandBoxStatus?.message === "Payment successfull" ||
            paymentStatus?.transaction?.status === "Confirmed" ? (
              <PrimaryButton
                title={"close"}
                buttonStyle={{
                  width: "50%",
                }}
                titleStyle={{ color: colors.white }}
                onPress={() => rbsheetPayStatus.current.close()}
              />
            ) : (
              <SecondaryButton
                title={"Retry Payment"}
                buttonStyle={{
                  backgroundColor:
                    paymentSandBoxStatus?.message === "Payment pending"
                      ? colors.lightOrange
                      : colors.lightRed,
                  width: "50%",
                }}
                titleStyle={{ color: colors.white }}
                onPress={handleAddMoney}
              />
            )}
          </View>
        </View>
      </RBSheet>
      <RBSheet
        ref={rbsheetOffers}
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
        <View style={{ flex: 1 }}>
          <View style={styles.sheetHeader}>
            <TouchableOpacity onPress={() => rbsheetOffers.current.close()}>
              <FastImage
                source={backIcon}
                resizeMode="contain"
                style={{ width: 15, height: 15, marginLeft: 10 }}
              />
            </TouchableOpacity>

            <AppText
              type={SIXTEEN}
              weight={INTER_MEDIUM}
              style={{ marginLeft: 110 }}
            >
              Deposit Offers
            </AppText>
          </View>
          <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
            <AppText color={MENUTEXT} type={TWELVE} weight={INTER_SEMI_BOLD}>
              Enter Coupon Code
            </AppText>
            <InputBox
              placeholder="Enter code"
              style={{
                marginTop: 10,
                backgroundColor: "#FFFFFF",
                borderWidth: 1,
                borderColor: !codeAmountFocus
                  ? "#E4E4E4"
                  : codeApplied
                  ? "#000000"
                  : "red",
                borderRadius: 8,
                height: 55,
              }}
              onCodeApplied={handleValidateDepostOffer}
              codeApplied={codeApplied}
              // amount
              onFocus={() => setCodeAmountFocus(true)}
              onBlur={() => setCodeAmountFocus(false)}
              offers
              textInputBox={[styles.textInputBox, { marginLeft: 10 }]}
              onChange={(value) => setDepositCode(value)}
              closeImage={true}
              value={depositCode}
              onSubmit={() => Keyboard.dismiss()}
              onPressClose={() => setAmount("")}
              keyboardType={"default"}
              cursorColor={colors.black}
              returnKeyType={"done"}
              placeholderTextColor={colors.disableText}
            />
            {!codeApplied && (
              <AppText color={RED} type={FORTEEN} weight={INTER_SEMI_BOLD}>
                Invalid Code
              </AppText>
            )}
          </View>
          <ScrollView style={{ marginHorizontal: 10, paddingBottom: 10 }}>
            <AppText color={MENUTEXT} type={TWELVE} weight={INTER_SEMI_BOLD}>
              All Deposit Codes
            </AppText>
            {depositOffers?.length > 0 ? (
              depositOffers.map((item) => (
                <View style={styles.codeView}>
                  <View style={{ marginHorizontal: 10 }}>
                    <AppText color={MENUTEXT} type={THIRTEEN}>
                      You will get ₹{item?.bonus} bonus
                    </AppText>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 0.7,
                        borderColor: "#309B36",
                        marginVertical: 5,
                        width: 90,
                        padding: 3,
                        borderRadius: 8,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#309B36",
                          width: 13,
                          height: 13,
                          borderRadius: 90,
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: 5,
                        }}
                      >
                        <AppText type={EIGHT}>%</AppText>
                      </View>

                      <AppText
                        color={MENUTEXT}
                        type={TWELVE}
                        weight={INTER_BOLD}
                      >
                        {item?.code}
                      </AppText>
                    </View>
                  </View>
                  <SecondaryButton
                    buttonStyle={{
                      backgroundColor: "#01B9F5",
                      width: 90,
                      height: 35,
                    }}
                    onPress={() => handleApplyDepositOffer(item)}
                    titleStyle={{ color: colors.white }}
                    title={depositCode === item?.code ? "Applied" : "Apply"}
                  />
                </View>
              ))
            ) : (
              <AppText
                color={MENUTEXT}
                type={TWELVE}
                weight={INTER_SEMI_BOLD}
                style={{ alignSelf: "center" }}
              >
                No Deposit Offers are available
              </AppText>
            )}
          </ScrollView>
        </View>
      </RBSheet>
      <CustomModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Congratulations!"}
        desc={"Deposit code applied"}
      />
      <CustomModal
        isOpen={isOpenn}
        setIsOpen={setIsOpenn}
        isError
        title={"Sorry!"}
        desc={depositError}
      />
    </AppSafeAreaView>
  );
};

export default AddCash;

const styles = StyleSheet.create({
  bottomContainer: {
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    paddingBottom: 15,
  },
  box: {
    borderWidth: 1,
    borderColor: "#ECC883",
    // backgroundColor: colors.bottomBackgroundColor,
    borderRadius: 16,
    marginTop: 20,
    padding: 15,
  },
  textInputBox: {
    // height: 50,
    fontWeight: 700,
    fontSize: 20,
    paddingHorizontal: 5,
    // color: colors.black,
  },
  boxContainer: {
    // marginHorizontal: 10,
    // marginBottom: 20,
  },
  button: {
    marginTop: Screen.Height / 3,
  },
  scan: {
    height: 200,
    width: 200,
    alignSelf: "center",
    marginTop: Screen.Height / 14,
  },
  copy: {
    width: 54,
    height: 48,
    alignSelf: "center",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  code: {
    alignSelf: "center",
  },

  entry: {
    marginTop: 10,
  },
  topContainers: {
    flexDirection: "row",
  },
  horizontalLine: {
    height: 3,
    width: "100%",
    marginHorizontal: 15,
    marginTop: 10,
  },
  bottomBox: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
  phone: {
    height: 18,
    width: 18,
    alignSelf: "center",
    top: 10,
  },
  mobileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  middleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  smallBtn: {
    width: 70,
    height: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    // gap: 5
  },
  rsContainer: {
    justifyContent: "center",
    borderRadius: 8,
    borderColor: "#F4DAA8",
    borderWidth: 1,
    backgroundColor: colors.white,
    width: "24%",
    height: 32,
  },
  rsSelectContainer: {
    width: "24%",
    height: 30,
    justifyContent: "center",
    borderRadius: 8,
    borderColor: "#000000",
    borderWidth: 1,
    backgroundColor: "#DBEFFF",
  },
  rs: {
    textAlign: "center",
    textAlignVertical: "center",
    // width: "100%",
    // height: Platform.OS == "ios" ? 20 : 30,
    // marginTop: Platform.OS == "ios" ? 5 : 0,
  },
  text: {
    color: colors.white,
  },
  voucherConatiner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.gray,
    marginBottom: -10,
  },
  bottomRbContainer: {
    paddingVertical: 10,
  },
  innerContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // borderBottomWidth: 1,
    // borderBottomColor: colors.black,
    // paddingHorizontal: universalPaddingHorizontal,
  },
  buttonApply: {
    backgroundColor: colors.green,
    borderRadius: 8,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  textStyle: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: INTER_SEMI_BOLD,
    flex: 1,
    color: colors.white,
  },
  inputContainer: {
    paddingHorizontal: universalPaddingHorizontal,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.gray,
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginHorizontal: universalPaddingHorizontal,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: colors.lightWhite,
  },
  offerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
    backgroundColor: "#E7FCEB",
    // padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  sheetHeader: {
    backgroundColor: colors.menuText,
    height: 70,
    flexDirection: "row",
    // justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  codeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00000033",
    borderRadius: 9,
    padding: 10,
    marginVertical: 10,
  },
});
