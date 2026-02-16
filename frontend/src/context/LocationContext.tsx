import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as Location from 'expo-location';

type LocationContextType = {
  userLocation: { latitude: number; longitude: number } | null;
  error: string | null;
  loading: boolean;
  refreshLocation: () => void;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setUserLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      setError(null);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to get location');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        error,
        loading,
        refreshLocation: getLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

// Hook to use location anywhere
export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
}