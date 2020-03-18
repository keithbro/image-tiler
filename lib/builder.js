const sharp = require('sharp');
const { mkdir } = require('fs');

const getDimensions = (image) => image.metadata();

const getImage = sharp;

const build = async (plan, image) => {
  for (const zoom of plan) {
    const { L, height, width } = zoom;
    console.log({ height, width });
    const resizedImage = image.resize({ height, width });

    for (const tile of zoom.tiles) {
      const { x, y, left, top, width, height } = tile;
      await mkdir(`output/${L}`, { recursive: true }, () => {})
      const outputFilename = `output/${L}/${x}_${y}.jpg`;
      console.log({ left, top, height, width });

      resizedImage
        .extract({ left, top, width, height })
        .toFile(outputFilename);
    }
  }
};

module.exports = { getDimensions, getImage, build };