import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { TaskList } from "@/components/types";
import Header from "@/components/Header";
import { LoadTaskList, UpdateTaskList } from "@/components/JsonHelper";

const TaskView = () => {
  const inputRef = useRef<TextInput>(null);
  const params = useLocalSearchParams();
  const title: string | string[] = params.title; // Access the title key from params
  const [text, onChangeText] = React.useState("");
  const [selectedTaskList, setSelectedTaskList] = useState<
    TaskList | undefined
  >(undefined);

  // Fetch data once when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const taskList = await LoadTaskList(title as string);
      setSelectedTaskList(taskList || undefined);
    };
    fetchData().then((r) => console.log("Task list loaded."));
  }, [title]);

  const handleSubmitEditing = () => {
    inputRef.current?.focus(); // Hide the keyboard
  };

  // Delete a task
  const handleDeleteTask = useCallback(
    async (taskTitle: String) => {
      if (!selectedTaskList) return;
      const updatedTaskList = {
        ...selectedTaskList,
        tasks: selectedTaskList.tasks.filter(
          (task) => task.title !== taskTitle,
        ),
      };
      setSelectedTaskList(updatedTaskList);
      await UpdateTaskList(updatedTaskList);
    },
    [selectedTaskList],
  );

  const handleCheckTask = useCallback(
    async (taskTitle: String) => {
      if (!selectedTaskList) return;
      const updatedTaskList = {
        ...selectedTaskList,
        tasks: selectedTaskList.tasks.map((task) =>
          task.title === taskTitle
            ? { ...task, completed: !task.completed }
            : task,
        ),
      };
      setSelectedTaskList(updatedTaskList);
      await UpdateTaskList(updatedTaskList);
    },
    [selectedTaskList],
  );

  // Memoize sorted tasks
  const sortedTasks = useMemo(
    () =>
      selectedTaskList
        ? selectedTaskList.tasks.sort(
            (a, b) => Number(a.completed) - Number(b.completed),
          )
        : [],
    [selectedTaskList],
  );

  // Add a new task
  const handleAddTask = useCallback(async () => {
    if (
      !selectedTaskList ||
      !text ||
      selectedTaskList.tasks.some((task) => task.title === text)
    )
      return;
    const newTask = { title: text, description: "", completed: false };
    const updatedTaskList = {
      ...selectedTaskList,
      tasks: [...selectedTaskList.tasks, newTask],
    };

    onChangeText("");
    setSelectedTaskList(updatedTaskList);
    await UpdateTaskList(updatedTaskList);
    inputRef.current?.focus(); // Keep the keyboard focused
  }, [text, selectedTaskList, onChangeText]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      className="m-5 flex-1"
    >
      <FlatList
        ListHeaderComponent={
          <Header
            size={40}
            title={selectedTaskList ? selectedTaskList.title : "Loading..."}
          />
        }
        ItemSeparatorComponent={() => <View className="mx-5" />}
        data={sortedTasks}
        renderItem={({ item }) => (
          <View className="flex-row py-4 text-center items-center justify-between">
            <MaterialCommunityIcons
              name={
                item.completed ? "checkbox-marked-circle" : "circle-outline"
              }
              size={24}
              color={item.completed ? "green" : "black"}
              onPress={() => handleCheckTask(item.title)} // Toggle completed state on press
            />
            <Text className="pl-4 font-Inter_medium flex-1">{item.title}</Text>
            <MaterialIcons
              onPress={async () => {
                await handleDeleteTask(item.title);
              }}
              name={"delete-outline"}
              size={24}
            />
          </View>
        )}
      />

      <TextInput
        ref={inputRef}
        style={style.container}
        value={text}
        clearButtonMode="always"
        autoFocus={true}
        onChangeText={onChangeText}
        onSubmitEditing={handleAddTask} // Trigger the function on "Enter"
        placeholder="Add a new task"
      />
    </KeyboardAvoidingView>
  );
};
export default TaskView;

const style = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "rgba(156, 163, 175, 1)",
    paddingVertical: 12,
    marginVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 23,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter-Regular",
  },
});
