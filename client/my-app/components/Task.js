import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";

import { Feather } from "@expo/vector-icons";

function CheckMark({ id, completed, toggleTodo }) {
  return (
    <Pressable
      style={[
        styles.checkMark,
        { backgroundColor: completed === 0 ? "#E9E9EF" : "#0EA5E9" },
      ]}
    ></Pressable>
  );
}

function Task({
  id,
  title,
  shared_with_id,
  completed,
  //clearTodo,
  //toggleTodo,
}) {
  return (
    <TouchableOpacity>
      <View style={styles.containerTextCheckBox}>
        <CheckMark />
        <Text style={StyleSheet.text}>{title}</Text>
      </View>
      {shared_with_id !== null ? (
        <Feather
          //onPress={handlePresentShred}
          name="users"
          size={20}
          color="#383839"
        />
      ) : (
        <Feather
          //onPress={handlePresentModal}
          name="share"
          size={20}
          color="#383839"
        />
      )}
    </TouchableOpacity>
  );
}

export default Task;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 21,
  },
  containerTextCheckBox: {
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  unknow: {
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef4444",
    borderRadius: 10,
  },
  checkMark: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
  },
  subtitle: {
    color: "#101318",
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
});
