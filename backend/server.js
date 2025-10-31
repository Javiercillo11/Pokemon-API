const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "pokedex"
});

db.connect(err => {
  if (err) {
    console.error("Error de conexión:", err);
    return;
  }
  console.log("✅ Conectado a MySQL");
});

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.get("/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error en la consulta" });
    }
    res.json(results);
  });
});

app.post("/registro", (req, res) => {
  const { nombre, email, password } = req.body;

  // Validación básica
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Faltan datos del usuario" });
  }

  const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";
  const values = [nombre, email, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ Error al insertar usuario:", err);
      return res.status(500).json({ error: "Error al registrar usuario" });
    }
    console.log("✅ Usuario insertado con ID:", result.insertId);
    res.status(201).json({
      message: "Usuario registrado correctamente",
      userId: result.insertId
    });
  });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
