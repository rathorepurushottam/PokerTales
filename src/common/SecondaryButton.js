import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { AppText, SIXTEEN, INTER_BOLD } from "./AppText";
import { TouchableOpacityView } from "../TouchableOpacityView";
import { colors } from "../theme/color";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";

const SecondaryButton = ({
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
    //   android_ripple={{foreground: true, color: colors.lightGreen}}
      disabled={disabled}
      {...rest}
      style={[styles.linearGradient,buttonStyle]}
      onPress={onPress}
      
    >
        <AppText
          type={type ? type : SIXTEEN}
          weight={weight ? weight : INTER_BOLD}
          style={[styles.buttonText, titleStyle]}
        >
          {title}
        </AppText>
    </Pressable>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
    linearGradient: {
      borderRadius: 10,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: "#CCCCCC"
    },
    linearGradientWrapper: {
      borderRadius: 5,
      padding: 1,
    },
    smallBtn: {
      height: 50,
      width: 100,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
    },
    buttonText:{
      color: colors.black,
      // textTransform:"uppercase"
  
    },
  });
