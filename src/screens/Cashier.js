import { useEffect, useRef, useState } from "react";
import {
  AppState,
  ImageBackground,
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
  EIGHTEEN,
  ELEVEN,
  FIFTEEN,
  FORTEEN,
  GREEN,
  INTER_BOLD,
  INTER_MEDIUM,
  INTER_REGULAR,
  INTER_SEMI_BOLD,
  RED,
  SIXTEEN,
  TEN,
  TWELVE,
  WHITE,
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
  walletBalanceIcon,
  transactionIcon,
  backIcon,
  tdsIcon,
  walletBottomIcon,
  transactionImage,
} from "../helper/image";
import RBSheet from "react-native-raw-bottom-sheet";
import FastImage from "react-native-fast-image";
import PrimaryButton from "../common/PrimaryButton";
import LinearGradient from "react-native-linear-gradient";
import SecondaryButton from "../common/SecondaryButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getKycDetails,
  getPaymentState,
  getPaymentType,
  getUserPaymentMode,
  getUserWallet,
  initDepositAmount,
  revertTransaction,
} from "../actions/profileAction";
import moment from "moment";
import ListingItem from "../common/Profile/ListingItem";
import { formatNumber } from "../helper/utility";
import NavigationService from "../navigation/NavigationService";
import { TDS_CERTIFICATE_SCREEN, TRANSACTIONS_SCREEN } from "../navigation/routes";
import { SpinnerSecond } from "../common/SnipperSecond";
import KycOption from "../common/KycOption";
import AadharNumber from "../common/AadharNumber";
import PanDetails from "../common/PanDetails";
import PanNumber from "../common/PanNumber";
import KycDetails from "../common/KycDetails";
import KycOTP from "../common/KycOTP";

