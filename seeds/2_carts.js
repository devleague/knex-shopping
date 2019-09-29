exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("carts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("carts").insert([
        { user_id: 1, products_id: 1 },
        { user_id: 2, products_id: 2 },
        { user_id: 3, products_id: 3 }
      ]);
    });
};
