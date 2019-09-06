exports.up = function(knex) {
  return knex.schema.createTable("carts", table => {
    table.increments(); // creates column id SERIAL PRIMARY KEY
    table.integer("user_id").notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("users");
    table.integer("products_id").notNullable();
    table
      .foreign("products_id")
      .references("id")
      .inTable("products");
    table.timestamps(true, true); // creates column created_at timestamp with time zone NOT NULL default now() and column updated_at timestamp with time zone NOT NULL default now()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("carts");
};
