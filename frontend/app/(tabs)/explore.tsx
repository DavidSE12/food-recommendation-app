<<<<<<< HEAD

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Text} from 'react-native';
import Map from '@/src/components/map';
import RestaurantBottomSheet from '@/src/components/explore/RestaurantBottomSheet';
import type {RestaurantProps} from '@/src/components/explore/RestaurantCard';
import { useState, useEffect } from 'react';

export type Restaurant = {
  id: string;
  name: string;
  rating?: number;
  address?: string;
  openNow?: boolean;
  photoUrl?: string;
  lat: number;
  lng: number;
};

export type LatLng = {
  latitude: number;
  longitude: number;
};


export default function Explore() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [userLocation, setUserLocation] = useState<LatLng | null>(null);

    useEffect(() => {
     if (!userLocation) return;

     const fetchRestaurants = async () => {
         const res = await fetch('http://localhost:8080/api/nearby' , {
             method : 'POST',
             headers : {
                 'Content-Type' : 'application/json',
             },
            body : JSON.stringify({
             lat : userLocation.latitude,
             lng : userLocation.longitude,
             radiusKm: 5,
             }),
         });

        const data = await res.json();
        setRestaurants(data);
     };

     fetchRestaurants();
    } , [userLocation]);

    return (
        <SafeAreaView style = {{ flex : 1 }}>
                <Map setUserLocation={setUserLocation} restaurants={restaurants} />
                <RestaurantBottomSheet restaurants={restaurants}/>
        </SafeAreaView>
    )
}

=======
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '@/src/components/map';
import RestaurantBottomSheet from '@/src/components/explore/RestaurantBottomSheet';
import { Restaurant, LatLng } from '@/src/types/restaurant';
import * as Location from 'expo-location';

const Explore = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
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

  useEffect(() => {
    if (!userLocation) return;

    const fetchRestaurants = async () => {
      try {

        console.log(userLocation.latitude, " and " , userLocation.longitude);

        const res = await fetch('http://192.168.56.1:8080/api/nearby', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lat: userLocation.latitude,
            lng: userLocation.longitude,
            radiusKm: 5,
          }),
        });

        if (!res.ok) {
          console.error('Failed to fetch restaurants:', res.status);
          return;
        }

        const data = await res.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, [userLocation]);

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
        onSelect={handleSelectRestaurant}
        initialIndex={1} // Start at 50%
      />
    </SafeAreaView>
  );
};

export default Explore;
>>>>>>> 4b00787 (Create bottom sheet to show restaurant card but still got error of getting data from backend)
