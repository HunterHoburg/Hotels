var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function(req, res, next) {
  var user = {
    email: req.body.email,
    password: req.body.password
  };

  console.log('here are the params', user);

  User.forge(user)
    .fetch()
    .then(function(user) {
      if (user) {
        console.log('is there a session?', req.session);
        req.session.user = req.body.email;
        res.redirect('/hotels');
      } else {
        console.log('no user exists');
        res.redirect('/sign-in');
      }
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('sessions/index', { title: 'Sign In' });
});

module.exports = router;
