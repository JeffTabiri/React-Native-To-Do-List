import { Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { categories } from "@/constants/Constants";
import { ListIndex } from "@/components/types";
import { RemoveFromIndex, UpdateIndexList } from "@/components/JsonHelper";

const getCategoryIcon = (category: string) => {
  const foundCategory = categories.find((cat) => cat.value === category);
  return foundCategory ? foundCategory.icon : "flight"; // Fallback icon if not found
};

const MinimalListCard = ({
  indexItem,
  onDelete,
}: {
  indexItem: ListIndex;
  onDelete: (title: string) => void;
}) => {
  const [isFavorite, setIsFavorite] = useState(indexItem.favorite);

  async function handleOnFavoritePress() {
    setIsFavorite(!isFavorite); //
    await UpdateIndexList({ ...indexItem, favorite: !isFavorite });
    console.log("Favorite button pressed.");
  }

  async function handleOnDeletePress(indexItem: ListIndex) {
    console.log("Delete button pressed.");
    onDelete(indexItem.title);
  }

  return (
    <View className="flex-row py-4 text-center items-center justify-between">
      <Pressable
        onPress={() => router.push(`/list/${indexItem.title}`)}
        className="flex-row items-center"
      >
        <MaterialIcons name={getCategoryIcon(indexItem.category)} size={24} />
        <Text className="pl-4 font-Inter_medium flex-1">{indexItem.title}</Text>
        <MaterialIcons
          onPress={async () => {
            await handleOnFavoritePress();
          }}
          name={isFavorite ? "star" : "star-border"}
          size={24}
        />
        <MaterialIcons
          onPress={async () => {
            await handleOnDeletePress(indexItem);
          }}
          name={"delete-outline"}
          size={24}
        />
      </Pressable>
      <View className="flex-row items-center"></View>
    </View>
  );
};

export default MinimalListCard;
