const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/:user_id", (req, res) => {
  //   db.raw("SELECT * FROM carts", req.params.user_id)
  //     .then(results => {
  //       res.json(results.rows);
  //     })
  //     .catch(err => {
  //       res.status(500).json({ message: err.message });
  //     });
});

router.post("/:user_id/:products_id", (req, res) => {
  db.raw("INSERT INTO carts (user_id, products_id) VALUES (?, ?) RETURNING *", [
    req.params.user_id,
    req.params.products_id
  ])
    .then(results => {
      res.json({ success: true });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:user_id/:products_id", (req, res) => {
  db.raw("DELETE FROM carts WHERE user_id = ? AND products_id = ?", [
    req.params.user_id,
    req.params.products_id
  ])
    .then(results => {
      res.json({ success: true });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
