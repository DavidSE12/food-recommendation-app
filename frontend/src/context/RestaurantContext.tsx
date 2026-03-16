import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from './LocationContext';


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

type RestaurantContextType = {
  restaurants: Restaurant[];
  favorites: Restaurant[];
  loading: boolean;
  error: string | null;
  refreshRestaurants: () => Promise<void>;
  addToFavorites: (restaurant: Restaurant) => Promise<void>;
  removeFromFavorites: (placeId: string) => Promise<void>;
  isFavorite: (placeId: string) => boolean;
};

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

export function RestaurantProvider({ children }: { children: ReactNode }) {
  const { userLocation } = useLocation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [favorites, setFavorites] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<number | null>(null);

  // Fetch restaurants from API

  const fetchRestaurants = async () => {
    if (!userLocation) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://192.168.1.116:8080/api/nearby', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: userLocation.latitude,
          lng: userLocation.longitude,
          radiusKm: 5,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      const mapped : Restaurant[] = data.map((item: any) => ({
           id: item.placeId,
           name: item.name,
           address: item.address,
           rating: item.rating,
           priceLevel: item.priceLevel,
           lat: item.lat,
           lng: item.lng,
           openNow: item.openNow,
           photoUrl: item.photoUrl,
           photoRef: item.photoRef,
           totalRating: item.totalRating
      }));

      setRestaurants(mapped);

      setLastFetchTime(Date.now());
    } catch (e: any) {
      setError(e?.message ?? 'Failed to fetch restaurants');
      console.error('Fetch error:', e);
    } finally {
      setLoading(false);
    }
  };


  // Fetch favorites from YOUR database
  const fetchFavorites = async () => {
    try {
      // TODO: Replace with your actual user ID
      const userId = 'user_123';

      const res = await fetch(`http://192.168.1.116:8080/api/favorites/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch favorites');

      const data = await res.json();
      setFavorites(data);
    } catch (e: any) {
      console.error('Fetch favorites error:', e);
    }
  };

  // Add to favorites (local state only)
  const addToFavorites = async (restaurant: Restaurant) => {
    setFavorites(prev => {
      if (prev.some(r => r.id === restaurant.id)) return prev;
      return [...prev, restaurant];
    });
  };

  // Remove from favorites (local state only)
  const removeFromFavorites = async (placeId: string) => {
    setFavorites(prev => prev.filter(r => r.id !== placeId));
  };

  // Check if restaurant is favorited
  const isFavorite = (placeId: string) => {
    return favorites.some(r => r.id === placeId);
  };

  // Auto-fetch when location changes
  useEffect(() => {
    if (userLocation) {
      fetchRestaurants();
    }
  }, [userLocation]);

//   // Fetch favorites once on mount
//   useEffect(() => {
//     fetchFavorites();
//   }, []);

  // Auto-refresh every 5 minutes if data is stale
  useEffect(() => {
    const interval = setInterval(() => {
      if (lastFetchTime && Date.now() - lastFetchTime > 5 * 60 * 1000) {
        // 5 minutes
        console.log('Auto-refreshing restaurants...');
        fetchRestaurants();
      }
    }, 60 * 1000); // Check every minute

    return () => clearInterval(interval);
  }, [lastFetchTime, userLocation]);

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        favorites,
        loading,
        error,
        refreshRestaurants: fetchRestaurants,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

// Hook to use restaurants anywhere
export function useRestaurants() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurants must be used within RestaurantProvider');
  }
  return context;
}