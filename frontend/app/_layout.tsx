import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
            {/* This renders your tab group */}
            <Stack.Screen name="(tabs)" />
        </Stack>
    </GestureHandlerRootView>
  );
}
