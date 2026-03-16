import { useEffect } from 'react';
import { useRouter, useSegments, Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { LocationProvider } from '@/src/context/LocationContext';
import { RestaurantProvider } from '@/src/context/RestaurantContext';
import { UserProvider, useUser } from '@/src/context/UserContext';

function NavigationGate() {
  const { hasCompletedOnboarding, isLoading } = useUser();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const inOnboarding = segments[0] === 'onboarding';

    if (!hasCompletedOnboarding && !inOnboarding) {
      router.replace('/onboarding');
    } else if (hasCompletedOnboarding && inOnboarding) {
      router.replace('/(tabs)/home');
    }
  }, [isLoading, hasCompletedOnboarding]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <LocationProvider>
          <RestaurantProvider>
            <NavigationGate />
          </RestaurantProvider>
        </LocationProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
}
