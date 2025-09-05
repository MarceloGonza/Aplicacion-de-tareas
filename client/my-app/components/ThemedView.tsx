import { View as DefaultView, useColorScheme } from "react-native";

function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: string
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme ?? "light"];

  if (colorFromProps) {
    return colorFromProps;
  }

  const colors = {
    light: {
      background: "#fff",
    },
    dark: {
      background: "#000",
    },
  };

  return colors[theme ?? "light"][colorName];
}

export type ThemedViewProps = DefaultView["props"] & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView(props: ThemedViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
