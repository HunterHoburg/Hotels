var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.session) {
    req.session.destroy();
    res.redirect('/sign-in');
  }
})

module.exports = router;
