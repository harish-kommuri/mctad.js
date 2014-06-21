require('../../mctad');
var assert = require('chai').assert;

describe('factorial', function() {
  it('can return undefined given a negative number', function() {
    assert.isUndefined(mctad.factorial(-1));
  });

  it('can calculate 0!', function() {
    assert.equal(mctad.factorial(0), 1);
  });

  it('can calculate 1!', function() {
    assert.equal(mctad.factorial(1), 1);
  });

  it('can calculate 100!', function() {
    assert.equal(mctad.factorial(100), 9.33262154439441e+157);
  });

});
