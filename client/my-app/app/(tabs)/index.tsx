import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import Task from "../../components/Task";

export default function HomeScreen() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch("http://192.168.1.6:8080/todos/1");
    const data = await response.json();
    setTodos(data);
    console.log(data);
  }

  function clearTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
          : todo
      )
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={todos}
          keyExtractor={(todo) => todo.id}
          renderItem={({ item }) => (
            <Task {...item} toggleTodo={toggleTodo} clearTodo={clearTodo} />
          )}
          ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E9EF",
  },
  contentContainerStyle: {
    padding: 15,
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
  },
});
