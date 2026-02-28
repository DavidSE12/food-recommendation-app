import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";



type Props = {
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  setUserLocation: (userLocation: {
    latitude: number;
    longitude: number;
  }) => void;
};

export default function Map({
  userLocation,
  setUserLocation
}: Props) {
  return (
    <View style={styles.container}>
      <MapView
        region={
          userLocation
            ? {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : undefined
        }
        showsUserLocation
        style={styles.map}
        loadingEnabled
        zoomEnabled
        showsMyLocationButton
        zoomControlEnabled
        followsUserLocation
        scrollEnabled
      >
        {/* 🔥 Render restaurant markers */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
