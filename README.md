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
| email         | String (255) |
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

#### Node.js / Express Setup
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

#### Knex setup
1. `touch knexfile.js` in root of project and create your enviroment configuration.
2. `mkdir` migrations and seeds directories in root of project. (Be sure to reference these directory paths in `migration` and `seed` config objects in `knexfile.js`)
3. Create migration, seed scripts to create tables and popluate with data. (Reference [migration and seed gist](https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261) for instructions)
4. Run migration and seed scripts

---

## Endpoints

Use the built in `knex.js` query methods to perform CRUD operations on our DB. Reference the [knex.js documentation](http://knexjs.org/) for usage!

### Users

- `GET - /users/:user_id`

- `POST - /users/login`

- `POST - /users/register`

- `PUT - /users/:user_id/${email || password}`

- `DELETE - /users/:user_id/delete`

---

### Products

- `GET - /products`

- `GET - /products/:id`

- `POST - /products/new`

- `PUT - /products/:product_id/update`

- `DELETE - /products/:product_id/delete`

---

### Cart

- `GET - /cart/:user_id`

- `POST - /cart/:user_id/:product_id`

- `DELETE - /cart/:user_id/:product_id`

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
