// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
// import { useDispatch } from 'react-redux';
// import { getUserProfile } from '../actions/profileAction';
import { AppSafeAreaView } from '../common/AppSafeAreaView';
// import { SpinnerSecond } from '../common/SpinnerSecond';
// import { USER_TOKEN_KEY } from '../libs/constants';
import NavigationService from '../navigation/NavigationService';
// import { AUTHSTACK } from '../navigation/routes';
import FastImage from 'react-native-fast-image';
import { splash } from '../helper/image';

import { Screen } from '../theme/dimens';
import { AUTHSTACK } from '../navigation/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../actions/profileAction';
import { SpinnerSecond } from '../common/SnipperSecond';

const AuthLoading = () => {
      const dispatch = useDispatch();
      const loading = useSelector((state) => {
        return state.auth.isLoading;
    });
    useEffect(() => {
        setTimeout(() => {
            dispatch(getUserProfile());
        }, 3000);
    }, []);

    return (
        <AppSafeAreaView>
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