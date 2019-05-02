
exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', (table) => {
    table.increments();
    table.string('title', 255).notNull();
    table.text('description').notNull();
    table.integer('inventory').notNull();
    table.decimal('price', 8, 2).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products');
};
