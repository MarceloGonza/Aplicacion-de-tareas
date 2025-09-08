import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";

import { Feather } from "@expo/vector-icons";

function CheckMark({ id, completed, toggleTodo }) {
  async function toggle() {
    try {
      const response = await fetch(`http://192.168.1.6:8080/todos/${id}`, {
        method: "PUT",
        headers: {
          "x-api-key": "abcdef123456",
          "Content-Type": "application/json", // <- corregido
        },
        body: JSON.stringify({
          value: completed === 1 ? false : true, // <- explícito
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el todo");
      }

      const data = await response.json();
      toggleTodo(id);
      console.log(data);
    } catch (err) {
      console.error("Toggle error:", err);
    }
  }

  return (
    <Pressable
      onPress={toggle}
      style={[
        styles.checkMark,
        { backgroundColor: completed ? "#0EA5E9" : "#E9E9EF" },
      ]}
    ></Pressable>
  );
}

function Task({ id, title, shared_with_id, completed, clearTodo, toggleTodo }) {
  const [isDeletedActive, setIsDeletedActive] = React.useState(false);

  async function deleteTodo() {
    const response = await fetch(`http://192.168.1.6:8080/todos/${id}`, {
      method: "DELETE",
    });
    clearTodo(id);
    console.log(response.status);
  }
  return (
    <TouchableOpacity
      onLongPress={() => setIsDeletedActive(true)}
      onPress={() => setIsDeletedActive(false)}
      activeOpacity={0.8}
      style={[styles.container]}
    >
      <View style={styles.containerTextCheckBox}>
        <CheckMark id={id} completed={completed} toggleTodo={toggleTodo} />
        <Text style={styles.subtitle}>{title}</Text>
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
      {isDeletedActive && (
        <Pressable onPress={deleteTodo} style={styles.deleteButton}>
          <Text style={{ color: "white", fontWeight: "bold" }}>X</Text>
        </Pressable>
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
    flex: 1,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: "#ef4444",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
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
