const express = require('express');
const knex = require('./database');
const users = require('./routes/users.js');
const products = require('./routes/products.js');
const carts = require('./routes/carts.js');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use('/users', users);
//app.use('/products', products);
//app.use('/carts', carts);
app.get('/', function (req, res) {
  //let promise = new Promise(function(resolve, reject) {
    //resolve(
  //res.send(knex.raw('SELECT * FROM products'));

  knex.raw('SELECT * FROM products').then((result) => {
    res.send(result.rows);
  })
  .catch((err) => {
    res.send(err);
  });


  //});
  //promise.then(function(result){
    // res.send(result.rows);
  //});
  //promise
  // .catch(function(err){
  //   res.send(err);
  // });
});

// knex.raw returns promise.
// function x (result){
//   res.send(result.rows);
// }

// function y (err){

// }

app.listen(3000);