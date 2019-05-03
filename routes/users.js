const express = require('express');
const knex = require('../database');
const router = express.Router();

router.route('/:user_id')
  .get((req, res) => {
    knex.raw('SELECT * FROM users WHERE id = ?', [req.params.user_id])
    .then((result) => {
      if (result.rowCount <= 0){
        throw { message : 'User not found' };
      }
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
  });

router.route('/login')
  .post((req, res) => {
    knex.raw('SELECT * FROM users WHERE email = ?', [req.body.email])
    .then((result) => {
      if (result.rowCount <= 0){
        throw { message : 'User not found'};
      }
      if (result.rows[0].password !== req.body.password){
        throw { message : 'Incorrect password'}
      }
      res.send(result.rows);
    })
    .catch((err) => {
      res.send(err);
    });
  });

router.route('/register')
  // kept failing with using DEFAULT for id, until the fourth try.
  .post((req, res) => {
    knex.raw('SELECT * FROM users WHERE email = ?', [req.body.email])
      .then((result) => {
        if (result.rowCount > 0){
          throw { message : 'User already exists'};
        }
      })
    //   .then().knex.raw(`INSERT INTO users (id, email, password, created_at, updated_at)\
    //     VALUES\
    //     (DEFAULT, \'${req.body.email}\', \'${req.body.password}\', DEFAULT, DEFAULT)`)
    //   })
    
    // .then((result) => {
    //   res.send(result);
    // })
    // .catch((err) => {
    //   res.send(err);
    // })
  });


module.exports = router;