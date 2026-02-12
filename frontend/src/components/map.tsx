
import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Restaurant = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  rating?: number;
};

type Props = {
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  setUserLocation: (userLocation: {
    latitude: number;
    longitude: number;
  }) => void;

  restaurants: Restaurant[];
};

export default function Map({
  userLocation,
  setUserLocation,
  restaurants
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
      >
        {/* 🔥 Render restaurant markers */}
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            title={restaurant.name}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,)
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
