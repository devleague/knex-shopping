const express = require("express");
const bodyParser = require("body-parser");
const users = require("./routes/users.js");
const products = require("./routes/products.js");
const carts = require("./routes/carts.js");
const purchases = require("./routes/purchases.js");
const methodOverride = require("method-override");

const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded());

app.use(methodOverride("_method"));

app.use("/users", users);
app.use("/products", products);
app.use("/carts", carts);
app.use("/purchases", purchases);

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
