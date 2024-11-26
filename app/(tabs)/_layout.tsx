import React, {useState} from "react";
import { router, Tabs } from "expo-router";
import TabBar from "@/components/TabBar";
import {AddTestLists} from "@/components/JsonHelper";

export default function TabsLayout() {

  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load test lists on app startup
  if (!isInitialized) {
    AddTestLists().then(() => console.log("Test lists loaded."));
    setIsInitialized(true);
  }

  return (
    // Custom TabBar component for styling.
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "",
          headerShown: false,
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            router.push("/modal");
          },
        })}
      />
      <Tabs.Screen
        name="lists"
        options={{
          title: "All lists",
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
