/**
 * This is the high level flow:
 * 
 * 1. Read the image from the file system.
 * 2. Get its dimensions.
 * 3. Calculate how it should be broken up in to a pyramid.
 * 4. Extract the tiles according to the pyramid plan.
 */

const { getDimensions, getImage } = require('./image_lib');
const extractor = require('./extractor');
const { calculatePyramid } = require('./planner');

module.exports = async ({ fs }) => {
  const [filename] = process.argv.slice(2);
  if (!filename) { console.log("A filename is required.") }

  const image = getImage(filename);
  const dimensions = await getDimensions(image);
  const pyramid = calculatePyramid(dimensions);

  return extractor(fs).extract(image, pyramid)
    .then(() => console.log("Finished extract."))
}
