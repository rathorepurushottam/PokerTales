import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ProfileHeader from "../common/ProfileHeader";
import { useDispatch, useSelector } from "react-redux";
import { Primary, universalPaddingHorizontal } from "../theme/dimens";
import Input from "../common/Input";
import { colors } from "../theme/color";
import {
  getAvatarList,
  getKycDetails,
  getProfile,
  getUserProfile,
  upateProfile,
  upateUserEmail,
  upateUserName,
} from "../actions/profileAction";
import { useEffect, useRef, useState } from "react";
import {
  AppText,
  BLACK,
  BROWNYELLOW,
  FORTEEN,
  INTER_BOLD,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  RED,
  TEN,
  TWELVE,
} from "../common/AppText";
import moment from "moment";
import FastImage from "react-native-fast-image";
import { calendraIcon } from "../helper/image";
import PrimaryButton from "../common/PrimaryButton";
import PanNumber from "../common/PanNumber";
import RBSheet from "react-native-raw-bottom-sheet";
import PhoneNumber from "../common/PhoneNumber";
import LoginOTP from "../common/LoginOTP";
import { SpinnerSecond } from "../common/SnipperSecond";
import EmailOTP from "../common/EmailOTP";
import ResetPassword from "../common/ResetPassword";
import ProfileOTP from "../common/ProfileOTP";
import UserAvatar from "../common/UserAvatar";
import CustomModal from "../common/CustomModal";

