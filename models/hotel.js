var  Bookshelf = require('../config/db');

var Hotel = Bookshelf.Model.extend({
  tableName: 'hotels'
});

module.exports = Hotel;
