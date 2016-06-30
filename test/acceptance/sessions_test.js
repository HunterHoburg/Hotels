require('../helper');

var http = require('http'),
    server;

before(function() {
  server = http.createServer(require('../../app'));
  server.listen(0);
  browser.baseUrl = 'http://localhost:' + server.address().port;
});

beforeEach(function() {
  return browser.ignoreSynchronization = true;
});

after(function(){
  server.close();
});

describe('sessions', function() {
  it('when I go to /sign-in I see two input fields for email and password and a button to sign in', function() {
    browser.get('/sign-in');
    var email = element(by.id('email-input'));
    email.isPresent().then(function(exists) {
      expect(exists).to.be.true;
    });

    var password = element(by.id('password-input'));
    password.isPresent().then(function(exists) {
      expect(exists).to.be.true;
    });

    var button = element(by.id('submit-btn'));
    button.isPresent().then(function(exists) {
      expect(exists).to.be.true;
    });
  });

  it('when I sign in, a session gets created', function() {
    browser.get('/sign-in');
    element(by.id('email-input')).sendKeys('user@gmail.com');
    element(by.id('password-input')).sendKeys('password123');
    element(by.id('submit-btn')).click();

    browser.getCurrentUrl().then(function(url) {
      expect(url).to.equal(browser.baseUrl + '/hotels');
    });
  });
});