const EditProfile = () => {
  const refRBSheetPhoneNumber = useRef();
  const refRBSheetOTP = useRef();
  const refRBSheetProfileOTP = useRef();
  const refRBSheetEmailOTP = useRef();
  const refRBSheetPassword = useRef();
  const refRBSheetAvatar = useRef();
  const dispatch = useDispatch();
  const userData = useSelector((state) => {
    return state.profile.userData;
  });

  const loading = useSelector((state) => {
    return state.auth.isLoading;
  });

  const kycDetails = useSelector((state) => {
    return state.profile.kycDetails;
  });

  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState(userData?.userName);
  const [userNError, setUserNError] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(
    kycDetails?.aadharKyc?.dob ? kycDetails?.aadharKyc?.dob : "DD/MM/YY"
  );
  const [otp, setOtp] = useState("");
  const [userEmail, setUserEmail] = useState(
    userData?.emailId ? userData?.emailId : ""
  );
  const [fullName, setFullName] = useState(
    kycDetails?.aadharKyc?.nameOnAadhar
      ? kycDetails?.aadharKyc?.nameOnAadhar
      : ""
  );
  const [userAddress, setUserAddress] = useState(
    kycDetails?.aadharKyc?.aadharAddress
      ? kycDetails?.aadharKyc?.aadharAddress
      : ""
  );
  const [resetPasswords, setResetPasswords] = useState("");
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedAvatar, setSelectesAvatar] = useState(
    userData?.avatar ? userData?.avatar : ""
  );

  useEffect(() => {
    let isNavigate = true;
    dispatch(getKycDetails());
    dispatch(getUserProfile(isNavigate));
  }, []);

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };
  const showDatePicker = () => {
    if (kycDetails?.aadharKyc?.dob ? false : true) {
      setIsDatePickerVisible(true);
    }
  };
  const handleConfirm = (date) => {
    setDateOfBirth(moment(date).format("DD-MM-YYYY").toString());
    hideDatePicker();
  };

  const handleUpdateUserName = () => {
    if (/\s/.test(userName)) {
      setUserNError('Username cannot contain spaces.');
      return;
    };
    let name = userName?.trim();
    let data = {
      userName: name,
    };

    dispatch(upateUserName(data, setUserNError));
  };

  const handleUpdateEmail = () => {
    let data = {
      emailId: userEmail,
       mailType: "otp"

    };

    dispatch(upateUserEmail(data, handleOpenEmailOtp));
  };

  const handleClosePhoneNumber = () => {
    refRBSheetPhoneNumber.current.close();
    refRBSheetOTP.current.open();
  };

  const handleOpenEmailOtp = () => {
    refRBSheetEmailOTP.current.open();
  };

  const handleCloseOtp = () => {
    refRBSheetOTP.current.close();
  };

  const handleCloseProfileOtp = () => {
    refRBSheetProfileOTP.current.close();
  };

  const handleCloseEmailOtp = () => {
    refRBSheetEmailOTP.current.close();
  };

  const handleCloseResetPass = () => {
    refRBSheetPassword.current.close();
    refRBSheetProfileOTP.current.open();
    // refRBSheetEmailOTP.current.open();
  };

  const handleOpenAvatar = () => {
    dispatch(getAvatarList());
    refRBSheetAvatar.current.open();
  };
  const handleCloseAvatar = () => {
    refRBSheetAvatar.current.close();
  };

  const handleFormatMobileN = (phoneNumber) => {
    const formattedNumber = phoneNumber.replace(/(\+91)(\d{3})(\d{3})(\d{4})/, "$1 $2 $3 $4");
    return formattedNumber
  }

  console.log(isOpen, "isOpen");
  return (
    <AppSafeAreaView>
      <ProfileHeader title={"Profile"} onOpenAvatar={handleOpenAvatar} />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            paddingHorizontal: universalPaddingHorizontal,
          }}
        >
          <Input
            // placeholder={"Email or Phone"}
            top
            placeholderTextColor={"#00000066"}
            textInputStyle={{
              borderWidth: 1,
              borderColor: "#F4DAA8",
              borderRadius: 12,
              backgroundColor:
                userData?.userNameChangeCount < 1 ? "#FAF9F1" : "#D3D3D3",
              height: 55,
              // fontWeight: "bold",
              // textTransform: "uppercase"
            }}
            textInputBox={{fontWeight: "bold", lineHeight: 27, fontFamily: 'Inter'}}
            userName
            maxLength={15}
            // keyboardType="numeric"
            // onFocus={() => setSignFocus(true)}
            // onBlur={() => setSignFocus(false)}
            onChange={(text) => {
              setUserName(text?.trim());
            }}
            // style={{backgroundColor: userData?.userNameChangeCount > 1 && colors.gray}}
            editable={userData?.userNameChangeCount < 1 ? true : false}
            cursorColor={colors.black}
            userNameChangeCount={userData?.userNameChangeCount}
            onUserName={handleUpdateUserName}
            autoCapitalize={"words"}
            value={userName}
            label={"USERNAME"}
            labelStyle={{ color: colors.darkBlue, fontSize: 12 }}
          />
          {userNError && (
            <AppText color={RED} style={{ marginTop: 10 }}>
              {userNError}
            </AppText>
          )}

          <TouchableOpacity
            onPress={() => refRBSheetPhoneNumber.current.open()}
          >
            <Input
              // placeholder={"Email or Phone"}
              top
              placeholderTextColor={"#00000066"}
              textInputStyle={{
                borderWidth: 1,
                borderColor: "#F4DAA8",
                borderRadius: 12,
                backgroundColor: "#FAF9F1",
                height: 55,
                fontWeight: 700,
                // textTransform: "uppercase"
              }}
              textInputBox={{fontWeight: "bold", lineHeight: 27, fontFamily: 'Inter'}}
              editable={false}
              phoneNumber
              style={{ marginTop: 10 }}
              // maxLength={10}
              // keyboardType="numeric"
              // onFocus={() => setSignFocus(true)}
              // onBlur={() => setSignFocus(false)}
              // onChange={(text) => {
              //   setSignId(text);
              // }}
              // autoCapitalize={"words"}
              value={handleFormatMobileN(`+91${userData?.mobileNumber}`)}
              label={"PHONE NUMBER"}
              labelStyle={{ color: colors.darkBlue }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#E7D5AE",
            marginTop: 30,
            opacity: 0.3,
          }}
        ></View>
        <View
          style={{
            paddingHorizontal: universalPaddingHorizontal,
          }}
        >
          <Input
            placeholder={"Add Email ID"}
            top
            placeholderTextColor={"#00000066"}
            textInputStyle={{
              borderWidth: 1,
              borderColor: "#F4DAA8",
              borderRadius: 12,
              //   backgroundColor: "#FAF9F1",
              height: 55,
              // textTransform: "uppercase"
            }}
            email
            textInputBox={{fontWeight: "bold", lineHeight: 27, fontFamily: 'Inter'}}
            onEmail={handleUpdateEmail}
            style={{ marginTop: 5 }}
            // maxLength={20}
            // keyboardType="numeric"
            // onFocus={() => setSignFocus(true)}
            // onBlur={() => setSignFocus(false)}
            onChange={(text) => {
              setUserEmail(text);
            }}
            autoCapitalize={"words"}
            value={userEmail}
            label={"Email Id"}
            labelStyle={{ color: colors.darkBlue }}
            cursorColor={colors.black}
          />
          <Input
            placeholder={"Add Full Name"}
            top
            placeholderTextColor={"#00000066"}
            textInputStyle={{
              borderWidth: 1,
              borderColor: "#F4DAA8",
              borderRadius: 12,
              backgroundColor: fullName && "#D3D3D3",
              height: 55,
              // textTransform: "uppercase"
            }}
            textInputBox={{fontWeight: "bold", lineHeight: 27, fontFamily: 'Inter'}}
            style={{ marginTop: 10 }}
            // maxLength={10}
            // keyboardType="numeric"
            // onFocus={() => setSignFocus(true)}
            // onBlur={() => setSignFocus(false)}
            editable={false}
            onChange={(text) => {
              setFullName(text);
            }}
            cursorColor={colors.black}
            // autoCapitalize={"characters"}
            value={fullName}
            label={"Full Name"}
            labelStyle={{ color: colors.darkBlue }}
          />
          <TouchableOpacity onPress={() => refRBSheetPassword.current.open()}>
            <Input
              placeholder={"Set Password"}
              top
              placeholderTextColor={"#00000066"}
              textInputStyle={{
                borderWidth: 1,
                borderColor: "#F4DAA8",
                borderRadius: 12,
                //   backgroundColor: "#FAF9F1",
                height: 55,
                // textTransform: "uppercase"
              }}
              style={{ marginTop: 10 }}
              maxLength={10}
              myPassword
              editable={false}
              cursorColor={colors.black}
              // keyboardType="numeric"
              // onFocus={() => setSignFocus(true)}
              // onBlur={() => setSignFocus(false)}
              // onChange={(text) => {
              //   setSignId(text);
              // }}
              // autoCapitalize={"characters"}
              // value={signId}
              label={"Password"}
              labelStyle={{ color: colors.darkBlue }}
            />
          </TouchableOpacity>
          <TouchableOpacity
          //  onPress={showDatePicker}
          >
            <View style={[styles.InputBoxContainer]}>
              <AppText
                type={FORTEEN}
                weight={INTER_MEDIUM}
                color={BLACK}
                style={[styles.label, { marginTop: 20 }]}
              >
                Date Of Birth
              </AppText>
              <View
                style={[
                  styles.InputBox,
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: dateOfBirth && "#D3D3D3",
                  },
                ]}
              >
                <AppText
                  style={{
                    marginLeft: 15,
                  }}
                  color={BLACK}
                  weight={INTER_MEDIUM}
                  type={FORTEEN}
                >
                  {dateOfBirth}
                </AppText>
                <TouchableOpacity
                  // onPress={() => {
                  //   setIsDatePickerVisible(true);
                  // }}
                  style={{
                    marginLeft: "auto",
                    marginEnd: 10,
                  }}
                >
                  <FastImage
                    style={styles.calandar}
                    source={calendraIcon}
                    tintColor={colors.black}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
          <Input
            placeholder={"Area/Colony/Landmark"}
            top
            placeholderTextColor={"#00000066"}
            textInputStyle={{
              borderWidth: 1,
              borderColor: "#F4DAA8",
              borderRadius: 12,
              backgroundColor: userAddress && "#D3D3D3",
              //   backgroundColor: "#FAF9F1",
              height: 55,
              // textTransform: "uppercase"
            }}
            editable={false}
            style={{ marginBottom: 20 }}
            // maxLength={10}
            // keyboardType="numeric"
            // onFocus={() => setSignFocus(true)}
            // onBlur={() => setSignFocus(false)}
            onChange={(text) => {
              setUserAddress(text);
            }}
            cursorColor={colors.black}
            // autoCapitalize={"characters"}
            value={userAddress}
            label={"Address"}
            labelStyle={{ color: colors.darkBlue }}
          />
          {/* <PrimaryButton
            title={"Submit"}
            buttonStyle={{ marginVertical: 20 }}
            disabled={userData?.emailId ? false : true}
            onPress={handleUpdateProfile}
          /> */}
        </View>
      </ScrollView>
      <RBSheet
        ref={refRBSheetPhoneNumber}
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
        <PhoneNumber
          onClose={handleClosePhoneNumber}
          onMobileNumber={setMobileNumber}
          oldNumber={userData?.mobileNumber}
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
        <LoginOTP
          setOtp={setOtp}
          otp={otp}
          isChange={true}
          phoneNumber={mobileNumber}
          oldNumber={userData?.mobileNumber}
          onCloseOtp={handleCloseOtp}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheetProfileOTP}
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
        <ProfileOTP
          setOtp={setOtp}
          otp={otp}
          phoneNumber={userData?.mobileNumber}
          onCloseOtp={handleCloseProfileOtp}
          resetPasswords={resetPasswords}
          onIsOpen={setIsOpen}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheetEmailOTP}
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
        <EmailOTP
          setOtp={setOtp}
          otp={otp}
          userEmail={userEmail}
          onCloseOtp={handleCloseEmailOtp}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheetPassword}
        closeOnDragDown={true}
        height={480}
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
        <ResetPassword
          onCloseResetPass={handleCloseResetPass}
          signId={userData?.mobileNumber}
          otp={otp}
          isProfile={true}
          setResetPasswords={setResetPasswords}
        />
      </RBSheet>
      <RBSheet
        ref={refRBSheetAvatar}
        closeOnDragDown={true}
        height={400}
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
        <UserAvatar
          onSelectesAvatar={setSelectesAvatar}
          selectedAvatar={selectedAvatar}
          onCloseAvatar={handleCloseAvatar}
        />
      </RBSheet>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={moment().subtract(18, "years").toDate()}
      />
      <SpinnerSecond loading={loading} />
      <CustomModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        desc={"Your password has been successfully changed."}
        title={"Success"}
      />
    </AppSafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  InputBoxContainer: {
    marginBottom: 10,
  },
  calandar: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  label: {
    marginBottom: 10,
  },
  InputBox: {
    backgroundColor: colors.white,
    borderRadius: 6,
    width: "100%",
    color: "white",
    paddingLeft: 10,
    height: Primary.Height,
    borderRadius: 10,
    borderColor: "#F4DAA8",
    borderWidth: 1,
    // paddingHorizontal: 15,
  },
});
