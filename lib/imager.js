const sharp = require('sharp');

module.exports = (filename) => {
  const image = sharp(filename);

  image.metadata().then(console.log)


  image
    .extract({ left: 0, top: 0, width: 256, height: 256 })
    .toFile('output.jpg', function(err) {
      // output.jpg is a 300 pixels wide and 200 pixels high image
      // containing a scaled and cropped version of input.jpg
    });
  };