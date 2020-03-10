import React, {useState, useEffect, useCallback, createRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {Text, Input, Icon} from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'This App needs access to your location ' +
          'so we can know where you are.',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use locations ');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

const apiKey = 'AIzaSyCey9d3M7d36KkgzBFnNLSXpMzIAbZv-iE';

const defaultCoordinate = {
  latitude: -7.5591225,
  longitude: 110.7837924,
};

const Maps = props => {
  const [searchResult, setSearchResult] = useState([]);
  const [currentCoordinate, setCurrentCoordinate] = useState(defaultCoordinate);
  const {navigation} = props;
  navigation.setOptions({
    headerShown: false,
  });

  const _mapView = createRef();

  const onSearchPlace = async destination => {
    const apiURL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}&input=${destination}`;
    try {
      const result = await fetch(apiURL);
      const json = await result.json();
      setSearchResult(json);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentPosition = useCallback(async () => {
    await requestLocationPermission();
    await Geolocation.getCurrentPosition(
      info =>
        setCurrentCoordinate({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        }),
      error => console.log(error),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  const goToCurrentCoordinate = () => {
    if (_mapView.current) {
      _mapView.current.animateToRegion(
        {
          ...currentCoordinate,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        },
        1500,
      );
    }
  };

  useEffect(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  useEffect(() => {
    console.log(searchResult);
  });

  return (
    <View style={styles.flex1}>
      <View style={styles.flex1}>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBarContentContainer}>
            <Icon
              type="feather"
              name="menu"
              containerStyle={styles.searchBarLeftIcon}
            />
            <Input placeholder="Location" onChangeText={onSearchPlace} />
          </View>
        </View>
        <MapView
          ref={_mapView}
          loadingEnabled={true}
          provider={PROVIDER_GOOGLE}
          style={styles.flex1}
          initialRegion={{
            ...defaultCoordinate,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          region={{
            ...currentCoordinate,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <MapView.Marker
            title="Current location"
            coordinate={currentCoordinate}
          />
        </MapView>
        <Icon
          containerStyle={styles.myLocationIcon}
          type="material"
          name="my-location"
          reverse
          reverseColor="dodgerblue"
          color="white"
          raised
          onPress={() => goToCurrentCoordinate()}
        />
        <Icon
          containerStyle={styles.directionsIcon}
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
  searchBarContainer: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  searchBarContentContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#dddddd',
    backgroundColor: 'white',
  },
  searchBarLeftIcon: {
    paddingVertical: 16,
    paddingLeft: 16,
  },
  myLocationIcon: {bottom: 120, right: 20, position: 'absolute'},
  directionsIcon: {bottom: 50, right: 20, position: 'absolute'},
  locationButtonContainer: {
    height: 60,
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
