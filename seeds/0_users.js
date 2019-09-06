exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { email: "foo@bar.com", password: "12345" },
        { email: "user@email.com", password: "password" },
        { email: "satan@hell.com", password: "666" }
      ]);
    });
};
