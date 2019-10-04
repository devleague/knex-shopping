const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/:user_id", (req, res) => {
  db.raw("SELECT * FROM users WHERE id = ?", req.params.user_id)
    .then(results => {
      if (results.rows.length === 0) {
        res.status(500).json({ message: "User not found" });
      } else {
        res.json(results.rows);
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/", (req, res) => {
  db.raw("SELECT * FROM users")
    .then(results => {
      res.json(results.rows);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/login", (req, res) => {
  db.raw("SELECT * FROM users WHERE email = ?", req.body.email)
    .then(results => {
      if (results.rows.length === 0) {
        res.status(500).json({ message: "User not found" });
      } else if (results.rows[0].password !== req.body.password) {
        res.status(500).json({ message: "Incorrect password" });
      } else res.json(results.rows);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/register", (req, res) => {
  db.raw("SELECT email FROM users WHERE email = ?", req.body.email)
    .then(results => {
      if (results.rows.length > 0) {
        res.status(500).json({ message: "User already exists" });
      } else if (!req.body.email || !req.body.password) {
        res.status(500).json({ message: "Must POST email and password" });
      } else {
        db.raw(
          "INSERT INTO users (email, password) VALUES (?, ?) RETURNING *",
          [req.body.email, req.body.password]
        ).then(results => {
          res.json(results.rows);
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.put("/:user_id/forgot-password", (req, res) => {
  db.raw(
    "UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *",
    [req.body.password, req.params.user_id]
  )
    .then(results => {
      res.json({ message: "New password created!" });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:user_id", (req, res) => {
  db.raw("SELECT * FROM users WHERE id = ?", [req.params.user_id])
    .then(results => {
      if (results.rows.length === 0) {
        res.status(500).json({ message: "User ID not found" });
      } else {
        db.raw("DELETE FROM users WHERE id = ? RETURNING *", [
          req.params.user_id
        ]).then(results => {
          res.json({
            message: `User id: ${results.rows[0].id} successfully deleted`
          });
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
