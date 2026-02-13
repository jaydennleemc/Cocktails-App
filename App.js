import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import NetworkChecking from './src/components/NetworkChecking';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <NetworkChecking />
        <AppNavigator />
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
