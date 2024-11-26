import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AppSafeAreaView } from "./AppSafeAreaView";
import { KeyBoardAware } from "./KeyBoardAware";
import FastImage from "react-native-fast-image";
import {
  kycIcon,
  resGamingIcon,
  settingIcon,
  referIcon,
  howToPlayIcon,
  aboutUsIcon,
  privacyIcon,
  termsIcon,
  legalityIcon,
  logoutIcon,
} from "../helper/image";
import { TouchableOpacityView } from "./TouchableOpacityView";
import { NewColor, colors } from "../theme/color";
import {
  AppText,
  BLACK,
  FIFTEEN,
  NORMAL,
  INTER_SEMI_BOLD,
  THIRTEEN,
  TWELVE,
  TWENTY,
  WHITE,
  INTER_MEDIUM,
  FORTEEN,
} from "./AppText";
import Modal from "react-native-modal";
import NavigationService from "../navigation/NavigationService";
// import {
//   DESK_HELP,
//   MYBATTLEREFEREARN,
//   MY_BALANCE,
//   PROFILE_EDIT,
//   WEB_URL,
// } from '../navigation/routes';
// import PrimaryButton from './primaryButton';
import PrimaryButton from "./PrimaryButton";
// import SecondaryButton from '../common/secondaryButton';
import { userLogout } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import { universalPaddingHorizontal } from "../theme/dimens";
import KycOption from "./KycOption";
import { getKycDetails, userLogOut } from "../actions/profileAction";
import AadharNumber from "./AadharNumber";
import KycOTP from "./KycOTP";
import PanNumber from "./PanNumber";
import { SpinnerSecond } from "./SnipperSecond";
import KycDetails from "./KycDetails";
import { toastAlert } from "../helper/utility";
import PanDetails from "./PanDetails";
import Logout from "./Logout";
import { SUB_MENU_SCREEN } from "../navigation/routes";

// import { getUserProfile } from '../actions/profileAction';
// import { IMAGE_BASE_URL } from '../helper/utility';
export const datatwo = [
  {
    id: 1,
    FastImage: kycIcon,
    title: "KYC",
  },
  {
    id: 3,
    FastImage: resGamingIcon,
    title: "Responsible Gaming",
  },
  {
    id: 4,
    FastImage: settingIcon,
    title: "Settings",
  },
  {
    id: 5,
    FastImage: referIcon,
    title: "Refer a friend",
  },
  {
    id: 6,
    FastImage: howToPlayIcon,
    title: "How to play",
  },
  {
    id: 7,
    FastImage: aboutUsIcon,
    title: "About us",
  },
  {
    id: 8,
    FastImage: privacyIcon,
    title: "Privacy policy",
  },
  {
    id: 9,
    FastImage: termsIcon,
    title: "Terms of use",
  },
  {
    id: 9,
    FastImage: legalityIcon,
    title: "Legality",
  },
  {
    id: 10,
    FastImage: logoutIcon,
    title: "Logout",
  },
];

