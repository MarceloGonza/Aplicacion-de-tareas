import { View, Text } from "react-native";
function Task({
  id,
  title,
  shared_with_id,
  completed,
  //clearTodo,
  //toggleTodo,
}) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

export default Task;
