const { expect } = require('chai');
const { calculateTileDistances, calculateMaxLevel, TILE_SIZE } = require('../lib/planner');

describe('planner', () => {
  describe('calculateTileDistances', () => {
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

  describe("calculateMaxLevel", () => {
    describe("when the image is a 1x1", () => {
      it("instructs a single level", () => {
        expect(calculateMaxLevel({ width: 1, height: 1 })).to.deep.equal(0);
      });
    });

    describe("when the image matches the tile size", () => {
      it("instructs eight (2^8) levels", () => {
        expect(calculateMaxLevel({ width: TILE_SIZE, height: TILE_SIZE })).to.deep.equal(8);
      });
    })

    describe("when the image has a width of 1", () => {
      it("bases the answer on the height", () => {
        expect(calculateMaxLevel({ width: 1, height: TILE_SIZE })).to.deep.equal(8);
      });
    })
  });
});