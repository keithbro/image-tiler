const { expect } = require('chai');
const { levels } = require('../lib/pyramid');

describe('.levels', () => {
  describe("when the image is the size of one tile", () => {
    const image = { width: 256, height: 256 };

    it('returns an array of the levels', () => {
      expect(levels(image)).to.deep.equal([
        { zoom: 0, tiles: [{ x: 0, y: 0, width: 256, height: 256 }] },
      ]);
    });
  });
});