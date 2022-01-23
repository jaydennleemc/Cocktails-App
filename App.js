import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import NetworkChecking from './src/components/NetworkChecking';
import HomePage from './src/pages/HomePage';
import SplashPage from './src/pages/SplashPage';
import DrinkListPage from './src/pages/DrinkListPage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DrinkDetailPage from './src/pages/DrinkDetailPage';

const backImage = () => {
  return (
    <TouchableOpacity onPress={() => Actions.pop()} style={{ marginLeft: 16 }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  );
};
export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NetworkChecking />
        <Router
          duration={0}
          sceneStyle={styles.scene}
          navigationBarStyle={styles.navigationBarStyle}
          renderBackButton={() => backImage()}
          titleStyle={styles.titleStyle}>
          <Stack key="root" hideNavBar>
            <Scene key={'SplashPage'} component={SplashPage} initial />
            <Scene key={'HomePage'} component={HomePage} />
            <Scene key={'DrinkListPage'} component={DrinkListPage} hideNavBar={false} back />
            <Scene key={'DrinkDetailPage'} component={DrinkDetailPage} hideNavBar={false} back />
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
  navigationBarStyle: {
    backgroundColor: '#000',
    shadowColor: 'transparent',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
  titleStyle: {
    color: 'white',
  },
});
