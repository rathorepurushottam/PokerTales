import React, { createContext, useEffect } from 'react';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AUTHSTACK, AUTH_LOADING_SCREEN, LOGIN } from './routes';
import NavigationService from './NavigationService';
import AuthLoading from '../screens/AuthLoading';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
      <NavigationContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}>
        <RootStackScreen />
      </NavigationContainer>
    );
  };

  export default Navigator;

  const RootStackScreen = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={AUTH_LOADING_SCREEN}
        component={AuthLoading}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={AUTHSTACK}
        component={AuthStack}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name={BOTTOM_NAVIGATION_STACK}
        component={BottomMainTab}
        options={{ headerShown: false }}
      />   */}
    </Stack.Navigator>
  );
  
  const AuthStack = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={LOGIN} component={Login} />

        {/* <Stack.Screen name={HOME_PRIVACY} component={HomePrivacy} /> */}
  
      </Stack.Navigator>
    );
  };