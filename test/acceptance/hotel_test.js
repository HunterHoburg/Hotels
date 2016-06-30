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

describe('/hotels', function() {
  it('should have a list of hotels', function() {
    browser.get('/hotels');
    element.all(by.tagName('li')).count().then(function(num){
      expect(num).to.equal(1);
    });
  });

  it('should have a link to make a new hotel', function() {
    browser.get('/hotels');
    element.all(by.id('create-hotel')).count().then(function(num) {
      expect(num).to.equal(1);
    });
  });

  it('should take me to the /create page when I click on the new hotel link', function() {
    browser.get('/hotels');
    element(by.id('create-hotel')).click();

    browser.getCurrentUrl().then(function(url) {
      expect(url).to.equal(browser.baseUrl + '/hotels/new')
    });
  });

  it('/hotels/new has a form to create a hotel', function() {
    browser.get('/hotels/new');
    var name = element(by.id('hotel-name-input'));
    name.isPresent().then(function(exists) {
      expect(exists).to.be.true;
    });

    var location = element(by.id('hotel-location-input'));
    location.isPresent().then(function(exists) {
      expect(exists).to.be.true;
    });
  });

  it('/hotels/new will post a new hotel succinctly', function() {
    browser.get('/hotels/new');

    element(by.id('hotel-name-input')).sendKeys('user@gmail.com');
    element(by.id('hotel-location-input')).sendKeys('password123');
    element(by.id('submit-btn')).click();

    browser.getCurrentUrl().then(function(url) {
      expect(url).to.equal(browser.baseUrl + '/hotels');
    });
  })
});
