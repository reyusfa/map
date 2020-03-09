import React from 'react';
import {View} from 'react-native';
import {Button, Input} from 'react-native-elements';

const Login = props => {
  const {navigation} = props;
  navigation.setOptions({
    title: 'SkyJack',
  });

  return (
    <View>
      <Input placeholder="Email/Username/PhoneNumber" />
      <Input placeholder="Password" secureTextEntry />
      <Button title="Login" />
    </View>
  );
};

export default Login;
