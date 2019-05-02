
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {id: 1, title: 'happiness', description: 'hard to find', inventory: 99, price: 99.99},
        {id: 2, title: 'sadness', description: 'easy to find', inventory: 99, price: 99.99},
        {id: 3, title: 'Loch Ness', description: 'don\'t know where to find', inventory: 1, price: 9999}
      ]);
    });
};
