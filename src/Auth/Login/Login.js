import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';

const Login = props => {
  const {navigation} = props;
  navigation.setOptions({
    title: 'SkyJack',
    headerLeft: () => (
      <Icon
        name="menu"
        type="feather"
        containerStyle={styles.leftHeaderIcon}
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    ),
    headerRight: () => (
      <Icon
        name="more-vertical"
        type="feather"
        containerStyle={styles.rightHeaderIcon}
      />
    ),
  });

  return (
    <ScrollView>
      <View style={styles.inputContainer}>
        <Input placeholder="Email/Username/PhoneNumber" />
        <Input placeholder="Password" secureTextEntry />
      </View>
      <View style={styles.buttonContainer}>
        <Button raised title="Login" containerStyle={styles.button} />
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    marginTop: 90,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 30,
  },
  button: {
    width: 125,
    alignSelf: 'center',
  },
  leftHeaderIcon: {margin: 16, alignSelf: 'center'},
  rightHeaderIcon: {margin: 16, alignSelf: 'center'},
});
