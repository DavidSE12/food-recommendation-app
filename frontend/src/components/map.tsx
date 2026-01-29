// Map.tsx

import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';



// type MapProps = {
//   initialRegion: Region;
// };

const Map = () => {

  const [userLocation, setUserLocation] = useState<{
      latitude: number;
      longitude: number;
     } | null>(null);


  useEffect(() => {
  (async ()    => {
    // Ask permission
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
        return;
    }

    // Get user Location
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
     });

     setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
     });
  })();
}, []);





  return (
    <View style={styles.container}>
      <MapView
        region={
           userLocation ? {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
           } : undefined 
       }
        showsUserLocation={true}
        style={styles.map}
      >
      {userLocation && (
        <Marker
          coordinate={userLocation}
          title="Your Location"
        />
        )}
      </MapView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Map;
