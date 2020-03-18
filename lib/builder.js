const sharp = require('sharp');
const { mkdir } = require('fs');

module.exports = async (filename) => {
  const image = sharp(filename);

  const metadata = await image.metadata();

  const zooms = calculateZooms(metadata);
  //console.dir({ zooms }, { depth: null });

  const tiles = [
    { x: 0, y: 0, left: 0, top: 0, width: 256, height: 256 },
  ];

  for (const zoom of zooms) {
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