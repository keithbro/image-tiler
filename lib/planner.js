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

const calculateZooms = (metadata) => {
  const maxL = calculateMaxL(metadata);
  const max = { L: maxL, width: metadata.width, height: metadata.height };
  const zooms = [];

  for (let L = max.L; L >= 0; L--) {
    const divisor = 2 ** (max.L - L);
    const imageWidth = Math.ceil(max.width / divisor);
    const imageHeight = Math.ceil(max.height / divisor);

    const widths = calculateTile(imageWidth);
    const heights = calculateTile(imageHeight);

    const tiles = [];

    widths.forEach((width, x) => {
      const left = x * TILE_SIZE;

      heights.forEach((height, y) => {
        const top = y * TILE_SIZE;
      
        tiles.push({ x, y, left, top, width, height });
      });
    });

    zooms.push({ L, width: imageWidth, height: imageHeight, tiles });
  }

  return zooms;
}

module.exports = { calculateTileDistances, calculateMaxLevel, calculateZooms, TILE_SIZE };