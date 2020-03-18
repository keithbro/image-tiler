/**
 * This is the extractor service. Extract means extracting smaller images from larger images.
 * Note the wrapping function. This allows us to pass in a mock file system for testing purposes.
 * Note that we are not using promises here - I initally used promises to enable concurrent
 * extractions, but the image library did not handle this correctly. There may be a way to
 * get this to work but I'm out of time now...
 */

const extractor = (fs) => {
  const extract = async (image, pyramid) => {
    for (const levelObj of pyramid.levels) {
      await extractLevel(image, levelObj);
    }
  }
  
  const extractLevel = (image, levelObj) => {
    return makeDirectory(levelObj.level)
      .then(() => image.resize({ width: levelObj.width, height: levelObj.height }))
      .then((resizedImage) => extractTiles(resizedImage, levelObj));
  }

  const makeDirectory = (level) => fs.mkdir(`output/${level}`, { recursive: true });

  const extractTiles = async (resizedImage, levelObj) => {
    for (const tile of levelObj.tiles) {
      await extractTile(resizedImage, levelObj.level, tile);
    }
  }

  const extractTile = (image, level, { x, y, left, top, width, height}) => {
    const outputFilename = `output/${level}/${x}_${y}.jpg`;

    return image
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