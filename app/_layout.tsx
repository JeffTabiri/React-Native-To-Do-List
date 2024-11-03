import React from "react";
import "../global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
const RootLayout = () => {
  // Load the fonts using useFonts hook
  const [fontsLoaded] = useFonts({
    "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Inter-Black": require("../assets/fonts/Inter_18pt-Black.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
  });

  // If fonts are not loaded, show a loading spinner or similar indicator
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerBackTitle: "Back", headerShown: false }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="list"
        options={{ headerBackTitle: "Back", title: "" }}
      />
    </Stack>
  );
};

export default RootLayout;
