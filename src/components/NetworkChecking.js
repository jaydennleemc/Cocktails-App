import NetInfo from "@react-native-community/netinfo";
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';

const NetworkChecking = () => {
  useEffect(() => {
    unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Toast.show({
          type: 'danger',
          text1: 'No internet connection',
          text2: 'Please check your internet connection',
          position: 'bottom',
        });
      }
    });

    return () => {
      unsubscribe()
    };
  }, []);


  return (
    <View>
      <Toast />
    </View>
  );
}
export default NetworkChecking;