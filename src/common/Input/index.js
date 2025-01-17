import { View, TextInput, StyleSheet } from "react-native";
import React from "react";
import {
  AppText,
  BLACK,
  FORTEEN,
  GREEN,
  INTER_BOLD,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  SIXTEEN,
  TEN,
  TWELVE,
  TWENTY_FIVE,
} from "../AppText";
import FastImage from "react-native-fast-image";
import {
  eye_close,
  eye_open,
  editPhoneIcon,
  verifiedIcon,
  phoneVerifiedIcon,
} from "../../helper/image";
import { TouchableOpacityView } from "../TouchableOpacityView";
import { colors, NewColor } from "../../theme/color";
import { Primary } from "../../theme/dimens";
import SecondaryButton from "../SecondaryButton";

const Input = ({
  secureTextEntry,
  label,
  labelStyle,
  value,
  returnKeyType,
  placeholder,
  textInputBox,
  textInputStyle,
  placeholderTextColor,
  onChange,
  isPassword,
  onToggle,
  closeImage,
  onPressClose,
  style,
  keyboardType,
  maxLength,
  editable,
  top,
  phone,
  onFocus,
  onBlur,
  containerStyle,
  cursorColor,
  autoCapitalize,
  amount,
  userName,
  onUserName,
  phoneNumber,
  email,
  onEmail,
  userNameChangeCount,
  myPassword,
  ...props
}) => {
  return (
    <View style={style}>
      {label && (
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <AppText
            {...props}
            type={FORTEEN}
            weight={INTER_MEDIUM}
            style={[styles.NameLabel, labelStyle]}
          >
            {label}
          </AppText>
          {phoneNumber && (
            <FastImage
              source={editPhoneIcon}
              style={{ width: 50, height: 20, marginLeft: 5 }}
              resizeMode="center"
            />
          )}
        </View>
      )}

      <View style={styles.gradient}>
        <View
          style={[
            {
              // borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "#FFFFFF1A",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: top ? 10 : 0,
              // borderColor: "red"
            },
            containerStyle,
          ]}
        >
          {phone && (
            <View
              style={{
                height: 20,
                width: 40,
                marginLeft: 10,
                flexDirection: "row",
                borderRightWidth: 1,
                borderRightColor: "#FFFFFF26",
              }}
            >
              <AppText type={SIXTEEN}>+91</AppText>
            </View>
          )}
          {amount && (
            <View
              style={{
                height: 20,
                width: 10,
                marginLeft: 40,
              }}
            >
              <AppText type={SIXTEEN} color={BLACK} weight={INTER_BOLD}>
                ₹
              </AppText>
            </View>
          )}

          <TextInput
            {...props}
            placeholder={placeholder}
            allowFontScaling={false}
            placeholderTextColor={
              placeholderTextColor ? placeholderTextColor : "#5E6272"
            }
            style={[styles.textinputstyle, textInputBox, textInputStyle]}
            secureTextEntry={secureTextEntry ? true : false}
            value={value}
            returnKeyType={returnKeyType}
            onChangeText={onChange}
            keyboardType={keyboardType}
            maxLength={maxLength}
            editable={editable}
            onFocus={onFocus}
            onBlur={onBlur}
            cursorColor={cursorColor}
            autoCapitalize={autoCapitalize}
          />
          {isPassword && (
            <TouchableOpacityView
              style={styles.toggleButton}
              onPress={onToggle}
            >
              <FastImage
                source={secureTextEntry ? eye_close : eye_open}
                style={styles.eyeIcon}
                resizeMode="contain"
              />
            </TouchableOpacityView>
          )}
          {(userName && userNameChangeCount < 1) && (
            <SecondaryButton
              title={"Submit"}
              buttonStyle={styles.submitButton}
              titleStyle={{ color: colors.white }}
              weight={INTER_MEDIUM}
              type={TWELVE}
              onPress={onUserName}
            />
          )}
          {phoneNumber && (
            <FastImage
              source={phoneVerifiedIcon}
              style={{ width: 50, height: 25, position: "absolute", right: 20 }}
              resizeMode="contain"
            />
          )}
          {email && (
            <AppText
              style={{ color: "#2D827C", position: "absolute", right: 20 }}
              type={TEN}
              onPress={onEmail}
            >
              VERIFY
            </AppText>
          )}
          {myPassword && (
            <AppText
              style={{ color: "#2D827C", position: "absolute", right: 20 }}
              type={TEN}
              onPress={onEmail}
            >
              SET PASSWORD
            </AppText>
          )}
        </View>
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  textinputstyle: {
    height: Primary.Height,
    borderRadius: 5,
    paddingHorizontal: 30,
    flex: 1,
    color: colors.black,
  },
  gradient: {
    height: Primary.Height,
    borderRadius: 5,
  },

  eyeIcon: {
    height: 20,
    width: 20,
  },
  closeView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: NewColor.linerLightBlueTwinty,
    height: 14,
    width: 14,
    padding: 5,
  },
  toggleButton: {
    position: "absolute",
    right: 0,
    bottom: -2,
    alignItems: "center",
    height: Primary.Height,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  submitButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    alignItems: "center",
    height: 30,
    backgroundColor: "#2D827C",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  NameLabel: {
    marginTop: 10,
  },
});
