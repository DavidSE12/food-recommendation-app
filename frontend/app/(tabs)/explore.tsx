import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '@/src/components/map';
import RestaurantBottomSheet from "@/src/components/explore/RestaurantBottomSheet";
import { useLocation } from "@/src/context/LocationContext";
import { useRestaurants } from "@/src/context/RestaurantContext";

export default function Explore() {
  const { userLocation } = useLocation();
  const { restaurants } = useRestaurants();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Map userLocation={userLocation} restaurants={restaurants} />
      <RestaurantBottomSheet restaurants={restaurants} />
    </SafeAreaView>
  );
}
