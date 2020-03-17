/**
 * Who's the best at building pyramids? Egyptians.
 */

const imager = require('./imager');

module.exports = () => {
  const [filename] = process.argv.slice(2);
  if (!filename) { console.log("A filename is required.") }

  const image = imager(filename);
}
