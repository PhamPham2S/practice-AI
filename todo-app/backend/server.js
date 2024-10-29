const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db/db"); // SQLite 설정 모듈

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("../frontend"));

// To-Do 목록 가져오기
app.get("/api/todos", (req, res) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ todos: rows });
  });
});

// 새로운 To-Do 추가
app.post("/api/todos", (req, res) => {
  const { task } = req.body;
  db.run("INSERT INTO todos (task) VALUES (?)", [task], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// To-Do 삭제
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM todos WHERE id = ?", id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ deletedID: id });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
