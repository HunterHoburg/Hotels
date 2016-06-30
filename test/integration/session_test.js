var expect = require('chai').expect
var request = require('supertest');
var app = require('../../app');
var User = require('../../models/user');

beforeEach(function (done) {
  User.forge({}).fetchAll().then(function (collection) {
    collection.forEach(function (model) {
      model.destroy();
    });
    done();
  });
});

describe('Session', function() {
  it('logs in a user', function(done) {
    var user = {
      email: 'boorza@boo.com',
      password: 'booze'
    };

    new User(user).save()
      .then(function(model) {
        request(app).post('/sign-in')
        .send(user)
        .expect(function(response) {
          expect(response.header['location']).to.equal('/hotels');
        })
        .end(done);
      })
  });

})
