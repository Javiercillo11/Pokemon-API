const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // tu usuario de MySQL
  password: "root", // tu contraseña de MySQL
  database: "pokedex" // tu base de datos
});

// Verificar conexión
db.connect(err => {
  if (err) {
    console.error("Error de conexión:", err);
    return;
  }
  console.log("✅ Conectado a MySQL");
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Ruta para obtener usuarios
app.get("/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error en la consulta" });
    }
    res.json(results);
  });
});

// Arrancar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
