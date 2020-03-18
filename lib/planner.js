const TILE_SIZE = 256;

const calculateTileDistances = (imageDistance) => {
  const tileDistances = [];

  while (imageDistance > 0) {
    const tileDistance = imageDistance > TILE_SIZE ? TILE_SIZE : imageDistance;
    tileDistances.push(tileDistance);
    imageDistance = imageDistance - tileDistance;
  }

  return tileDistances;
}

const calculateMaxLevel = ({ width, height }) => {
  let distance = width > height ? width : height;
  let level = 0;

  while (distance > 1) {
    distance = distance / 2;
    level++;
  }

  return level;
};

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