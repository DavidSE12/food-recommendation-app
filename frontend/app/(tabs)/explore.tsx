
import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '@/src/components/map';
import RestaurantBottomSheet from "@/src/components/explore/RestaurantBottomSheet";
import * as Location from 'expo-location';
import { useLocation } from "@/src/context/LocationContext";
import { useRestaurants } from "@/src/context/RestaurantContext";


type Restaurant = {
  id: string;
  name: string;
  address?: string;
  rating?: number;
  totalRating: number;
  priceLevel?: string;
  lat: number;
  lng: number;
  openNow?: boolean;
  photoRef?: string;
  photoUrl?: string;
};

export default function Explore() {

  const { userLocation, setUserLocation, error, loading } = useLocation();
  const {restaurants, setRestaurants} = useRestaurants();

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    console.log('Selected:', restaurant.name);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Map userLocation={userLocation} setUserLocation={setUserLocation} />

      <RestaurantBottomSheet
        restaurants={restaurants}
        onSelect= {handleSelectRestaurant}
      />

    </SafeAreaView>
  );

}













