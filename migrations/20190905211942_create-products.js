exports.up = function(knex) {
  return knex.schema.createTable("products", table => {
    table.increments(); // creates column id SERIAL PRIMARY KEY
    table.string("title").notNullable(); // creates column title, VARCHAR(255) NOT NULL
    table.text("description").notNullable();
    table.integer("inventory").notNullable();
    table.decimal("price").notNullable();
    table.timestamps(true, true); // creates column created_at timestamp with time zone NOT NULL default now() and column updated_at timestamp with time zone NOT NULL default now()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("products");
};
