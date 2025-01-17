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
  user,
  backIcon,
  userIcon
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
  FIFTEENTH,
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
import { getKycDetails, getUserProfile, userLogOut } from "../actions/profileAction";
import AadharNumber from "./AadharNumber";
import KycOTP from "./KycOTP";
import PanNumber from "./PanNumber";
import { SpinnerSecond } from "./SnipperSecond";
import KycDetails from "./KycDetails";
import { IMAGE_BASE_URL, toastAlert } from "../helper/utility";
import PanDetails from "./PanDetails";
import Logout from "./Logout";
import { ABOUT_US_SCREEN, EDIT_PROFILE_SCREEN, LEGALITY_SCREEN, PRIVACY_POLICY_SCREEN, SUB_MENU_SCREEN, TERMS_OF_USE_SCREEN } from "../navigation/routes";
import InviteAndEarn from "./InviteAndEarn";
import ResponsibleGaming from "./ResponsibleGaming";
import CustomModal from "./CustomModal";
import Settings from "./Settings";

// import { getUserProfile } from '../actions/profileAction';
// import { IMAGE_BASE_URL } from '../helper/utility';
export const datatwo = [
  {
    id: 1,
    FastImage: kycIcon,
    title: "KYC",
  },
  // {
  //   id: 2,
  //   FastImage: user,
  //   title: "Profile",
  // },
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
    id: 10,
    FastImage: legalityIcon,
    title: "Legality",
  },
  {
    id: 11,
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
  const refRBSheetInvite = useRef();
  const refRBSheetGaming = useRef();
  const refRBSheetSettings = useRef();
  const kycDetails = useSelector((state) => {
    return state.profile.kycDetails;
  });

  const userData = useSelector((state) => {
    return state.profile.userData;
  });

  const loading = useSelector((state) => {
    return state.auth.isLoading;
  });
  const [aadharNumber, setAadharNumber] = useState("");
  const [refId, setRefId] = useState("");
  const [select, setSelect] = useState("");
  const [random, setRandom] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [desc, setDesc] = useState('');
  const onSubmit = (id, title) => {
    setSelect(id);
    if (id == "1") return refRBSheetKyc?.current?.open();
    if (id == "11") return refRBSheetLogOut.current.open();
    // if (id == "2") return NavigationService.navigate(EDIT_PROFILE_SCREEN);
    if (id == "3") return refRBSheetGaming.current.open();
    if (id == "4") return refRBSheetSettings.current.open();
    if (id == "7") return NavigationService.navigate(ABOUT_US_SCREEN);
    if (id == "8") return NavigationService.navigate(PRIVACY_POLICY_SCREEN);
    if (id == "9") return NavigationService.navigate(TERMS_OF_USE_SCREEN);
    if (id == "10") return NavigationService.navigate(LEGALITY_SCREEN);
    if (id == "5") return refRBSheetInvite.current.open();
    NavigationService.navigate(SUB_MENU_SCREEN, {data: title})
  };

  useEffect(() => {
    dispatch(getKycDetails());
  }, []);

  const handleCloseKycOptions = (type) => {
    refRBSheetKyc.current.close();
    if (type === "aadhar") {
      if(kycDetails?.aadharKyc?.aadharStatus === "Approved") {
        toastAlert.showToastError('Aadhar KYC is completed')
      }  else {
        refRBSheetAadharNumber.current.open();
      }
      
    } else {
      if(kycDetails?.panKyc?.panStatus === "Approved") {
        toastAlert.showToastError('Pan KYC is completed')
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

  const handleCloseInvite = () => {
    refRBSheetInvite.current.close();
  };

  const handleCloseGaming = () => {
    refRBSheetGaming.current.close();
  };

  const handleCloseSettings = () => {
    refRBSheetSettings.current.close();
  };

  // console.log(userData, "userData");

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
        <View style={styles.MyProfileBox}>
          <TouchableOpacityView style={styles.imageview}>
            <FastImage
              source={
                userData?.avatar
                  ? { uri: `${IMAGE_BASE_URL}${userData?.avatar}` }
                  : userIcon
              }
              resizeMode="contain"
              style={styles.usericon}
            />
          </TouchableOpacityView>
          <TouchableOpacityView
            style={{
              width: '100%',
              padding: 5,
              marginTop: 50,
              marginLeft: 20 ,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
            onPress={() => {
              NavigationService.navigate(EDIT_PROFILE_SCREEN);
            }}
            >
            <View>
              <AppText type={FIFTEENTH} weight={INTER_SEMI_BOLD} color={WHITE}>
                {userData?.userName}
              </AppText>
              <AppText weight={INTER_MEDIUM} color={WHITE}>
             Profile Information
              </AppText>
            </View>
            <FastImage
              source={backIcon}
              resizeMode="contain"
              style={styles.rightArrow}
              tintColor={colors.white}
            />
              

          </TouchableOpacityView>
      </View>
      <KeyBoardAware>
        <View style={styles.topviewicons}>
          <FlatList
            data={datatwo}
            renderItem={(item) => renderData(item)}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={{ marginTop: 20 }}>
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
      <RBSheet
        ref={refRBSheetInvite}
        closeOnDragDown={true}
        height={720}
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
        <InviteAndEarn code={userData?.referralCode} onCloseInvite={handleCloseInvite}/>
      </RBSheet>
      <RBSheet
        ref={refRBSheetGaming}
        closeOnDragDown={true}
        height={750}
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
        <ResponsibleGaming setDesc={setDesc} setIsOpen={setIsOpen} onCloseGaming={handleCloseGaming}/>
      </RBSheet>
      <RBSheet
        ref={refRBSheetSettings}
        closeOnDragDown={true}
        height={320}
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
        <Settings onClose={handleCloseSettings}/>
      </RBSheet>
      <CustomModal isOpen={isOpen} setIsOpen={setIsOpen} desc={desc} title={'Success'}/>
      <SpinnerSecond loading={loading} />
    </AppSafeAreaView>
  );
};
export default CustomDrawer;

const styles = StyleSheet.create({
  MyProfileBox: {
    // height: 160,
    paddingTop: 10,
    width: '80%',
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between"
  },
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
    transform: [{rotateZ: '180deg'}]
  },
  topviewicons: {
    backgroundColor: "#060E21",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
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
