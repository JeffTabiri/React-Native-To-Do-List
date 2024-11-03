import React from "react";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={() => ({
        tabBarStyle: {
          display: "none",
        },
      })}
    >
      <Tabs.Screen
        name="[title]"
        options={{
          title: "",
          headerShown: false,
          href: null,
        }}
      />
    </Tabs>
  );
}
