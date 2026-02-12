import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
<<<<<<< HEAD

    <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
            {/* This renders your tab group */}
            <Stack.Screen name="(tabs)" />
        </Stack>
=======
      <GestureHandlerRootView style={{flex: 1}} >
    <Stack screenOptions={{ headerShown: false }}>
      {/* This renders your tab group */}
      <Stack.Screen name="(tabs)" />
    </Stack>
>>>>>>> 4b00787 (Create bottom sheet to show restaurant card but still got error of getting data from backend)
    </GestureHandlerRootView>
  );
}
