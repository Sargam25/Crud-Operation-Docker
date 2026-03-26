import express from "express";
import cors from "cors";
import mysql from "mysql2/promise"; // Use promise-based mysql2

const app = express();
const port = 5050;

app.use(cors());
app.use(express.json());

// ---------------------------
// MySQL connection with retry
// ---------------------------
let connection;

async function connectWithRetry(retries = 10) {
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "mysql",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_NAME || "crud_db",
    });
    console.log("✅ Connected to MySQL");
  } catch (err) {
    console.log(
      `❌ MySQL not ready, retrying in 5 seconds... (${retries} attempts left)`
    );
    if (retries > 0) {
      setTimeout(() => connectWithRetry(retries - 1), 5000);
    } else {
      console.error("💥 Could not connect to MySQL. Exiting...");
      process.exit(1);
    }
  }
}

// Start initial connection
connectWithRetry();

// ---------------------------
// Routes
// ---------------------------

// Get all users
app.get("/", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM user");
    res.json(rows);
  } catch (err) {
    console.log("MYSQL ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Create user
app.post("/userRegistration", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const query = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
    const [result] = await connection.query(query, [name, email, password]);
    res.json({ message: "User created", insertId: result.insertId });
  } catch (err) {
    console.log("MYSQL ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Read user by ID
app.get("/read/:id", async (req, res) => {
  try {
    const [rows] = await connection.query(
      "SELECT * FROM user WHERE id = ?",
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    console.log("MYSQL ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Update user
app.put("/update/:id", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const query = "UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?";
    const [result] = await connection.query(query, [
      name,
      email,
      password,
      req.params.id,
    ]);
    res.json({ message: "User updated", affectedRows: result.affectedRows });
  } catch (err) {
    console.log("MYSQL ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// Delete user
app.delete("/delete/:id", async (req, res) => {
  try {
    const [result] = await connection.query("DELETE FROM user WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ message: "User deleted", affectedRows: result.affectedRows });
  } catch (err) {
    console.log("MYSQL ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// ---------------------------
// Start Express server
// ---------------------------
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Server listening on port : ${port}`);
});
