import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';

export default class SplashPage extends Component {

  componentDidMount() {
    setTimeout(() => {
      Actions.replace('HomePage');
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <FastImage source={require('../assets/images/splash.png')}
          style={styles.splash}
          resizeMode={FastImage.resizeMode.contain} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  splash: {
    width: 200,
    height: 200,
  }
})