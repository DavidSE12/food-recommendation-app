<<<<<<< HEAD
// Map.tsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";

import type { LatLng, Restaurant } from "@/app/(tabs)/explore";

type Props = {
  setUserLocation: (loc: { latitude: number; longitude: number }) => void;
  restaurants?: Restaurant[];
};

export default function Map({ setUserLocation, restaurants = [] }: Props) {
  // ✅ local state chỉ để điều khiển region hiển thị map
  const [region, setRegion] = useState<Region>({
    latitude: -37.8136, // Melbourne fallback
    longitude: 144.9631,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      // Ask permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      // Get user location
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      if (!mounted) return;

      const next = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };

      // ✅ update parent state
      setUserLocation(next);

      // ✅ update map region to center on user
      setRegion((prev) => ({
        ...prev,
        latitude: next.latitude,
        longitude: next.longitude,
      }));
    };

    run().catch((e) => console.log("Location error:", e));

    return () => {
      mounted = false;
    };
  }, [setUserLocation]);
=======
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
>>>>>>> 4b00787 (Create bottom sheet to show restaurant card but still got error of getting data from backend)

export default function Map({
  userLocation,
  setUserLocation,
  restaurants
}: Props) {
  return (
    <View style={styles.container}>
      <MapView
<<<<<<< HEAD
        style={styles.map}
        region={region} // ✅ must be a valid Region object
        provider="google"
        zoomControlEnabled
        zoomEnabled
        rotateEnabled
        showsUserLocation
      >
        {restaurants.map((r) => (
          <Marker
            key={r.id}
            coordinate={{ latitude: r.lat, longitude: r.lng }}
            title={r.name}
            description={r.address ?? ""}
=======
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
>>>>>>> 4b00787 (Create bottom sheet to show restaurant card but still got error of getting data from backend)
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
<<<<<<< HEAD
=======
    justifyContent: "flex-end",
    alignItems: "center",
>>>>>>> 4b00787 (Create bottom sheet to show restaurant card but still got error of getting data from backend)
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
