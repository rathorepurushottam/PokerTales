import React from "react";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import { AppText, SIXTEEN, INTER_BOLD } from "../AppText";
import { TouchableOpacityView } from "../TouchableOpacityView";
import { colors } from "../../theme/color";
import { Pressable, TouchableOpacity } from "react-native";

const PrimaryButton = ({
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
      android_ripple={{foreground: true, color: colors.lightGreen}}
      disabled={disabled}
      {...rest}
      style={buttonStyle}
      onPress={onPress}
      
    >
      <LinearGradient
        colors={
          !disabled
            ? [colors.playerDetailsLinerTwo, colors.playerDetailsLinerOne]
            : ["grey", "grey"]
        }
        start={{ x: 0, y: 2}}
        end={{ x: 0, y: 0}}
        style={[styles.linearGradient, smallBtn]}
      >
        <AppText
          type={type ? type : SIXTEEN}
          weight={weight ? weight : INTER_BOLD}
          style={[styles.buttonText, titleStyle]}
        >
          {title}
        </AppText>
      </LinearGradient>
    </Pressable>
  );
};

export default PrimaryButton;
