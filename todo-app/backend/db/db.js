const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/todos.db");

// 테이블이 없을 경우 생성
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT
    )
  `);
});

module.exports = db;
