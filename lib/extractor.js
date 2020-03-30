/**
 * This is the extractor service. Extraction means extracting smaller images from larger images.
 * 
 * Note the wrapping function. This allows us to pass in a mock file system for testing purposes.
 * 
 * Note that we are not using promises here - I initally used promises to enable concurrent
 * extractions, but the image library did not handle this correctly. Without looking at the
 * sharp source code, I suspect there could be some global state clobbering going on....
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