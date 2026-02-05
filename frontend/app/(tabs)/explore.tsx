
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Text} from 'react-native';
import Map from '@/src/components/map';
import RestaurantBottomSheet from '@/src/components/explore/RestaurantBottomSheet';
import Restaurant from '@/src/components/explore/RestaurantCard';
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


const explore = () => {
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

export default explore;