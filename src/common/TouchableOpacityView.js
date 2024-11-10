import React, { ReactNode } from 'react';
import { TouchableOpacity as TouchableOpacityBase, Platform } from 'react-native';
import { TouchableOpacity as TouchableOpacityGesture } from 'react-native-gesture-handler';

const TouchableOpacityView = ({
  children,
  disabled,
  isGesture,
  ...props
}) => {
  const isIos = Platform.OS === 'ios';
  if (isGesture && !isIos) {
    return (
      <TouchableOpacityGesture disabled={disabled} activeOpacity={1} {...props}>
        {children}
      </TouchableOpacityGesture>
    );
  } else {
    return (
      <TouchableOpacityBase disabled={disabled} activeOpacity={1} {...props}>
        {children}
      </TouchableOpacityBase>
    );
  }
};

export { TouchableOpacityView };