/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './src/navigation/Navigator';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <SafeAreaProvider>
      <Navigator />
      <Toast />
    </SafeAreaProvider>
  );
}


export default App;
