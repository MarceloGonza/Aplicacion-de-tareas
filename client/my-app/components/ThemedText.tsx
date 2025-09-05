import { Text as DefaultText, useColorScheme } from "react-native";

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
      text: "#000",
    },
    dark: {
      text: "#fff",
    },
  };

  return colors[theme ?? "light"][colorName];
}

export type ThemedTextProps = DefaultText["props"] & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedText(props: ThemedTextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}
