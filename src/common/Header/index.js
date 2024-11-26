import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {AppText, BLACK, FORTEEN, POPPINS_MEDIUM, SIXTEEN, WHITE} from '../AppText';

import {backIcon} from '../../helper/image';
import styles from './styles';
import NavigationService from '../../navigation/NavigationService';
import {TouchableOpacityView} from '../TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const Header = props => {
  const {commonHeader, title, color, tintColor} = props;

  return (
    <>
      {commonHeader ? (
        <LinearGradient colors={['#000000BD', '#0000005C', '#00000000', "#032146"]} style={[styles.header, props.style]}
        start={{x: 0, y: 0}}
        end={{x:0, y: 0}}>
          <TouchableOpacity
          style={styles.arrowview}
            onPress={() => {
              NavigationService.goBack();
            }}>
            <FastImage
              style={styles.arrowIcon}
              resizeMode="contain"
              source={backIcon}
              // tintColor={tintColor ? tintColor : colors.white}
            />
          </TouchableOpacity>

          <AppText
            color={color ? color : WHITE}
            type={SIXTEEN}
            weight={POPPINS_MEDIUM}
            style={styles.title}>
            {title}
          </AppText>
        </LinearGradient>
      ) : (
        <>
          {/* <TouchableOpacity
            style={styles.bottomContainer}
            onPress={() => {
              NavigationService.goBack();
            }}>
            <FastImage
              style={styles.arrow}
              resizeMode="contain"
              source={arrow}
            />
          </TouchableOpacity>
          <FastImage resizeMode="contain" style={styles.logo} source={logo} /> */}
        </>
      )}
    </>
  );
};

export default Header;