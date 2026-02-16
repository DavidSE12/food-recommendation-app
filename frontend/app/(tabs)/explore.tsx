
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '@/src/components/map';
import RestaurantBottomSheet from '@/src/components/explore/RestaurantBottomSheet';
import type Restaurant from '@/src/components/explore/RestaurantCard';
import * as Location from 'expo-location';
import { useLocation } from "@/src/context/LocationContext"; // ✅ Import hook
import { useRestaurants } from '@/src/context/RestaurantContext';

export default function Explore() {


  // ✅ Get location from context (already fetched once globally)
  const { userLocation, setUserLocation, error, loading } = useLocation();
  const {restaurants, setRestaurants} = useRestaurants();

    console.log(userLocation);

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    console.log('Selected:', restaurant.name);
    // You can:
    // - Navigate to detail screen
    // - Show a modal with more info
    // - Focus map on this restaurant
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Map userLocation={userLocation} setUserLocation={setUserLocation} restaurants={restaurants} />

      <RestaurantBottomSheet
        restaurants={restaurants}
      />
    </SafeAreaView>
  );
};
