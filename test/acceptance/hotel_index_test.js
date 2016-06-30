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

describe('/index', function() {
  describe('When I visit index, I see two anchor links for signing in and signing up', function() {
    it('has a sign in link', function() {
      browser.get('/');
      element.all(by.tagName('a')).count()
        .then(function(count) {
          expect(count).to.equal(2);
      });
    });

    it('has a title', function() {
      browser.get('/');
      element(by.tagName('h1')).getText().then(function(text) {
        expect(text).to.equal('Welcome to the Hotel List');
      });
    });

    it('takes me to /sign-in when I click on the sign in link', function() {
      browser.get('/');
      element(by.id('sign-in')).click();
      browser.getCurrentUrl().then(function(url) {
        expect(url).to.equal(browser.baseUrl + '/sign-in');
      });
    });
  });
});
