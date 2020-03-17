const { expect } = require('chai');
const { levels } = require('../lib/pyramid');

describe('.levels', () => {
  it('returns an array of the levels for an image', () => {
    const image = { width: 1000, height: 1000 };

    expect(levels(image)).to.equal([
      { width: 1000, height: 1000 },
      { width: 500, height: 250 },
      { width: 500, height: 250 },
      { width: 500, height: 250 },
    ]);
  });
});