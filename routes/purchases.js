const express = require("express");
const db = require("../database");

const router = express.Router();

router.get("/:user_id", (req, res) => {
  db("purchases")
    .where({ user_id: req.params.user_id })
    .then(results => {
      if (results.length === 0) {
        res.status(500).json({ message: "User or purchases not found" });
      } else {
        res.json(results);
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
  db("purchases")
    .where({ user_id: req.params.user_id })
    .andWhere("created_at", "<", date)
    .then(results => {
      if (results.length === 0) {
        res.status(500).json({ message: "User or purchases not found" });
      } else {
        res.json(results);
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.post("/:user_id/:product_id", (req, res) => {
  db("users")
    .where({ id: req.params.user_id })
    .then(results => {
      if (results.length === 0) {
        res.status(500).json({ message: "User not found" });
      } else {
        db("products")
          .where({ id: req.params.product_id })
          .then(results => {
            if (results.length === 0) {
              res.status(500).json({ message: "Product not found" });
            } else {
              db("products")
                .where({ id: req.params.product_id })
                .then(results => {
                  if (results[0].inventory < 1) {
                    res.status(500).json({ message: "Insufficient inventory" });
                  } else {
                    db.transaction(result => {
                      db("purchases")
                        .insert({
                          user_id: req.params.user_id,
                          products_id: req.params.product_id
                        })
                        .then(results => {
                          let date = new Date().toISOString();
                          db("products")
                            .where({ id: req.params.product_id })
                            .decrement("inventory", 1)
                            .update({ updated_at: date }, "*")
                            .then(results => {
                              res.json({
                                message: "Purchase successful"
                              });
                            });
                        })
                        .then(db.commit)
                        .catch(db.rollback);
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
  db("purchases")
    .where({ user_id: req.params.user_id, products_id: req.params.product_id })
    .then(results => {
      if (results.length === 0) {
        res.status(500).json({ message: "Purchase not found" });
      } else {
        db.transaction(results => {
          db("purchases")
            .where({
              user_id: req.params.user_id,
              products_id: req.params.product_id
            })
            .del()
            .returning("*")
            .then(results => {
              let addBack = results.length;
              let date = new Date().toISOString();
              db("products")
                .where({ id: req.params.product_id })
                .increment("inventory", addBack)
                .update({ created_at: date })
                .then(results => {
                  res.json({ message: "Purchases deleted" });
                });
            })
            .then(db.commit)
            .catch(db.rollback);
        });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
