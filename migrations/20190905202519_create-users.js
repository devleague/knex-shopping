exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments(); // creates column id SERIAL PRIMARY KEY
    table.string("email").notNullable(); // creates column email, VARCHAR(255) NOT NULL
    table.string("password").notNullable(); // creates column password, VARCHAR(255) NOT NULL
    table.timestamps(true, true); // creates column created_at timestamp with time zone NOT NULL default now() and column updated_at timestamp with time zone NOT NULL default now()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
