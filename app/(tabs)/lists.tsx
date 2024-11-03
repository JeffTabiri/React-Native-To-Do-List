import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { ListIndex } from "@/components/types";
import Header from "@/components/Header";
import { LoadIndex, RemoveFromIndex } from "@/components/JsonHelper";
import MinimalListCard from "@/components/MinimalListCard";

const Lists = () => {
  const [indexList, setIndexList] = useState<ListIndex[]>([]);

  const handleDelete = async (title: string) => {
    await RemoveFromIndex(title);
    setIndexList(indexList.filter((item) => item.title !== title));
  };

  async function fetchData() {
    const fetchedTaskLists: ListIndex[] = await LoadIndex();
    setIndexList(fetchedTaskLists);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData().then(() => console.log("Task lists loaded."));
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View className="flex-1">
        <Header title={"My Lists"} size={40}></Header>
        <FlatList
          ItemSeparatorComponent={() => (
            <View className="mx-5 h-0.5 bg-gray-300" />
          )}
          data={indexList}
          renderItem={({ item }) => (
            <MinimalListCard
              indexItem={item}
              onDelete={() => handleDelete(item.title)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
export default Lists;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make the SafeAreaView take the full height
    marginHorizontal: 10, // Add some horizontal margin
  },
});
