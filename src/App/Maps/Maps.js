import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const Maps = props => {
  const {navigation} = props;
  navigation.setOptions({
    headerShown: false,
  });

  return (
    <View>
      <Input placeholder="Location" />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -7.5591225,
          longitude: 110.7837924,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
