import { Text, TouchableOpacity, View } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { AntDesign, Feather } from "@expo/vector-icons";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const icon = {
    index: (props: any) => <Feather name="home" size={24} {...props} />,
    create: (props: any) => (
      <AntDesign name="pluscircle" size={60} color="black" {...props} />
    ),
    lists: (props: any) => <Feather name="list" size={24} {...props} />,
  };
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            className="flex-1 justify-center items-center py-4"
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icon[route.name]()}
            <Text>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
