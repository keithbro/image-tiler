const { expect } = require('chai');
const { calculateTileDistances, TILE_SIZE } = require('../lib/planner');

describe('.calculateTileDistances', () => {
  describe("when the distance is less than the tile size", () => {
    it("instructs a single tile of that distance", () => {
      expect(calculateTileDistances(5)).to.deep.equal([5]);
    });
  });

  describe("when the distance is more than the tile size", () => {
    it("breaks the distances in to multiple tiles", () => {
      expect(calculateTileDistances(280)).to.deep.equal([TILE_SIZE, 24]);
    });
  });

  describe("when the distance is equal to the tile size", () => {
    it("breaks the distances in to multiple tiles", () => {
      expect(calculateTileDistances(TILE_SIZE)).to.deep.equal([TILE_SIZE]);
    });
  });
});