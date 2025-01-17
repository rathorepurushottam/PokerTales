import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { AppText, SIXTEEN, INTER_BOLD, TWELVE } from "./AppText";
import { colors } from "../theme/color";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { backIcon } from "../helper/image";

const OptInButton = ({
  title,
  buttonStyle,
  onPress,
  smallBtn,
  titleStyle,
  type,
  weight,
  disabled,
  ...rest
}) => {
  return (
    <Pressable
      // activeOpacity={0.1}
      android_ripple={{foreground: true, color: "#1355B6"}}
      disabled={disabled}
      {...rest}
      style={buttonStyle}
      onPress={onPress}
      
    >
      <LinearGradient
        colors={
          !disabled
            ? ['#1355B6', '#08305E']
            : ["grey", "grey"]
        }
        start={{ x: 0, y: 0}}
        end={{ x: 0, y: 1}}
        style={[styles.linearGradient, smallBtn]}
      >
        <AppText
          type={TWELVE}
          weight={INTER_BOLD}
          style={[styles.buttonText, titleStyle]}
        >
          {title}
        </AppText>
        <FastImage source={backIcon} resizeMode="contain" style={{width: 20, height: 14, transform: [{ rotate: "270deg" }]}} />
      </LinearGradient>
    </Pressable>
  );
};

export default OptInButton;

const styles = StyleSheet.create({
    linearGradient: {
      borderRadius: 10,
      height: 30,
      alignItems: 'center',
      justifyContent: "center",
      flexDirection: "row"
    },
    linearGradientWrapper: {
      borderRadius: 5,
      padding: 1,
    },
    buttonText:{
      color:'white',
      marginRight: 4
    },
  });
