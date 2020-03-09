import React, {Fragment} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Login from '../Auth/Login';
import Maps from '../App/Maps';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AuthScreen = () => {
  return (
    <Fragment>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </Fragment>
  );
};

const AppScreen = () => {
  return (
    <Fragment>
      <Stack.Navigator initialRouteName="Maps">
        <Stack.Screen name="Maps" component={Maps} />
      </Stack.Navigator>
    </Fragment>
  );
};

const MainNavigator = () => {
  return (
    <Fragment>
      <Drawer.Navigator initialRouteName="Auth">
        <Drawer.Screen name="Auth" component={AuthScreen} />
        <Drawer.Screen name="App" component={AppScreen} />
      </Drawer.Navigator>
    </Fragment>
  );
};

export default MainNavigator;
