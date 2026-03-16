import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

type Restaurant = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rating?: number;
};

type Props = {
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  restaurants?: Restaurant[];
};

export default function Map({ userLocation, restaurants = [] }: Props) {
  return (
    <View style={styles.container}>
      <MapView
        region={
          userLocation
            ? {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }
            : undefined
        }
        showsUserLocation
        style={styles.map}
        loadingEnabled
        zoomEnabled
        showsMyLocationButton
        zoomControlEnabled
        scrollEnabled
      >
        {restaurants.map((r) => (
          <Marker
            key={r.id}
            coordinate={{ latitude: r.lat, longitude: r.lng }}
            title={r.name}
            description={r.rating ? `⭐ ${r.rating.toFixed(1)}` : undefined}
          >
            <View style={styles.markerContainer}>
              <Text style={styles.markerEmoji}>🍽️</Text>
            </View>
          </Marker>
        ))}
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
  markerContainer: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  markerEmoji: {
    fontSize: 20,
  },
});
