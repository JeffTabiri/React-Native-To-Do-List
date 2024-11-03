import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListIndex, TaskList } from "@/components/types";
import { Alert } from "react-native";

export const StoreTaskList = async (taskList: TaskList) => {
  const fileKey = taskList.title;

  try {
    const exists = await CheckIfListExists(fileKey);
    if (exists) {
      Alert.alert(
        "List already exists.",
        "A list with that name already exists.",
      );
      return;
    }
    await AsyncStorage.setItem(fileKey, JSON.stringify(taskList));
    await AddToIndex(taskList);
  } catch (error) {
    console.error("Error storing task list:", error);
  }
};

async function CheckIfListExists(fileKey: string) {
  return (await AsyncStorage.getItem(fileKey)) !== null;
}

export const UpdateTaskList = async (taskList: TaskList) => {
  try {
    const fileKey = taskList.title;
    const exists = await CheckIfListExists(fileKey);
    if (!exists) {
      Alert.alert(
        "List not found",
        "The list you are trying to update does not exist.",
      );
      return;
    }
    await AsyncStorage.setItem(taskList.title, JSON.stringify(taskList));
  } catch (error) {
    console.error("Error updating task list:", error);
  }
};

export const UpdateIndexList = async (indexList: ListIndex) => {
  try {
    const index = await LoadIndex(); // Load the current index

    // Update the favorite field of the matching item in the index
    const updatedIndex = index.map((list) =>
      list.title === indexList.title
        ? { ...list, favorite: indexList.favorite }
        : list,
    );

    // Save the updated index back to AsyncStorage
    await AsyncStorage.setItem("index", JSON.stringify(updatedIndex));
  } catch (error) {
    console.error("Error updating index list:", error);
  }
};

export const LoadTaskList = async (
  fileKey: string,
): Promise<TaskList | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(fileKey);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error loading task list:", error);
    return null;
  }
};

export const DeleteTaskList = async (fileKey: string) => {
  try {
    await AsyncStorage.removeItem(fileKey);
  } catch (error) {
    console.error("Error deleting task list:", error);
  }
};

export const LoadIndex = async (): Promise<ListIndex[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem("index");
    if (jsonValue) return JSON.parse(jsonValue);
    await AsyncStorage.setItem("index", JSON.stringify([]));
    return [];
  } catch (error) {
    console.error("Error loading index:", error);
    return [];
  }
};

export const AddToIndex = async (taskList: TaskList) => {
  const listIndex: ListIndex = {
    title: taskList.title,
    category: taskList.category,
    favorite: true,
  };

  try {
    const index = await LoadIndex();
    index.push(listIndex);
    await AsyncStorage.setItem("index", JSON.stringify(index));
  } catch (error) {
    console.error("Error adding to index:", error);
  }
};

export const RemoveFromIndex = async (fileKey: string) => {
  try {
    const index = await LoadIndex();
    const updatedIndex = index.filter((list) => list.title !== fileKey);
    await AsyncStorage.setItem("index", JSON.stringify(updatedIndex));
    await DeleteTaskList(fileKey);
  } catch (error) {
    console.error("Error removing from index:", error);
  }
};
