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

const calculateTiles = (imageWidth, imageHeight) => {
  const widths = calculateTileDistances(imageWidth);
  const heights = calculateTileDistances(imageHeight);

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

const calculateZooms = (metadata) => {
  const maxLevel = calculateMaxLevel(metadata);
  const max = { level: maxLevel, width: metadata.width, height: metadata.height };
  const zooms = [];

  for (let level = max.level; level >= 0; level--) {
    const divisor = 2 ** (max.level - level);
    const imageWidth = Math.ceil(max.width / divisor);
    const imageHeight = Math.ceil(max.height / divisor);
    const tiles = calculateTiles(imageWidth, imageHeight);

    zooms.push({ level, width: imageWidth, height: imageHeight, tiles });
  }

  return zooms;
}

module.exports = { calculateTileDistances, calculateMaxLevel, calculateZooms, TILE_SIZE };