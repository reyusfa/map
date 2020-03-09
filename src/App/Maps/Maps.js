import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Input, Icon} from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const Maps = props => {
  const {navigation} = props;
  navigation.setOptions({
    headerShown: false,
  });

  return (
    <View style={styles.flex1}>
      <View style={styles.flex1}>
        <View
          style={{
            zIndex: 10,
            position: 'absolute',
            top: 0,
            left: 0,
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#dddddd',
              backgroundColor: 'white',
            }}>
            <Icon
              type="feather"
              name="menu"
              containerStyle={{
                paddingVertical: 16,
                paddingLeft: 16,
              }}
            />
            <Input placeholder="Location" />
          </View>
        </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.flex1}
          initialRegion={{
            latitude: -7.5591225,
            longitude: 110.7837924,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
        <Icon
          containerStyle={{bottom: 120, right: 20, position: 'absolute'}}
          type="material"
          name="my-location"
          reverse
          reverseColor="dodgerblue"
          color="white"
          raised
        />
        <Icon
          containerStyle={{bottom: 50, right: 20, position: 'absolute'}}
          type="material"
          name="directions"
          reverse
          color="dodgerblue"
          raised
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.locationButtonContainer}>
        <Icon type="material" color="dodgerblue" name="place" />
        <Text style={styles.locationButtonLabel}>Location</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  locationButtonContainer: {
    flex: 0.1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dddddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButtonLabel: {
    fontSize: 16,
    color: 'dodgerblue',
  },
});
