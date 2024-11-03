import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import "../../global.css";
import ListCard from "@/components/ListCard";
import Header from "@/components/Header";
import React, { useCallback, useState } from "react";
import { ListIndex } from "@/components/types";
import { useFocusEffect } from "expo-router";
import { LoadIndex } from "@/components/JsonHelper";

const Home = () => {
  const [indexItems, setIndexItems] = useState<ListIndex[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch the index items every time the screen is focused
  // Works upon initial load and when the user navigates back to the screen.
  const fetchData = useCallback(async () => {
    setIsLoading(true); // Start loading
    const fetchedIndexItems: ListIndex[] | null = await LoadIndex();

    // Filter only the favorite items
    const favoriteItems = (fetchedIndexItems || []).filter(
      (item) => item.favorite,
    );

    setIndexItems(favoriteItems || []); // Ensure data is an array even if null
    setIsLoading(false); // Stop loading
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData().then(() => console.log("Indexes loaded."));
    }, [fetchData]),
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          style={styles.scrollContainer}
          ListHeaderComponent={<Header title="Favorite Lists" size={40} />}
          ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
          data={indexItems}
          renderItem={({ item }) => <ListCard indexItem={item} />}
          keyExtractor={(item) => item.title} // Use a unique key to improve rendering performance
        />
      )}
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make the SafeAreaView take the full height
    marginHorizontal: 15, // Add some horizontal margin
  },
  scrollContainer: {
    flex: 1,
  },
});
