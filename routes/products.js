const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/:product_id", (req, res) => {
  db.raw("SELECT * FROM products WHERE id = ?", req.params.product_id)
    .then(results => {
      if (results.rows.length === 0) {
        res.status(500).json({ message: "Product not found" });
      } else {
        res.json(results.rows);
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/", (req, res) => {
  db.raw("SELECT * FROM products")
    .then(results => {
      res.json(results.rows);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/new", (req, res) => {
  db.raw("SELECT id FROM products WHERE title = ?", req.body.title)
    .then(results => {
      if (results.rows.length > 0) {
        res.status(500).json({ message: "Product already exists" });
      } else if (
        !req.body.title ||
        !req.body.description ||
        !req.body.inventory ||
        !req.body.price
      ) {
        res.status(500).json({ message: "Must POST all product fields" });
      } else {
        db.raw(
          "INSERT INTO products (title, description, inventory, price) VALUES (?, ?, ?, ?) RETURNING *",
          [
            req.body.title,
            req.body.description,
            parseInt(req.body.inventory),
            parseInt(req.body.price)
          ]
        ).then(results => {
          res.json(results.rows);
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
