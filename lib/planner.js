const TILE_SIZE = 256;

/**
 * Calculates the tile distances (either width or height) given the image
 * width or height.
 * 
 * @param {int} imageDistance 
 */
const calculateTileDistances = (imageDistance) => {
  const tileDistances = [];

  while (imageDistance > 0) {
    const tileDistance = imageDistance > TILE_SIZE ? TILE_SIZE : imageDistance;
    tileDistances.push(tileDistance);
    imageDistance = imageDistance - tileDistance;
  }

  return tileDistances;
}

/**
 * Calculates the maximum (highest-numbered) level, given the image dimensions.
 * 
 * @param {int} width
 * @param {int} height
 */
const calculateMaxLevel = ({ width, height }) => {
  let distance = width > height ? width : height;
  let level = 0;

  while (distance > 1) {
    distance = distance / 2;
    level++;
  }

  return level;
};

/**
 * Calculates the tiles and their properties that
 * would be required to cover an image.
 * 
 * @param {int} width
 * @param {int} height
 */
const calculateTiles = ({ width, height }) => {
  const widths = calculateTileDistances(width);
  const heights = calculateTileDistances(height);

  const tiles = [];

  widths.forEach((width, x) => {
    const left = x * TILE_SIZE;

    heights.forEach((height, y) => {
      const top = y * TILE_SIZE;
    
      tiles.push({ x, y, left, top, width, height });
    });
  });

  return tiles;
};

/**
 * Calculates the pyramid of levels and tiles required for a given image.
 * 
 * @param {object} image 
 */
const calculatePyramid = (image) => {
  const maxLevel = calculateMaxLevel(image);
  const pyramid = { levels: [] };

  for (let level = 0; level <= maxLevel; level++) {
    const divisor = 2 ** (maxLevel - level);
    const imageWidth = Math.ceil(image.width / divisor);
    const imageHeight = Math.ceil(image.height / divisor);
    const tiles = calculateTiles({ width: imageWidth, height: imageHeight });

    pyramid.levels.push({ level, width: imageWidth, height: imageHeight, tiles });
  }

  return pyramid;
}

module.exports = { calculateTileDistances, calculateTiles, calculateMaxLevel, calculatePyramid, TILE_SIZE };