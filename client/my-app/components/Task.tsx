import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

interface CheckMarkProps {
  id: number;
  initialCompleted: boolean;
  toggleTodoOnServer: (id: number, newCompleted: boolean) => void;
}

function CheckMark({
  id,
  initialCompleted,
  toggleTodoOnServer,
}: CheckMarkProps) {
  const [completed, setCompleted] = React.useState(initialCompleted);

  async function toggle() {
    setCompleted(!completed);
    try {
      const response = await fetch(`http://192.168.1.6:8080/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: completed ? 0 : 1 }),
      });

      if (!response.ok) throw new Error("Error al actualizar el todo");

      const data = await response.json();
      toggleTodoOnServer(id, !!data.completed);
    } catch (err) {
      console.error("Toggle error:", err);
      setCompleted(!completed);
    }
  }

  return (
    <Pressable
      onPress={toggle}
      style={[
        styles.checkMark,
        { backgroundColor: completed ? "#0EA5E9" : "#E9E9EF" },
      ]}
    />
  );
}

interface TaskProps {
  id: number;
  title: string;
  completed: 0 | 1;
  shared_with_id?: number | null;
  clearTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

function Task({
  id,
  title,
  shared_with_id,
  completed,
  clearTodo,
  toggleTodo,
}: TaskProps) {
  const [isDeletedActive, setIsDeletedActive] = React.useState(false);

  async function deleteTodo() {
    try {
      const response = await fetch(`http://192.168.1.6:8080/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) clearTodo(id);
    } catch (err) {
      console.error("Delete error:", err);
    }
  }

  function toggleTodoOnServer(id: number, newCompleted: boolean) {
    console.log(`Todo ${id} actualizado a completed=${newCompleted}`);
  }

  return (
    <TouchableOpacity
      onLongPress={() => setIsDeletedActive(true)}
      onPress={() => setIsDeletedActive(false)}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View style={styles.containerTextCheckBox}>
        <CheckMark
          id={id}
          initialCompleted={completed === 1}
          toggleTodoOnServer={toggleTodoOnServer}
        />
        <Text style={styles.subtitle}>{title}</Text>
      </View>

      {shared_with_id ? (
        <Feather name="users" size={20} color="#383839" />
      ) : (
        <Feather name="share" size={20} color="#383839" />
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
  subtitle: { color: "#101318", fontSize: 14, fontWeight: "bold" },
});
