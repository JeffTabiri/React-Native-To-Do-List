import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { router } from "expo-router";
import { Category, TaskList } from "@/components/types";
import { categories } from "@/constants/Constants";
import { StoreTaskList } from "@/components/JsonHelper";
import { MaterialIcons } from "@expo/vector-icons";

const Modal = () => {
  const [selected, setSelected] = React.useState("");
  const [title, onChangeTitle] = React.useState("");
  const [description, onChangeDescription] = React.useState("");

  const formFilled = title.length > 0 && selected.length > 0; // Check if the form is filled

  const handleCancel = () => {
    router.dismiss();
  };

  const handleSave = async () => {
    console.log("Saved a new list.");
    await saveList();
    router.back();
  };

  async function saveList() {
    const newTaskList: TaskList = {
      title: title,
      category: selected as Category,
      tasks: [],
    };
    await StoreTaskList(newTaskList);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="m-5 flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
    >
      <View className="gap-3">
        <Text className="text-4xl py-4 font-Inter_medium text-center">
          New List
        </Text>
        <TextInput
          placeholderTextColor={"black"}
          style={styles.container}
          placeholder="Title"
          value={title}
          onChangeText={onChangeTitle}
        ></TextInput>
        <TextInput
          placeholderTextColor={"black"}
          style={styles.container}
          placeholder="Description"
          value={description}
          onChangeText={onChangeDescription}
        ></TextInput>
        <SelectList
          boxStyles={{
            borderRadius: 20,
            borderColor: "rgba(156, 163, 175, 1)",
            height: 50,
          }}
          dropdownStyles={{
            borderRadius: 20,
            borderColor: "rgba(156, 163, 175, 1)",
          }}
          placeholder="Category"
          search={false}
          fontFamily="Inter-Regular"
          setSelected={(val: React.SetStateAction<string>) => setSelected(val)}
          data={categories}
          save="value"
        />
      </View>

      <View style={styles.buttonContainer}>
        <MaterialIcons
          onPress={() => handleSave()}
          name="check-circle"
          size={70}
          color={formFilled ? "#186336" : "#B0BEC5"} // Softer green if filled, gray if not
          disabled={!formFilled}
        />
        <MaterialIcons
          onPress={() => handleCancel()}
          name="cancel"
          size={70}
          color="#803129"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Modal;
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "rgba(156, 163, 175, 1)", // Equivalent to border-stone-400
    borderRadius: 20,
    height: 50,
    paddingHorizontal: 15,
    fontFamily: "Roboto-Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20, // Adds some vertical padding
    marginTop: "auto", // Pushes the buttons to the bottom
  },
});
