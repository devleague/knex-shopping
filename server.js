const express = require('express');
const knex = require('./database');
const users = require('./routes/users.js');
const products = require('./routes/products.js');
const carts = require('./routes/carts.js');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
//app.use('/users', users);
//app.use('/products', products);
//app.use('/carts', carts);
app.get('/', function (req, res) {
  //res.send('Smoke test');
  knex.select().from('products').then((result) => {
    res.send(result);
  })
});

app.listen(3000);

// const knex = require('./database'); 

// knex.select().from('users')
//   .then((result) => {
//     console.log(result);
//   })
