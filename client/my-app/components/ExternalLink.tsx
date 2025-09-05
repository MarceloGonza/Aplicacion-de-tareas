import { Linking, Text, TextProps } from "react-native";

export function ExternalLink({
  href,
  children,
  ...props
}: { href: string; children: React.ReactNode } & TextProps) {
  return (
    <Text
      {...props}
      onPress={() => Linking.openURL(href)}
      style={[props.style, { color: "blue" }]}
    >
      {children}
    </Text>
  );
}
