import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const Searchbar = () => {
  const [text, onChangeText] = React.useState("");

  return (
    <View style={styles.container}>
      <Feather className="pl-3" name="search" size={20} color="black" />
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={onChangeText}
          value={text}
          placeholder="Search"
          clearButtonMode="always"
          style={styles.input}
        />
      </View>
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 0,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(156, 163, 175, 1)", // Equivalent to border-stone-400
    marginVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  inputContainer: {
    flex: 1,
    justifyContent: "flex-end", // Aligns text input below the icon
    marginLeft: 10, // Adds space between the icon and input
  },
  input: {
    height: 20, // Adjust height as needed
  },
});
