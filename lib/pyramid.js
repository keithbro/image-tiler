module.exports.levels = (image) => {
  return [{ zoom: 0, tiles: [{ width: image.width, height: image.height, x: 0, y: 0 }]}];
};