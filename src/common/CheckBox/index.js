import React from "react";
import { View } from "react-native";
import { TouchableOpacityView } from "../TouchableOpacityView";
import { tick } from "../../helper/image";
import styles from "./styles";
import FastImage from "react-native-fast-image";
import { colors } from "../../theme/color";

const Checkbox = ({
  onPress,
  value,
  disabled,
  type,
  style,
  innerStyle,
  login,
}) => {
  return (
    <TouchableOpacityView
      onPress={onPress}
      underlayColor="transparent"
      disabled={disabled}
      style={{}}
    >
      <View style={[styles.linearGradientWrapper, style]}>
        {value ? (
          <View style={[styles.selectedUIFilter(type, colors), innerStyle]}>
            <FastImage
              source={tick}
              resizeMode={"contain"}
              tintColor={login && colors.white}
              style={[styles.checkboxTick(type, colors)]}
            />
          </View>
        ) : (
          <View style={styles.unchecked(colors)} />
        )}
      </View>
    </TouchableOpacityView>
  );
};

export default Checkbox;
