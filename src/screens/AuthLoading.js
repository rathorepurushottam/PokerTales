
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { AppSafeAreaView } from '../common/AppSafeAreaView';
import {request, PERMISSIONS} from 'react-native-permissions';
import { PermissionsAndroid, Platform } from 'react-native';
import NavigationService from '../navigation/NavigationService';
import FastImage from 'react-native-fast-image';
import { splash } from '../helper/image';

import { Screen } from '../theme/dimens';
import { AUTHSTACK } from '../navigation/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getBanStates, getUserProfile } from '../actions/profileAction';
import { SpinnerSecond } from '../common/SnipperSecond';
import { setLocationAcces } from '../slices/authSlice';

const AuthLoading = () => {
      const dispatch = useDispatch();
      const loading = useSelector((state) => {
        return state.auth.isLoading;
    });
    useEffect(() => {
        setTimeout(() => {
            dispatch(getUserProfile());
            dispatch(getBanStates());
        }, 3000);
    }, []);

    useEffect(() => {
        // requestNotificationPermission();
        checkApplicationPermission();
      }, []);
    
      const requestNotificationPermission = async () => {
        const locationAccess = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        dispatch(setLocationAcces(locationAccess));
        console.log(locationAccess, "locationAccess");
        return locationAccess;
      };
    
    
        const checkApplicationPermission = async () => {
          if (Platform.OS === 'android') {
            try {
              const result =
              await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
              );
            } catch (error) {
            }
          }
          requestNotificationPermission();
        };

    return (
        <AppSafeAreaView statusColor={'#00071C'}>
            <FastImage source={splash} resizeMode="cover" style={styles.splashImage}/>
            <SpinnerSecond loading={loading} />
        </AppSafeAreaView>
    );
};

export default AuthLoading;

const styles = StyleSheet.create({
    splashImage: {
        flex: 1,
        Width: Screen.Width,
        Height: Screen.Height
    }
})