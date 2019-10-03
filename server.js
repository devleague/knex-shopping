const express = require("express");
const bodyParser = require("body-parser");
const users = require("./routes/users.js");
const products = require("./routes/products.js");
const carts = require("./routes/carts.js");
const db = require("./database");
const methodOverride = require("method-override");

const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded());

app.use(methodOverride("_method"));

app.use("/users", users);
// app.use("/products", products);
// app.use("/carts", carts);

// app.get("/users/:user_id", (req, res) => {
//   db.raw("SELECT * FROM users WHERE id = ?", req.params.user_id).then(
//     results => {
//       if (results.rows.length === 0) {
//         res.status(500).json({ message: "User not found" });
//       } else {
//         res.json(results.rows);
//       }
//     }
//   );
// });

// app.get("/users", (req, res) => {
//   db.raw("SELECT * FROM users").then(results => {
//     res.json(results.rows);
//   });
// });

// app.post("/users/login", (req, res) => {
//   db.raw("SELECT * FROM users WHERE email = ?", req.body.email).then(
//     results => {
//       if (results.rows.length === 0) {
//         res.status(500).json({ message: "User not found" });
//       } else if (results.rows[0].password !== req.body.password) {
//         res.status(500).json({ message: "Incorrect password" });
//       } else res.json(results.rows);
//     }
//   );
// });

// app.post("/users/register", (req, res) => {
//   db.raw("SELECT email FROM users WHERE email = ?", req.body.email).then(
//     results => {
//       if (results.rows.length > 0) {
//         res.status(500).json({ message: "User already exists" });
//       } else {
//         db.raw(
//           "INSERT INTO users (email, password) VALUES (?, ?) RETURNING *",
//           [req.body.email, req.body.password]
//         ).then(results => {
//           res.json(results.rows);
//         });
//       }
//     }
//   );
// });

// app.put("/users/:user_id/forgot-password", (req, res) => {
//   db.raw("UPDATE users SET password = ? WHERE id = ? RETURNING *", [
//     req.body.password,
//     req.params.user_id
//   ]).then(results => {
//     res.json({ message: "New password created!" });
//   });
// });

// app.delete("/users/:user_id", (req, res) => {
//   db.raw("SELECT * FROM users WHERE id = ?", [req.params.user_id]).then(
//     results => {
//       if (results.rows.length === 0) {
//         res.status(500).json({ message: "User ID not found" });
//       } else {
//         db.raw("DELETE FROM users WHERE id = ? RETURNING *", [
//           req.params.user_id
//         ]).then(results => {
//           res.json({
//             message: `User id: ${results.rows[0].id} successfully deleted`
//           });
//         });
//       }
//     }
//   );
// });

app.get("/products", (req, res) => {});

app.get("/carts", (req, res) => {});

// app.post("/users", (req, res) => {
//   const body = req.body;
//   const username = body.username;

//   console.log(username);

//   db.raw("INSERT INTO users (username) VALUES(?) RETURNING *", [username])
//     .then(results => {
//       console.log(results.rows);
//       res.status(200).json({ user: results.rows[0] });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: err.message });
//     });
// });

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
