import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserProfile = {
  name: string;
  age: string;
  weight: string;
  preferences: string[];   // dietary: Vegetarian, Halal, etc.
  favoriteFoods: string[]; // Pizza, Sushi, etc.
  allergies: string[];
  budget: string;          // Budget / Casual / Mid-range / Fine Dining
};

type UserContextType = {
  userProfile: UserProfile | null;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
  saveUserProfile: (profile: UserProfile) => Promise<void>;
  clearUserProfile: () => Promise<void>;
};

const STORAGE_KEY = '@foodrecomd_user_profile';
const API_BASE = 'http://192.168.1.112:8080';

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(json => {
        if (json) setUserProfile(JSON.parse(json));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const saveUserProfile = async (profile: UserProfile) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setUserProfile(profile);
    try {
      await fetch(`${API_BASE}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
    } catch (e) {
      // Non-blocking: local profile is already saved
      console.warn('Failed to sync profile to server:', e);
    }
  };

  const clearUserProfile = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setUserProfile(null);
  };

  return (
    <UserContext.Provider
      value={{
        userProfile,
        isLoading,
        hasCompletedOnboarding: !!userProfile,
        saveUserProfile,
        clearUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
}