const Cashier = () => {
  const dispatch = useDispatch();
  const refRBSheetKyc = useRef();
  const refRBSheetAadharNumber = useRef();
  const refRBSheetAadharDetails = useRef();
  const refRBSheetOTP = useRef();
  const refRBSheetPanNumber = useRef();
  const refRBSheetPanDetails = useRef();
  const [refreshing, setRefreshing] = useState(false);

  const userWallet = useSelector((state) => {
    return state.profile.userWallet;
  });

  const withdrawTransactions = useSelector((state) => {
    return state.profile.withdrawTransactions;
  });

  const kycDetails = useSelector((state) => {
    return state.profile.kycDetails;
  });
  const loading = useSelector((state) => {
    return state.auth.isLoading;
  });
  const [aadharNumber, setAadharNumber] = useState("");
  const [refId, setRefId] = useState("");

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getPaymentType());
    dispatch(getUserWallet());
    dispatch(getKycDetails());
    dispatch(getUserPaymentMode());
    setTimeout(() => {
      console.log("Refreshed!");
      setRefreshing(false);
    }, 2000); // Refresh completes after 2 seconds
  };

  useEffect(() => {
    dispatch(getKycDetails());
  }, []);

  const handleCloseKycOptions = (type) => {
    refRBSheetKyc.current.close();
    if (type === "aadhar") {
      if (kycDetails?.aadharKyc?.aadharStatus === "Approved") {
        toastAlert.showToastError("Aadhar KYC is completed");
      } else {
        refRBSheetAadharNumber.current.open();
      }
    } else {
      if (kycDetails?.panKyc?.panStatus === "Approved") {
        toastAlert.showToastError("Pan KYC is completed");
      } else {
        refRBSheetPanNumber.current.open();
      }
    }
  };

  const handleOpenKycOption = () => {
    refRBSheetKyc?.current?.open();
  };

  const handleKycOtp = () => {
    refRBSheetAadharNumber.current.close();
    refRBSheetOTP.current.open();
  };

  const handleCloseOtp = () => {
    refRBSheetOTP.current.close();
    refRBSheetAadharDetails.current.open();
  };

  const hanldeClosePan = () => {
    refRBSheetPanNumber.current.close();
    refRBSheetPanDetails.current.open();
  };

  const handleCloseAadharDetails = () => {
    refRBSheetAadharDetails.current.close();
  };

  const handleClosePanDetails = () => {
    refRBSheetPanDetails.current.close();
  };

  const handleChangeAddhar = () => {
    refRBSheetAadharDetails.current.close();
    refRBSheetAadharNumber.current.open();
  };

  const handleChangePan = () => {
    refRBSheetPanDetails.current.close();
    refRBSheetPanNumber.current.open();
  };

  const handleRevertTransaction = () => {
    let data = {
      withdrawalId: withdrawTransactions[0]?._id
    };
    dispatch(revertTransaction(data));
  };

  return (
    <AppSafeAreaView statusColor={'#032146'}>
      <Header commonHeader title={"Wallet"} style={{ marginTop: 30 }} />
      <ScrollView style={styles.bottomContainer} contentContainerStyle={{flex: 1, justifyContent: "space-between",}} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#032146']} // Customize the loader color
        />
      }>
        <View>
        <LinearGradient colors={["#FFFEED", "#FEF7E5"]} style={[styles.box]}>
          <ListingItem
            title={"Wallet Balance"}
            // border
            info={`${formatNumber(userWallet?.depositBalance + userWallet?.bonus + userWallet?.winningAmount)}`}
            button
          />
          <ListingItem
            title={"Unplayed Balance"}
            // border
            info={`${formatNumber(userWallet?.depositBalance + userWallet?.bonus)}`}
          />
          <ListingItem
            title={"Winnings"}
            border
            button
            onOpenKycOption={handleOpenKycOption}
            info={`${formatNumber(userWallet?.winningAmount)}`}
          />
        </LinearGradient>
        <View style={{ marginTop: 30, marginHorizontal: 5 }}>
          {(withdrawTransactions?.length > 0 && withdrawTransactions[0]?.status === "Pending" && withdrawTransactions[0]?.withdrawalType === "Standard") ? 
          <ImageBackground source={transactionImage} resizeMode="contain" style={{width: "100%", height: 140, marginVertical: 10}}>
            
            <View style={{padding: 15, justifyContent: "space-between", height: "100%"}}>
              <View style={{flexDirection: "row", justifyContent: "space-between",  alignItems: "center"}}>
              <View>
                 <AppText>Requested to:</AppText>
                 <AppText>{moment(withdrawTransactions[0]?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</AppText>
              </View>
              <View><AppText type={SIXTEEN} weight={INTER_BOLD}>₹{withdrawTransactions[0]?.amount?.toFixed(2)}</AppText></View>
              </View>
              <View style={{alignSelf: "flex-end", width: "35%"}}>
              <SecondaryButton
                title={"Revert"}
                buttonStyle={{
                  backgroundColor:
                     colors.lightOrange,
                  width: "60%",
                  // alignSelf: "right"
                  
                }}
                titleStyle={{ color: colors.black }}
                onPress={handleRevertTransaction}
              />
              </View>
              
             </View>
          </ImageBackground> : ""}
          <TouchableOpacity
            onPress={() => NavigationService.navigate(TRANSACTIONS_SCREEN)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: "#F3DD97",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 20,
                  borderRadius: 20,
                }}
              >
                <FastImage
                  source={transactionIcon}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              </View>
              <AppText type={FIFTEEN} color={BLACK} weight={INTER_REGULAR}>
                My Transactions
              </AppText>
            </View>

            <FastImage
              source={backIcon}
              tintColor={colors.darkBlue}
              style={{
                width: 10,
                height: 10,
                transform: [{ rotate: "180deg" }],
                marginRight: 8,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: "#032146",
              opacity: 0.2,
              marginVertical: 10,
            }}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
            }}
            onPress={() => NavigationService.navigate(TDS_CERTIFICATE_SCREEN)}
          >
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: "#F3DD97",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 20,
                  borderRadius: 20,
                }}
              >
                <FastImage
                  source={tdsIcon}
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                />
              </View>
              <AppText type={FIFTEEN} color={BLACK} weight={INTER_REGULAR}>
                TDS Certificate Download
              </AppText>
            </View>

            <FastImage
              source={backIcon}
              tintColor={colors.darkBlue}
              style={{
                width: 10,
                height: 10,
                transform: [{ rotate: "180deg" }],
                marginRight: 8,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View
            style={{
              height: StyleSheet.hairlineWidth,
              backgroundColor: "#032146",
              opacity: 0.2,
              marginTop: 10,
            }}
          />
        </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <FastImage
            source={walletBottomIcon}
            style={{ width: "70%", height: "30%" }}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
      <RBSheet
        ref={refRBSheetKyc}
        closeOnDragDown={true}
        height={420}
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
        <KycOption
          onCloseKycOptions={handleCloseKycOptions}
          aadharStatus={kycDetails?.aadharKyc?.aadharStatus}
          panStatus={kycDetails?.panKyc?.panStatus}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheetAadharNumber}
        closeOnDragDown={true}
        height={300}
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
        <AadharNumber
          onKycOtp={handleKycOtp}
          setAadharNumber={setAadharNumber}
          setRefId={setRefId}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheetOTP}
        closeOnDragDown={true}
        height={280}
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
        <KycOTP
          aadharNumber={aadharNumber}
          setRefId={setRefId}
          refId={refId}
          onCloseOtp={handleCloseOtp}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheetAadharDetails}
        closeOnDragDown={true}
        height={700}
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
        <KycDetails
          onCloseAadharDetails={handleCloseAadharDetails}
          onChangeAddhar={handleChangeAddhar}
          aadharNumber={aadharNumber}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheetPanNumber}
        closeOnDragDown={true}
        height={300}
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
        <PanNumber onClosePan={hanldeClosePan} />
      </RBSheet>
      <RBSheet
        ref={refRBSheetPanDetails}
        closeOnDragDown={true}
        height={450}
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
        <PanDetails
          onCloseAadharDetails={handleClosePanDetails}
          onChangeAddhar={handleChangePan}
        />
      </RBSheet>
      <SpinnerSecond loading={loading} />
    </AppSafeAreaView>
  );
};

export default Cashier;

const styles = StyleSheet.create({
  bottomContainer: {
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    minHeight: "100%"
  },
  box: {
    borderWidth: 1,
    borderColor: "#ECC883",
    // backgroundColor: colors.bottomBackgroundColor,
    borderRadius: 16,
    marginTop: 20,
    padding: 10,
  },
});
