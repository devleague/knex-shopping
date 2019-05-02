const config = require('../knexfile');
module.exports = require('knex')(config);  //index file gives back a databae connection