var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Hotel = require('../models/hotel');

var auth = function(req, res, next) {
  console.log(req.session);
  if (req.session && req.session.user === "danny@do.com")
    return next();
  else
    return res.sendStatus(401);
};


router.get('/', auth, function(req, res, next) {
  console.log('sessionnn', req.session);
  Hotel.fetchAll()
    .then(function(hotels) {
      res.render('hotels/index', {title: 'Hotel List', hotels: hotels.toJSON()});
    });
});

router.get('/new', auth, function(req, res, next) {
  res.render('hotels/new');
});

router.post('/', auth, function(req, res, next) {
  console.log(req.body);
  var hotel = new Hotel(req.body);
  hotel.save().then(function(hotel) {
    res.redirect('hotels');
  });
});

module.exports = router;
