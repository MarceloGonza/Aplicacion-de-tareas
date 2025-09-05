import { View } from "react-native";

export default function TabBarBackground() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: "hidden",
      }}
    />
  );
}
