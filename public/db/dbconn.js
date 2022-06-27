const { ipcMain } = require("electron");
const sqlite3 = require("sqlite3").verbose();
const isDev = require("electron-is-dev");
const path = require("path");

let db = new sqlite3.Database(
  isDev
    ? path.join(__dirname, "../../db/todo.db") // my root folder if in dev mode
    : path.join(process.resourcesPath, "db/todo.db"),
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to todo database.");
  }
);

ipcMain.on("asynchronous-message", (event, arg) => {
  const sql = arg;

  const select = sql.split(" ")[0];

  if (select == "SELECT") {
    const stmt = db.prepare(sql);
    stmt.all((err, rows) => {
      event.reply("asynchronous-reply", (err && err.message) || rows);
    });
  } else {
    db.run(sql, (err, rows) => {
      event.reply("asynchronous-reply", (err && err.message) || rows);
    });
  }
});
