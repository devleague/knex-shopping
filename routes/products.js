const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/:product_id", (req, res) => {
  db("products")
    .where({ id: req.params.product_id })
    .then(results => {
      if (results.length === 0) {
        res.status(500).json({ message: "Product not found" });
      } else {
        res.json(results[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/", (req, res) => {
  db("products")
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/new", (req, res) => {
  db("products")
    .where({ title: req.body.title })
    .then(results => {
      if (results.length > 0) {
        res.status(500).json({ message: "Product already exists" });
      } else if (
        !req.body.title ||
        !req.body.description ||
        !req.body.inventory ||
        !req.body.price
      ) {
        res.status(500).json({ message: "Must POST all product fields" });
      } else {
        db("products")
          .insert(
            {
              title: req.body.title,
              description: req.body.description,
              inventory: parseInt(req.body.inventory),
              price: parseInt(req.body.price)
            },
            "*"
          )
          .then(results => {
            res.json(results[0]);
          });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.put("/:product_id", (req, res) => {
  db("products")
    .where({ id: req.params.product_id })
    .then(results => {
      if (results.length === 0) {
        res
          .status(500)
          .json({ message: `Product ${req.params.product_id} not found` });
      } else if (
        !req.body.title &&
        !req.body.description &&
        !req.body.inventory &&
        !req.body.price
      ) {
        res
          .status(500)
          .json({ message: "Must PUT at least one product field" });
      } else {
        let date = new Date().toISOString();
        db("products")
          .where({ id: req.params.product_id })
          .update(
            {
              title: req.body.title,
              description: req.body.description,
              inventory: req.body.inventory,
              price: req.body.price,
              updated_at: date
            },
            "id"
          )
          .then(results => {
            res.json({
              message: `Product: ${results} has been updated`
            });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:product_id", (req, res) => {
  db("products")
    .where({ id: req.params.product_id })
    .then(results => {
      if (results.length === 0) {
        res
          .status(500)
          .json({ message: `Product ${req.params.product_id} not found` });
      } else {
        db("products")
          .where({ id: req.params.product_id }, "*")
          .del()
          .returning("*")
          .then(results => {
            res.json({
              message: `Product id: ${results[0].id} successfully deleted`
            });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
