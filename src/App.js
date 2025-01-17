/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './navigation/Navigator';
import Toast from 'react-native-toast-message';
import {Provider, useDispatch} from 'react-redux';
import store from './libs/configStore';



function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
      <Navigator />
      <Toast />
      </Provider>
    </SafeAreaProvider>
  );
}


export default App;
