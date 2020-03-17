const sharp = require('sharp');

const [filename] = process.argv.slice(2);
if (!filename) { console.log("A filename is required.") }

sharp(filename)
  .resize(300, 200)
  .toFile('output.jpg', function(err) {
    // output.jpg is a 300 pixels wide and 200 pixels high image
    // containing a scaled and cropped version of input.jpg
  });