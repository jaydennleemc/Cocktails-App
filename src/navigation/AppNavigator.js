import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomePage from '../pages/HomePage';
import SplashPage from '../pages/SplashPage';
import DrinkListPage from '../pages/DrinkListPage';
import DrinkCategoryPage from '../pages/DrinkCategoryPage';
import DrinkDetailPage from '../pages/DrinkDetailPage';
import DrawerMenu from '../components/DrawerMenu';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#000' },
      }}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen
        name="DrinkListPage"
        component={DrinkListPage}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: 'Back',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="DrinkCategoryPage"
        component={DrinkCategoryPage}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: 'Back',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="DrinkDetailPage"
        component={DrinkDetailPage}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: 'Back',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <DrawerMenu {...props} />}
        screenOptions={{
          headerShown: false,
          drawerPosition: 'left',
          drawerStyle: {
            backgroundColor: '#000',
            width: 280,
          },
        }}>
        <Drawer.Screen name="SplashPage" component={SplashPage} />
        <Drawer.Screen name="HomePage" component={HomeStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
