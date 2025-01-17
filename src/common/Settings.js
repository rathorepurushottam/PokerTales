import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  AppText,
  EIGHTEEN,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  MENUTEXT,
  SIXTEEN,
  THIRTEEN,
  TWELVE,
} from "./AppText";
import { colors } from "../theme/color";
import LinearGradient from "react-native-linear-gradient";
import InputBox from "./InputBox";
import PrimaryButton from "./PrimaryButton";
import RadioButton from "./RadioButton";
import { backIcon, soundIcon, notificationSoundIcon, vibrateIcon } from "../helper/image";
import FastImage from "react-native-fast-image";
import ToggleSwitch from "toggle-switch-react-native";
import { useState } from "react";

const Settings = ({ onClose }) => {
    const [isSoundOn, setIsSoundOn] = useState(false);
    const [isVibrateOn, setIsVibrateOn] = useState(false);
    const [isNotificationOn, setIsNotificationOn] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.sheetHeader}>
        <TouchableOpacity onPress={onClose}>
          <FastImage
            source={backIcon}
            resizeMode="contain"
            style={{ width: 15, height: 15, marginLeft: 10 }}
          />
        </TouchableOpacity>

        <AppText
          type={EIGHTEEN}
          weight={INTER_MEDIUM}
          style={{ marginLeft: 120 }}
        >
          Settings
        </AppText>
      </View>
      <View style={{ marginTop: 30 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.iconView}>
              <FastImage
                source={soundIcon}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
                tintColor={colors.menuText}
              />
            </View>
            <AppText
              type={EIGHTEEN}
              weight={INTER_SEMI_BOLD}
              color={MENUTEXT}
              style={{ marginLeft: 20 }}
            >
              Sound
            </AppText>
          </View>

          <ToggleSwitch
            isOn={isSoundOn}
            onColor="green"
            offColor="#CDD2D7"
            size="large"
            onToggle={(isOn) => setIsSoundOn(isOn)}
          />
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: colors.menuText,
            width: "100%",
            opacity: 0.1,
            marginVertical: 15,
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.iconView}>
              <FastImage
                source={vibrateIcon}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
                tintColor={colors.menuText}
              />
            </View>
            <AppText
              type={EIGHTEEN}
              weight={INTER_SEMI_BOLD}
              color={MENUTEXT}
              style={{ marginLeft: 20 }}
            >
              Vibration
            </AppText>
          </View>

          <ToggleSwitch
            isOn={isVibrateOn}
            onColor="green"
            offColor="#CDD2D7"
            size="large"
            onToggle={(isOn) => setIsVibrateOn(isOn)}
          />
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: colors.menuText,
            width: "100%",
            opacity: 0.1,
            marginVertical: 15,
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.iconView}>
              <FastImage
                source={notificationSoundIcon}
                resizeMode="contain"
                style={{ width: 20, height: 20 }}
                tintColor={colors.menuText}
              />
            </View>
            <AppText
              type={EIGHTEEN}
              weight={INTER_SEMI_BOLD}
              color={MENUTEXT}
              style={{ marginLeft: 20 }}
            >
              Notification Sound
            </AppText>
          </View>

          <ToggleSwitch
            isOn={isNotificationOn}
            onColor="green"
            offColor="#CDD2D7"
            size="large"
            onToggle={(isOn) => setIsNotificationOn(isOn)}
          />
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  sheetHeader: {
    backgroundColor: colors.menuText,
    height: 70,
    flexDirection: "row",
    // justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  iconView: {
    backgroundColor: "#F3DD97",
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
