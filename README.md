# Knex Shopping

## Objective

We will be building a RESTful, JSON resource API shopping cart application! This project will be entirely back-end, meaning we can test all of our endpoints through `Postman` app.

## Requirements / Tools
- PostgreSQL
- Node.js / Express.js
- Knex.js (built-in library methods)

---

## Tables

We will be building and utilizing 3 relational tables - `Users`, `Products` and `Cart` tables. Create a UML diagram on table relations and have it reviewed by intructor or TA.

### `Users`

| Column        | Type          |
| ------------- |:-------------:|
| id            | Serial (increments) |
| email         | String (255)  |
| password      | String (255)  |
| created_at    | Date (timestamp) |
| updated_at    | Date (timestamp) |

### `Products`

| Column        | Type          |
| ------------- |:-------------:|
| id            | Serial (increments) |
| title         | String (255) |
| description   | Text         |
| inventory     | Integer       |
| price         | Decimal(8, 2) |
| created_at    | Date (timestamp) |
| updated_at    | Date (timestamp) |

### `Cart`

| Column        | Type          |
| ------------- |:-------------:|
| id      | Serial (increments) |
| user_id      | Integer (FK - ref. Users) |
| products_id  | Integer (FK - ref. Products) |
| created_at   | Date (timestamp) |
| updated_at   | Date (timestamp) |

---

## Setup

### Node.js / Express Setup
1. Fork and clone and initialize with `npm`.
2. `touch server.js` in root of project.
3. Install the following via `npm`
    - express
    - body-parser
    - knex
    - pg
4. Setup bare-bones express server with body-paser middleware in `server.js`, listening on port 3000.
5. `mkdir routes` in the root of your project.
6. Create route files in `routes` directory.
    - `touch routes/users.js`
    - `touch routes/products.js`
    - `touch routes/cart.js`
7. Mount endpoints in `server.js`related to route file.
    - `routes/users.js`    --> `http://localhost:3000/users`
    - `routes/products.js` --> `http://localhost:3000/products`
    - `routes/cart.js`     --> `http://localhost:3000/cart`

### Knex setup

Follow along with the below instructions for setting up knex.js. You can also refer to the [knex setup gist](https://gist.github.com/NigelEarle/80150ff1c50031e59b872baf0e474977) for a more in-depth explanation.

1. `touch knexfile.js` in root of project and create your enviroment configuration.
2. `mkdir` migrations and seeds directories in root of project. (Be sure to reference these directory paths in `migration` and `seed` config objects in `knexfile.js`)
3. Create migration, seed scripts to create tables and popluate with data. (Reference [migration and seed gist](https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261) for instructions)
4. Run migration and seed scripts

---

## Endpoints

Use the built in `knex.js` query methods to perform CRUD operations on our DB. Reference the [knex.js documentation](http://knexjs.org/) for usage! All endpoints should except either `x-www-form-urlencoded` or `raw JSON` via Postman and respond with `JSON`.

### Users

- `GET - /users/:user_id`

    - Fetch user by id - reference by `req.params.user_id`.
        - If user id not found, respond with `{ message: 'User not found' }`
        - If successful, respond with user object.
- `POST - /users/login`
    - Request body should include `email` and `password` fields to authenticate existing user. Query should find user by `req.body.email` and check existing password against `req.body.password`.
        - If email not found, respond with `{ message: 'User not found' }`
        - If passwords don't match, respond with `{ message: 'Incorrect password' }`
        - If successful, respond with user object.

- `POST - /users/register`
    - Request body should include `email` and `password` fields to create a new user.
        - If email already exists, repond with `{ message: 'User already exists' }`
        - If successful, respond with posted user object from db.
- `PUT - /users/:user_id/forgot-password`
    - Request body should include new password - reference user by `req.params.user_id`.
        - If successful, `{ message: 'New password created!' }`
- `DELETE - /users/:user_id/delete`
    - Delete user, reference by `req.params.user_id`.
        - If user id not found, respond with `{ message: 'User ID not found' }`
        - If successful, respond with `{ message: 'User id: ${user_id} successfully deleted' }`

---

### Products

- `GET - /products`

    - Fetch all products from db.
        - If successful, respond with all products.

- `GET - /products/:product_id`

    - Fetch single product, reference by `req.params.product_id`.
        - If product id not found, respond with `{ message: 'Product not found' }`
        - If successful, respond with product object from db.

- `POST - /products/new`

    - Request body should include all fields required by products table (`title`, `description`, `inventory`, `price`).
        - If any required field is missing from request body, responds with `{ message: 'Must POST all product fields' }`
        - If successful, respond with posted product from db.

- `PUT - /products/:product_id/update`

    - Request body should include any and all changes specific to existing columns in db. Product can be referenced by `req.params.id`.
        - If successful, respond with `{ message: 'Product: ${product_id} has been updated' }`

- `DELETE - /products/:product_id/delete`

    - Delete product by `req.params.product_id`
        - If product_id not found, respond with `{ message: 'Product id: ${product_id} not found' } `
        - If successful, repsond with `{ message: 'Product id: ${product_id} successfully deleted' }`

---

### Cart

- `GET - /cart/:user_id`

    - Fetch all products, reference by `req.params.user_id`, from products through cart.
        - If successful, resond with all products matching user id through cart

- `POST - /cart/:user_id/:product_id`

    - Insert into Cart table with `req.params.user_id` and `req.params.product_id` valid foreign keys.
        - If successful, respond with `{ success: true }`

- `DELETE - /cart/:user_id/:product_id`
    - Remove record from db where user id and product id match `req.params`
        - If successful, respond with `{ success: true }`

---

# Stretch Goals

Create a `Purchases/Ledger` table to track purchases by `user_id`.
GET purchases by user id
GET user id purchases within timeframe - month, year
POST checkout endpoint ref. purchases table
should decrement inventory of product

### Example Purchases/Ledger Table

| Column        | Type          |
| ------------- |:-------------:|
| id      | Serial (increments) |
| user_id      | Integer (FK - ref. Users) |
| products_id  | Integer (FK - ref. Products) |
| created_at   | Date (timestamp) |
