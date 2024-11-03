import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ListIndex } from "@/components/types";
import { router } from "expo-router";
import categoryImageMap from "@/constants/Constants";

export default function ListCard({ indexItem }: { indexItem: ListIndex }) {
  const { title, category } = indexItem;
  const imageSource =
    categoryImageMap[category] ||
    require("../assets/images/categories/Default.jpg");
  return (
    <Pressable onPress={() => router.push(`/list/${indexItem.title}`)}>
      <View style={styles.card}>
        <ImageBackground style={styles.imageBackground} source={imageSource}>
          <View style={styles.textBackground}>
            <Text style={styles.text}>{title}</Text>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15, // Optionally, make the card have rounded corners
    overflow: "hidden", // Ensure the content fits within the rounded corners
  },
  imageBackground: {
    width: "100%", // Set the desired width of the image
    height: 130, // Set the desired height of the image
    justifyContent: "flex-end", // Align text vertically to the center
    alignItems: "flex-start", // Align text horizontally to the center
  },
  textBackground: {
    width: "100%", // Take full width of the card
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Background with opacity
    paddingHorizontal: 15,
    paddingVertical: 5, // Add some vertical padding
  },
  text: {
    color: "#fff", // White text color
    fontSize: 23, // Font size for the text
    fontFamily: "Inter-Regular", // Use the custom font
  },
});
