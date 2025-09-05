import {
  TouchableOpacity,
  TouchableOpacityProps,
  Platform,
} from "react-native";
import * as Haptics from "expo-haptics";

export function HapticTab(props: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      {...props}
      onPress={(e) => {
        if (Platform.OS === "ios") {
          Haptics.selectionAsync().catch(() => {});
        }
        props.onPress?.(e);
      }}
    />
  );
}
