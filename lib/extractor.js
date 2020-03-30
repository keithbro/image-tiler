/**
 * This is the extractor service. Extraction means extracting smaller images from larger images.
 * 
 * Note the wrapping function. This allows us to pass in a mock file system for testing purposes.
 */

const extractor = (fs) => {
  const extract = (image, pyramid) => {
    return Promise.all(pyramid.levels.map((levelObj) => extractLevel(image, levelObj)))
  }
  
  const extractLevel = (image, levelObj) => {
    return makeDirectory(levelObj.level)
      .then(() => image.clone().resize({ width: levelObj.width, height: levelObj.height }))
      .then((resizedImage) => extractTiles(resizedImage, levelObj));
  }

  const makeDirectory = (level) => fs.mkdir(`output/${level}`, { recursive: true });

  const extractTiles = (resizedImage, levelObj) => {
    return Promise.all(levelObj.tiles.map((tile) => extractTile(resizedImage, levelObj.level, tile)));
  }

  const extractTile = (image, level, { x, y, left, top, width, height}) => {
    const outputFilename = `output/${level}/${x}_${y}.jpg`;

    return image
      .clone()
      .extract({ left, top, width, height })
      .toFile(outputFilename)
      .then((result) => {
        console.debug("Extracted tile: " + outputFilename);
        return result;
      });
  };

  return { extract };
};

module.exports = extractor;