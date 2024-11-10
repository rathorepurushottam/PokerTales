import React from "react";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";
import { AppText, SIXTEEN, INTER_BOLD } from "../AppText";
import { TouchableOpacityView } from "../TouchableOpacityView";
import { colors } from "../../theme/color";

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
    <TouchableOpacityView
      activeOpacity={0.1}
      disabled={disabled}
      {...rest}
      style={buttonStyle}
      onPress={onPress}
    >
      <LinearGradient
        colors={
          !disabled
            ? [colors.playerDetailsLinerOne, colors.playerDetailsLinerTwo]
            : ["#00000033", "#00000033"]
        }
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0, y: 0 }}
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
    </TouchableOpacityView>
  );
};

export default PrimaryButton;
