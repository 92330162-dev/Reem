import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* =============================
   Multer storage
============================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "_" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

/* =============================
   MySQL connection (Railway)
============================= */
const db = mysql
  .createConnection(process.env.DATABASE_URL)
  .promise();

/* =============================
   REGISTER ROUTES
============================= */

// GET all registered users
app.get("/register", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM register");
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET user by id
app.get("/register/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query(
      "SELECT * FROM register WHERE id = ?",
      [id]
    );
    if (rows.length > 0) return res.json(rows[0]);

    res.status(404).json({ message: "Record not found" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// INSERT new register
app.post("/register", async (req, res) => {
  const { full_name, phone, email, age, country, language, level } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO register 
      (full_name, phone, email, age, country, language, level) 
      VALUES (?,?,?,?,?,?,?)`,
      [full_name, phone, email, age, country, language, level]
    );
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE register
app.put("/register/:id", async (req, res) => {
  const id = req.params.id;
  const { full_name, phone, email, age, country, language, level } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE register 
       SET full_name=?, phone=?, email=?, age=?, country=?, language=?, level=?
       WHERE id=?`,
      [full_name, phone, email, age, country, language, level, id]
    );
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE register
app.delete("/register/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query(
      "DELETE FROM register WHERE id = ?",
      [id]
    );
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =============================
   COUNTRIES
============================= */
app.get("/countries", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM countries");
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =============================
   LANGUAGES
============================= */

// GET all languages
app.get("/languages", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM languages");
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET language by id
app.get("/languages/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const [rows] = await db.query(
      "SELECT * FROM languages WHERE id = ?",
      [id]
    );
    if (rows.length > 0) return res.json(rows[0]);

    res.status(404).json({ message: "Language not found" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// INSERT language
app.post("/languages", async (req, res) => {
  const { name, flag, speakers, info } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO languages (name, flag, speakers, info) VALUES (?,?,?,?)",
      [name, flag, speakers, info]
    );
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE language
app.put("/languages/:id", async (req, res) => {
  const id = req.params.id;
  const { name, flag, speakers, info } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE languages SET name=?, flag=?, speakers=?, info=? WHERE id=?",
      [name, flag, speakers, info, id]
    );
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE language
app.delete("/languages/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const [result] = await db.query(
      "DELETE FROM languages WHERE id = ?",
      [id]
    );
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* =============================
   START SERVER
============================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
