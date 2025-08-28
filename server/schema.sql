CREATE DATABASE todo_app;

USE todo_app;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255)
);

CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    completed BOOLEAN DEFAULT false,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE shared_todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    todo_id INT,
    user_id INT,
    shared_with_id INT,
    FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE
);

--insertar dos usuarios 
INSERT INTO users (name, email, password) VALUES ('Marcelo', 'user1@example.com', 'password1');
INSERT INTO users (name, email, password) VALUES ('Alberto', 'user3@example.com', 'password2');

--insertar tareas para la tabla todos
INSERT INTO todos (title, user_id)
VALUES 
("🏋️ Ir al gimnasio en la mañana", 1),
("📚 Leer un capítulo de un libro", 1),
("🛒 Hacer la compra semanal", 1),
("💻 Terminar el proyecto de programación", 1),
("🍳 Cocinar una nueva receta", 1),
("🚶‍♂️ Salir a caminar por el parque", 1),
("🎻 Practicar violin", 1),
("🧹 Limpiar y organizar la casa", 1),
("📞 Llamar a un amigo o familiar", 1),
("🛌 dormir 8 hs diarias", 1);

--COMPARTIR TAREA 1 DEL USUARIO 1 AL USUARIO 2
INSERT INTO shared_todos (todo_id, user_id, shared_with_id)
VALUES (1, 1, 2);

--SELECCIONAR TODAS LAS TAREAS QUE ESTEN COMPARTIDOS CON EL USUARIO POR SU ID
SELECT todos.*, shared_todos.shared_with_id
FROM todos
LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
WHERE todos.user_id = [user_id] OR shared_todos.shared_with_id = [user_id];