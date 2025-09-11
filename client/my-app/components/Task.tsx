import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Platform,
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

function Task({ id, title, shared_with_id, completed, clearTodo }: TaskProps) {
  const [isDeletedActive, setIsDeletedActive] = React.useState(false);

  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = ["40%"];

  function handlePresentModal() {
    bottomSheetRef.current?.present();
  }

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
    <>
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

        <Feather
          onPress={handlePresentModal}
          name={shared_with_id ? "users" : "share"}
          size={20}
          color="#383839"
        />

        {isDeletedActive && (
          <Pressable onPress={deleteTodo} style={styles.deleteButton}>
            <Text style={{ color: "white", fontWeight: "bold" }}>X</Text>
          </Pressable>
        )}
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          borderRadius: 20,
          padding: 20,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#403e3eff", // línea negra
          width: 40,
          height: 4,
          borderRadius: 2,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {shared_with_id ? "Esta tarea ya está compartida" : "Compartir tarea"}
        </Text>
      </BottomSheetModal>
    </>
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
    backgroundColor: "#fff",
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  containerTextCheckBox: {
    flex: 1,
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
  subtitle: {
    color: "#101318",
    fontSize: 14,
    fontWeight: "bold",
  },
});
