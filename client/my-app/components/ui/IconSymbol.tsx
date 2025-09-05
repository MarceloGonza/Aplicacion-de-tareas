import { Text } from "react-native";

export type IconSymbolProps = {
  name: string;
  color?: string;
  size?: number;
};

export function IconSymbol({
  name,
  color = "#000",
  size = 24,
}: IconSymbolProps) {
  // 🚨 Este es un placeholder sencillo.
  // En la plantilla original puede integrarse con `expo/vector-icons`.
  return <Text style={{ color, fontSize: size }}>{name}</Text>;
}