const CustomDrawer = () => {
  const dispatch = useDispatch();
  const refRBSheetKyc = useRef();
  const refRBSheetAadharNumber = useRef();
  const refRBSheetAadharDetails = useRef();
  const refRBSheetOTP = useRef();
  const refRBSheetPanNumber = useRef();
  const refRBSheetPanDetails = useRef();
  const refRBSheetLogOut = useRef();
  const kycDetails = useSelector((state) => {
    return state.profile.kycDetails;
  });
  const loading = useSelector((state) => {
    return state.auth.isLoading;
  });
  const [aadharNumber, setAadharNumber] = useState("");
  const [refId, setRefId] = useState("");
  const [select, setSelect] = useState("");
  const [random, setRandom] = useState(0);
  const [mdlVisibile, setMdlVisible] = useState(false);
  const onSubmit = (id, title) => {
    setSelect(id);
    if (id == "1") return refRBSheetKyc?.current?.open();
    if (id == "10") return refRBSheetLogOut.current.open();
    NavigationService.navigate(SUB_MENU_SCREEN, {data: title})
  };

  useEffect(() => {
    dispatch(getKycDetails());
  }, []);

  console.log(kycDetails, "kycDetails");

  const handleCloseKycOptions = (type) => {
    refRBSheetKyc.current.close();
    if (type === "aadhar") {
      if(kycDetails?.aadharKyc?.aadharStatus === "Approved") {
        toastAlert.showToastError('Aadhar KYC is completed')
      } else if (kycDetails?.aadharKyc?.aadharStatus === "Pending") {
        refRBSheetAadharDetails.current.open();
      } else {
        refRBSheetAadharNumber.current.open();
      }
      
    } else {
      if(kycDetails?.panKyc?.panStatus === "Approved") {
        toastAlert.showToastError('Pan KYC is completed')
      } else if (kycDetails?.panKyc?.panStatus === "Pending") {
        refRBSheetPanDetails.current.open();
      } else {
        refRBSheetPanNumber.current.open();
      }
    }
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

  const handleCloseLogout = () => {
    refRBSheetLogOut.current.close();
  };

  console.log(kycDetails, "kycDetails");

  const renderData = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => onSubmit(item.id, item.title)}
          style={[styles.tabsview]}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={styles.imageicon}>
              <FastImage
                source={item?.FastImage}
                resizeMode="contain"
                style={{ width: 18, height: 18 }}
                tintColor={colors.imageColor}
              />
            </View>
            <AppText type={FORTEEN} weight={INTER_MEDIUM} color={WHITE}>
              {item.title}
            </AppText>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: "#FFFFFF",
            opacity: 0.3,
          }}
        ></View>
      </>
    );
  };

  return (
    <AppSafeAreaView>
      <StatusBar
        backgroundColor={"transparent"}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <KeyBoardAware>
        <View style={styles.topviewicons}>
          <FlatList
            data={datatwo}
            renderItem={(item) => renderData(item)}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{ marginBottom: 50 }}>
            <AppText style={{ color: "#FFFFFFBF", marginLeft: 10 }}>
              Current Version
            </AppText>
            <AppText style={{ color: "#FFFFFFBF", marginLeft: 10 }}>
              320.32.54
            </AppText>
          </View>
        </View>
      </KeyBoardAware>
      <RBSheet
        ref={refRBSheetKyc}
        closeOnDragDown={true}
        height={480}
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
        <KycOption onCloseKycOptions={handleCloseKycOptions} aadharStatus={kycDetails?.aadharKyc?.aadharStatus} panStatus={kycDetails?.panKyc?.panStatus}/>
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
        <KycDetails onCloseAadharDetails={handleCloseAadharDetails} onChangeAddhar={handleChangeAddhar} aadharNumber={aadharNumber}/>
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
        <PanDetails onCloseAadharDetails={handleClosePanDetails} onChangeAddhar={handleChangePan} />
      </RBSheet>
      <RBSheet
        ref={refRBSheetLogOut}
        closeOnDragDown={true}
        height={250}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            paddingHorizontal: universalPaddingHorizontal,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        <Logout onCloseLogout={handleCloseLogout}/>
      </RBSheet>
      <SpinnerSecond loading={loading} />
    </AppSafeAreaView>
  );
};
export default CustomDrawer;

const styles = StyleSheet.create({
  profiletopview: {
    paddingHorizontal: 10,
  },
  imageview: {
    height: 50,
    width: 52,
    marginTop: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  usericon: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  nameview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rightArrow: {
    height: 15,
    width: 20,
  },
  topviewicons: {
    flex: 1,
    backgroundColor: "#060E21",
    // marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    // width: "100%"
    // marginHorizontal: 20,
  },
  tabsview: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  imageicon: {
    height: 31,
    width: 31,
    marginRight: 20,
    // marginTop: -3,
    backgroundColor: colors.imageBackColor,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowicon: {
    height: 15,
    width: 15,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
  modalText: {
    textAlign: "center",
    color: "white",
  },
  modalBox: {
    height: 240,
    width: "100%",
    padding: 30,
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
});
