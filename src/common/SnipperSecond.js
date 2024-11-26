import React, { useEffect, useRef } from 'react';
import {StyleSheet, View, ActivityIndicator, Modal} from 'react-native';
import LottieView from 'lottie-react-native';

import { Screen } from '../theme/dimens';
import { colors } from '../theme/color';

const SpinnerSecond = ({style, loading}) => {
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120);
  }, []);


  return (
    <>
      {loading ? (
        <Modal style={{flex: 1}} transparent>
        <View style={[styles.spinnerStyle, style]}>
        <LottieView source={require('../../assets/appLoader.json')} autoPlay loop style={{width: "20%", height: "20%"}}/>
        </View>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    
    // backgroundColor: 'red',
    backgroundColor:"rgba(0,0,0,0.1)",
    position: 'absolute',
    // top: 20,
    right: 0,
    left: 0,
    // bottom: 20,
    width: Screen.Width,
    height: Screen.Height,
  },
});

export {SpinnerSecond};
