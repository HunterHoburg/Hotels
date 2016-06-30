var  Bookshelf = require('../config/db');

var User = Bookshelf.Model.extend({
  tableName: 'users'
});

module.exports = User;
