
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, email: 'red@black.com', password: 'one'},
        {id: 2, email: 'green@gray.com', password: 'two'},
        {id: 3, email: 'blue@white.com', password: 'three'}
      ]);
    });
};
