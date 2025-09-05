import express from "express";
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
import cors from "cors";

const corsOptions = {
  origin: [
    "http://127.0.0.1:5173", // tu front en Vite
    "http://localhost:5173", // por si lo abrís así
    "http://192.168.1.6:8081", // Expo en LAN (ajusta IP y puerto según tu máquina)
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.get("/todos/:id", async (req, res) => {
  const todos = await getTodosById(req.params.id);
  res.status(200).send(todos);
});

app.get("/todos/shared_todos/:id", async (req, res) => {
  const todo = await getSharedTodoById(req.params.id);
  const author = await getUserById(todo.use_id);
  const shared_with = await getUserById(todo.shared_with_id);
  res.status(200).send({ author, shared_with });
});

app.get("/users/:id", async (req, res) => {
  const user = await getUserById(req.params.id);
  res.status(200).send(user);
});

app.put("/todos/:id", async (req, res) => {
  const { value } = req.body;
  const todo = await toggleCompleted(req.params.id, value);
  res.status(200).send(todo);
});

app.delete("/todos/:id", async (req, res) => {
  await deleteTodo(req.params.id);
  res.send({ mesagge: "Todo deleted secussfully " });
});

app.post("/todos/shared_todos", async (req, res) => {
  const { todo_id, user_id, email } = req.body;
  const userToShare = await getUserByEmail(email);
  const shareTodo = await shareTodo(todo_id, user_id, userToShare.id);
  res.status(201).send(shareTodo);
});

app.post("/todos", async (req, res) => {
  const { user_id, title } = req.body;
  const todo = await createTodo(user_id, title);
  res.status(201).send(todo);
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});

//cd server
//yarn dev para correr el servidor

//para correr expo:
//cd client
//cd my-app
//npx expo start
//w para abrir en pagina web
