<h1>Promises and KNEX</h1>
<h2>Promises</h2>
slides: [JavaScript Promises](https://slides.com/taesup/promises#/)
-  Promises create an IOU ticket for anything outside of it
-  `.then` takes the result of the promise and runs code after it, much like a callback function
- Promise.all ([array of promises]): a promise that wraps a bunch of other promises and passes all of the results from the array of promises into it's own then.
lecture: [YouTube](https://www.youtube.com/watch?v=C--oHP90Vj8&feature=em-share_video_user)
<h2>KNEX</h2>
- raw queries
  - `?` represent an item in the array passed into `knex.raw`
- SQL injection
- migrations: logs the history of code run and intelligently runs the code that has not yet been run
  - running a migration will run a batch of whatever hasn't been run before
  - if you rollback, it will rollback one batch, not one file
- seeds: ??
- `knex migrate:latest` runs unrun knex migrations
- `knex migrate:rollback` undos one batch
- `\dt shows list of relations;`
- `\select * from knex_migrations;`
- `\d+ users; select * from users;`
- `knex seed:make users` creates a new seed file
- `knex seed:run` runs all seed files (doesn't check if it was run again)
**`knex migrate` and `knex seed` need to be run before psql is run**
KNEX setup
1. git init
2. .gitignore
```
node_module;
.env;
```
3. npm init
4. git add ., git commit -m 'started project'
5. write .env file
```
DOCKERHUB_NAME=your docker user name
IMAGE_NAME=project name
IMAGE_VERSION=0.0.1
POSTGRES_HOST_PORT=5432
POSTGRES_CONTAINER_PORT=5432
POSTGRES_USER=username
POSTGRES_PASSWORD=password
POSTGRES_DB=database_name
```
6. write docker-compose.yml
```
version: "3"
services:
  postgres-primary-db:
    image: postgres:10.0-alpine
    env_file: .env
    volumes:
      - pg-data-volume:/var/lib/postgresql/data
    ports:
      - "${POSTGRES_HOST_PORT}:${POSTGRES_CONTAINER_PORT}"
    networks:
      - my-app-network
volumes:
  pg-data-volume:
networks:
  my-app-network:
```
7. start up database and access using psql to check if your database is running successfully
8. `npm install -S knex`
9. `npm install -g knex`
10. `npm install -S pg`
11. `npm install -S dotenv`
12. `knex init` <--creates knexfile.js
13. delete
```js
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
```
and add:
```js
const dotenv = require('dotenv').config();
//points to the .env file and saves it the key values into a variable that can be called process.env
```
12. change to match your `.env` file:
```js
database: 'my_database',
user: 'username',
password: 'password',
```
13. create new folder called `database` and add a file `index.js` and add following to create and export a database connection `knex`:
```js
const config = require("../knexfile");
const knex = require("knex")(config);
module.exports = knex;
```
14. create new file index.js and add:???
```js
const database = require (knex);
```
15. `knex migrate:make create-users`
16. open newly created file???
17. add to exports.up:
```js
return knex.schema.createTable('users', (table) = > {
         table.increments(); //creates 'id SERIAL PRIMARY KEY'
    table.string("username").notNullable(); //creates 'username VARCHAR(255) NOT NULL'
    table.timestamps(true, true); //first true means timestampz (timestamps with tz), second true sets default to now()
    //creates 'created_at timestamp with timezone NOT NULL default now()'
    //creates 'updated_at timestamp with timezone NULL default now()'
  }
  ```
18. add to exports.down:
```js
  return knex.schema.dropTable('users');
```
additional resources:
1. [GitHub - devleague/docker-knex](https://github.com/devleague/docker-knex)