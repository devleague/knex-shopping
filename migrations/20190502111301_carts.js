
exports.up = function(knex, Promise) {
  return knex.schema.createTable('carts', (table) => {
    table.increments();
    table.integer('user_id').notNull();
    table.foreign('user_id').references('users.id');
    table.integer('products_id').notNull();
    table.foreign('products_id').references('products.id');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('carts');
};
