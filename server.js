const express = require("express");
const bodyParser = require("body-parser");
const users = require("routes/users.js");
const products = require("routes/products.js");
const carts = require("routes/carts.js");
const db = require("./database");
const app = express();

const PORT = 3000;

app.use(bodyParser.json());

app.use("/users", users);
app.use("/products", products);
app.use("/carts", carts);

app.get("/users", (req, res) => {});

app.get("/products", (req, res) => {});

app.get("/carts", (req, res) => {});

app.get("/", (req, res) => {
  db.raw("SELECT * FROM users").then(results => {
    console.log(results.rows);
    res.json(results.rows);
  });
});

app.post("/users", (req, res) => {
  const body = req.body;
  const username = body.username;

  console.log(username);

  db.raw("INSERT INTO users (username) VALUES(?) RETURNING *", [username])
    .then(results => {
      console.log(results.rows);
      res.status(200).json({ user: results.rows[0] });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
