const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

let port = 8080;
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "join_us",
  password: "Smriti@264",
});

app.get("/", (req, res) => {
  let q = "SELECT COUNT(*) AS count FROM users";
  connection.query(q, (err, results) => {
    if (err) throw err;
    var count = results[0].count;
    res.render("home", { count });
  });
});

app.post("/register", (req, res) => {
  var q = "INSERT INTO users SET ?";
  let person = { email: req.body.email };
  connection.query(q, person, (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
