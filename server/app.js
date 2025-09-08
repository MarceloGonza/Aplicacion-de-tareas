import express from "express";
import cors from "cors";
import {
  getTodo,
  shareTodo,
  deleteTodo,
  getTodosById,
  createTodo,
  toggleCompleted,
  getUserByEmail,
  getUserById,
  getSharedTodoById,
} from "./database.js";

const app = express();

// Configuración CORS
const corsOptions = {
  origin: [
    "http://localhost:19006", // Expo Web
    "http://192.168.1.6:19006", // Red local
    "http://localhost:8081", // Web browser
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

// Rutas
app.get("/todos/:id", async (req, res) => {
  try {
    const todos = await getTodosById(req.params.id);
    res.status(200).send(todos);
  } catch (err) {
    res.status(500).send({ error: "Error al obtener todos" });
  }
});

app.get("/todos/shared_todos/:id", async (req, res) => {
  try {
    const todo = await getSharedTodoById(req.params.id);
    const author = await getUserById(todo.use_id);
    const shared_with = await getUserById(todo.shared_with_id);
    res.status(200).send({ author, shared_with });
  } catch (err) {
    res.status(500).send({ error: "Error al obtener shared todo" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ error: "Error al obtener usuario" });
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { value } = req.body;
    const todo = await toggleCompleted(req.params.id, value);
    res.status(200).send(todo);
  } catch (err) {
    console.error("Error en toggleCompleted:", err);
    res.status(500).send({ error: "Error al actualizar el todo" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    await deleteTodo(req.params.id);
    res.send({ message: "Todo eliminado correctamente" });
  } catch (err) {
    res.status(500).send({ error: "Error al eliminar todo" });
  }
});

app.post("/todos/shared_todos", async (req, res) => {
  try {
    const { todo_id, user_id, email } = req.body;
    const userToShare = await getUserByEmail(email);
    const shared = await shareTodo(todo_id, user_id, userToShare.id);
    res.status(201).send(shared);
  } catch (err) {
    res.status(500).send({ error: "Error al compartir todo" });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { user_id, title } = req.body;
    const todo = await createTodo(user_id, title);
    res.status(201).send(todo);
  } catch (err) {
    res.status(500).send({ error: "Error al crear todo" });
  }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
