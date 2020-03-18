const { expect } = require('chai');
const { calculateTileDistances, calculateMaxLevel, calculateTiles, calculatePyramid, TILE_SIZE } = require('../lib/planner');
const oneByOneImage = { width: 1, height: 1 };
const tileSizedImage = { width: TILE_SIZE, height: TILE_SIZE };

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
        expect(calculateMaxLevel(oneByOneImage)).to.deep.equal(0);
      });
    });

    describe("when the image matches the tile size", () => {
      it("instructs eight (2^8) levels", () => {
        expect(calculateMaxLevel(tileSizedImage)).to.deep.equal(8);
      });
    })

    describe("when the image has a width of 1", () => {
      it("bases the answer on the height", () => {
        expect(calculateMaxLevel({ width: 1, height: TILE_SIZE })).to.deep.equal(8);
      });
    })
  });

  describe("calculateTiles", () => {
    describe("when the image is a 1x1", () => {
      it("instructs a single 1x1 tile", () => {
        expect(calculateTiles(oneByOneImage)).to.deep.equal([
          { height: 1, width: 1, left: 0, top: 0, x: 0, y: 0 },
        ]);
      });
    });

    describe("when the image matches the tile size", () => {
      it("instructs a single full tile", () => {
        expect(calculateTiles(tileSizedImage)).to.deep.equal([
          { height: TILE_SIZE, width: TILE_SIZE, left: 0, top: 0, x: 0, y: 0 },
        ]);
      });
    })

    describe("when the image is bigger than a standard tile", () => {
      it("instructs four tiles of expected sizes", () => {
        expect(calculateTiles({ width: 290, height: 310 })).to.deep.equal([
          { height: TILE_SIZE, width: TILE_SIZE, left: 0, top: 0, x: 0, y: 0 },
          { height: 54, width: TILE_SIZE, left: 0, top: TILE_SIZE, x: 0, y: 1 },
          { height: TILE_SIZE, width: 34, left: TILE_SIZE, top: 0, x: 1, y: 0 },
          { height: 54, width: 34, left: TILE_SIZE, top: TILE_SIZE, x: 1, y: 1 },
        ]);
      });
    });
  });

  describe("calculatePyramid", () => {
    describe("when the image is a 1x1", () => {
      it("instructs a single 1x1 tile", () => {
        expect(calculatePyramid(oneByOneImage)).to.deep.equal({
          levels: [{ height: 1, width: 1, level: 0, tiles: [{ height: 1, width: 1, left: 0, top: 0, x: 0, y: 0 }] }],
        });
      });
    });

    describe("when the image is 7000x5000", () => {
      const pyramid = calculatePyramid({ width: 7000, height: 5000 });

      it("has 14 levels of zoom", () => expect(pyramid.levels.length).to.equal(14));
      
      it("level 10 has 4x3 tiles", () => {
        expect(pyramid.levels[10].level).to.equal(10);
        expect(pyramid.levels[10].tiles).to.deep.equal(
          [
            { x: 0, y: 0, left: 0, top: 0, width: 256, height: 256 },
            { x: 0, y: 1, left: 0, top: 256, width: 256, height: 256 },
            { x: 0, y: 2, left: 0, top: 512, width: 256, height: 113 },
            { x: 1, y: 0, left: 256, top: 0, width: 256, height: 256 },
            { x: 1, y: 1, left: 256, top: 256, width: 256, height: 256 },
            { x: 1, y: 2, left: 256, top: 512, width: 256, height: 113 },
            { x: 2, y: 0, left: 512, top: 0, width: 256, height: 256 },
            { x: 2, y: 1, left: 512, top: 256, width: 256, height: 256 },
            { x: 2, y: 2, left: 512, top: 512, width: 256, height: 113 },
            { x: 3, y: 0, left: 768, top: 0, width: 107, height: 256 },
            { x: 3, y: 1, left: 768, top: 256, width: 107, height: 256 },
            { x: 3, y: 2, left: 768, top: 512, width: 107, height: 113 }
          ]
        )
      });
    })
  });

});