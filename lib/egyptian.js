/**
 * Who's the best at building pyramids? Egyptians.
 */

const { getDimensions, getImage, build } = require('./builder');
const { calculateZooms } = require('./planner');

module.exports = async () => {
  const [filename] = process.argv.slice(2);
  if (!filename) { console.log("A filename is required.") }

  const image = getImage(filename);
  const dimensions = await getDimensions(image);
  const plan = calculateZooms(dimensions);
  build(plan, image);
}
