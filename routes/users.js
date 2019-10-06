const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/:user_id", (req, res) => {
  db("users")
    .where("id", req.params.user_id)
    .then(results => {
      if (results.length === 0) {
        res.status(500).json({ message: "User not found" });
      } else {
        res.json(results[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/", (req, res) => {
  db("users")
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/login", (req, res) => {
  db("users")
    .where("email", req.body.email)
    .then(results => {
      if (results.length === 0) {
        res.status(500).json({ message: "User not found" });
      } else if (results[0].password !== req.body.password) {
        res.status(500).json({ message: "Incorrect password" });
      } else res.json(results[0]);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/register", (req, res) => {
  db("users")
    .where("email", req.body.email)
    .then(results => {
      if (results.length > 0) {
        res.status(500).json({ message: "User already exists" });
      } else if (!req.body.email || !req.body.password) {
        res.status(500).json({ message: "Must POST email and password" });
      } else {
        db("users")
          .insert({ email: req.body.email, password: req.body.password }, "*")
          .then(results => {
            res.json(results[0]);
          });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.put("/:user_id/forgot-password", (req, res) => {
  db("users")
    .where("id", req.params.user_id)
    .then(results => {
      if (results.length === 0) {
        res.status(500).json({ message: "User not found" });
      } else {
        let date = new Date().toISOString();
        db("users")
          .where({ id: req.params.user_id })
          .update({ password: req.body.password, updated_at: date })
          .then(results => {
            res.json({ message: "New password created!" });
          })
          .catch(err => {
            res.status(500).json({ message: err.message });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:user_id", (req, res) => {
  db("users")
    .where({ id: req.params.user_id })
    .then(results => {
      if (results.length === 0) {
        res.status(500).json({ message: "User ID not found" });
      } else {
        db("users")
          .where({ id: req.params.user_id }, "*")
          .del()
          .returning("*")
          .then(results => {
            res.json({
              message: `User id: ${results[0].id} successfully deleted`
            });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
