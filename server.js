const express = require("express");
const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, "teams.db"));

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS teams (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    data TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

app.use(express.json({ limit: "1mb" }));

// API routes

app.get("/api/teams", (req, res) => {
  const teams = db.prepare("SELECT id, name, created_at, updated_at FROM teams ORDER BY updated_at DESC").all();
  res.json(teams);
});

app.get("/api/teams/:id", (req, res) => {
  const team = db.prepare("SELECT * FROM teams WHERE id = ?").get(req.params.id);
  if (!team) return res.status(404).json({ error: "Team not found" });
  res.json({ ...team, data: JSON.parse(team.data) });
});

app.post("/api/teams", (req, res) => {
  const { name, data } = req.body;
  if (!name) return res.status(400).json({ error: "Team name is required" });

  const id = crypto.randomBytes(8).toString("hex");
  const dataStr = JSON.stringify(data);

  db.prepare("INSERT INTO teams (id, name, data) VALUES (?, ?, ?)").run(id, name, dataStr);
  const team = db.prepare("SELECT id, name, created_at, updated_at FROM teams WHERE id = ?").get(id);
  res.status(201).json(team);
});

app.put("/api/teams/:id", (req, res) => {
  const { name, data } = req.body;
  const existing = db.prepare("SELECT id FROM teams WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Team not found" });

  if (name && data) {
    db.prepare("UPDATE teams SET name = ?, data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(name, JSON.stringify(data), req.params.id);
  } else if (name) {
    db.prepare("UPDATE teams SET name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(name, req.params.id);
  } else if (data) {
    db.prepare("UPDATE teams SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(JSON.stringify(data), req.params.id);
  }

  const team = db.prepare("SELECT id, name, created_at, updated_at FROM teams WHERE id = ?").get(req.params.id);
  res.json(team);
});

app.delete("/api/teams/:id", (req, res) => {
  const result = db.prepare("DELETE FROM teams WHERE id = ?").run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: "Team not found" });
  res.status(204).end();
});

// Serve static files in production
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`PokeMMO Team Builder running on http://localhost:${PORT}`);
});
