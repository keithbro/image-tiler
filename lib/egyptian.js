/**
 * Who's the best at building pyramids? Egyptians.
 */

const { getDimensions, build } = require('./builder');
const planner = require('./planner');

module.exports = () => {
  const [filename] = process.argv.slice(2);
  if (!filename) { console.log("A filename is required.") }

  const dimensions = getDimensions(filename);
  const plan = planner(dimensions);
  execute(plan);
}
