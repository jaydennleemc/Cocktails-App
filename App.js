import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import NetworkChecking from './src/components/NetworkChecking';
import HomePage from './src/pages/HomePage';
import SplashPage from './src/pages/SplashPage';
export default class App extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NetworkChecking />
        <Router duration={0} sceneStyle={styles.scene}>
          <Stack key="root" hideNavBar >
            <Scene key={'Splash'} component={SplashPage} initial />
            <Scene key={'Home'} component={HomePage} />
          </Stack>
        </Router>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scene: {
    backgroundColor: '#F5FCFF',
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});