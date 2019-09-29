const express = require("express");

const router = express.Router();

router.get("/users/:user_id", (req, res) => {
  console.log("Get user by ID: " + req.params.user_id);
  console.log(req.method + " " + req.url);
  db.raw(`SELECT * FROM users WHERE user_id = ${req.params.user_id}`).then(
    results => {
      console.log(results.rows);
      if (!results) {
        res.json({ message: "User not found" });
      } else res.json(results.rows);
    }
  );
});
