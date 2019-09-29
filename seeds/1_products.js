exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products").insert([
        {
          title: "Apples",
          description: "Red delicious",
          inventory: 1,
          price: 11
        },
        {
          title: "Bananas",
          description: "Yellow bunches",
          inventory: 20,
          price: 12
        },
        {
          title: "Carrots",
          description: "Orange and crunchy",
          inventory: 300,
          price: 13
        },
        {
          title: "Dates",
          description: "The edible kind",
          inventory: 4000,
          price: 14
        },
        {
          title: "Eggs",
          description: "For breaking",
          inventory: 50000,
          price: 15
        },
        { title: "Figs", description: "Figgy", inventory: 600000, price: 16 },
        {
          title: "Grapes",
          description: "Red and green seedless",
          inventory: 7000000,
          price: 17
        },
        {
          title: "Hazelnuts",
          description: "Grown in Oregon",
          inventory: 80000000,
          price: 18
        }
      ]);
    });
};
