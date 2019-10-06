const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/:user_id", (req, res) => {
  db.select(
    "products.id",
    "products.title",
    "products.description",
    "products.inventory",
    "products.price"
  )
    .from("products")
    .leftJoin("carts", "products.id", "carts.products_id")
    .leftJoin("users", "carts.user_id", "users.id")
    .where({ "users.id": req.params.user_id })
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/:user_id/:products_id", (req, res) => {
  db("carts")
    .insert(
      { user_id: req.params.user_id, products_id: req.params.products_id },
      "*"
    )
    .then(results => {
      res.json({ success: true });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:user_id/:products_id", (req, res) => {
  db("carts")
    .where({ user_id: req.params.user_id, products_id: req.params.products_id })
    .del()
    .then(results => {
      res.json({ success: true });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
