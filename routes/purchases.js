const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/:user_id", (req, res) => {
  db.raw("SELECT * FROM purchases WHERE user_id = ?", [req.params.user_id])
    .then(results => {
      if (results.rows.length === 0) {
        res.status(500).json({ message: "User or purchases not found" });
      } else {
        res.json(results.rows);
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/:user_id/:year/:month/:day", (req, res) => {
  let date = new Date(
    `${req.params.year}-${req.params.month}-${req.params.day}`
  ).toISOString();
  db.raw("SELECT * FROM purchases WHERE user_id = ? AND created_at < ?", [
    req.params.user_id,
    date
  ])
    .then(results => {
      if (results.rows.length === 0) {
        res.status(500).json({ message: "User or purchases not found" });
      } else {
        res.json(results.rows);
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/:user_id/:product_id", (req, res) => {
  db.raw("SELECT * FROM users WHERE id = ?", req.params.user_id)
    .then(results => {
      if (results.rows.length === 0) {
        res.status(500).json({ message: "User not found" });
      } else {
        db.raw(
          "SELECT * FROM products WHERE id = ?",
          req.params.product_id
        ).then(results => {
          if (results.rows.length === 0) {
            res.status(500).json({ message: "Product not found" });
          } else {
            db.raw("SELECT inventory FROM products WHERE id = ?", [
              req.params.product_id
            ]).then(results => {
              console.log(results.rows[0].inventory);
              if (results.rows[0].inventory < 1) {
                res.status(500).json({ message: "Insufficient inventory" });
              } else {
                db.raw(
                  "INSERT INTO purchases (user_id, products_id) VALUES (?, ?) RETURNING *",
                  [req.params.user_id, req.params.product_id]
                ).then(results => {
                  db.raw(
                    "UPDATE products SET inventory = inventory - 1, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *",
                    [req.params.product_id]
                  ).then(results => {
                    console.log(results.rows);
                    res.json({
                      message: "Purchase successful"
                    });
                  });
                });
              }
            });
          }
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:user_id/:product_id", (req, res) => {
  db.raw("SELECT * FROM purchases WHERE user_id = ? AND products_id = ?", [
    req.params.user_id,
    req.params.product_id
  ])
    .then(results => {
      if (results.rows.length === 0) {
        res.status(500).json({ message: "Purchase not found" });
      } else {
        db.raw(
          "DELETE FROM purchases WHERE user_id = ? AND products_id = ? RETURNING *",
          [req.params.user_id, req.params.product_id]
        ).then(results => {
          db.raw(
            "UPDATE products SET inventory = inventory + ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING *",
            [results.rows.length, req.params.product_id]
          ).then(results => {
            res.json({ message: "Purchases deleted" });
          });
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
