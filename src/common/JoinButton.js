import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { AppText, SIXTEEN, INTER_BOLD } from "./AppText";
import { colors } from '../theme/color';
import { Pressable, StyleSheet } from "react-native";

const JoinButton = ({
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
      android_ripple={{foreground: true, color: colors.goldenColor}}
      disabled={disabled}
      {...rest}
      style={buttonStyle}
      onPress={onPress}
      
    >
      <LinearGradient
        colors={
          !disabled
            ? ['#FFD562', '#FFB524']
            : ["grey", "grey"]
        }
        start={{ x: 0, y: 1}}
        end={{ x: 0, y: 1}}
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

export default JoinButton;

const styles = StyleSheet.create({
    linearGradient: {
      borderRadius: 10,
    //   height: 50,
      alignItems: 'center',
      justifyContent: 'center',
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
      color:'black',
      // textTransform:"uppercase"
  
    },
  });
