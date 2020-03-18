const { expect } = require('chai');
const { fake } = require('sinon');
const extractor = require('../lib/extractor');

describe('extractor', () => {
  describe('extract', () => {
    describe("when", () => {
      const pyramid = { levels: [{ level: 0, width: 2, height: 2, tiles: [{ left: 0, top: 0, width: 1, height: 1, x: 0, y: 0 }] }] };
      let fakeFs, fakeImage, result;

      beforeEach(async () => {
        fakeImage = { toFile: fake.resolves({ success: true }) };
        fakeImage.extract = fake.returns(fakeImage);
        fakeImage.resize = fake.returns(fakeImage);
        fakeFs = { mkdir: fake.resolves() };

        const service = extractor(fakeFs);
        result = await service.extract(fakeImage, pyramid);
      })

      it("resizes according to the level dimensions", () => {
        expect(fakeImage.resize.args).to.deep.equal([[{ height: 2, width: 2 }]])
      })

      it("creates the directory with the level number", () => {
        expect(fakeFs.mkdir.args).to.deep.equal([['output/0', { recursive: true }]])
      });

      it("extracts according to the tile dimensions", () => {
        expect(fakeImage.extract.args).to.deep.equal([[{ height: 1, left: 0, top: 0, width: 1 }]])
      })

      it("writes the expected file", () => {
        expect(fakeImage.toFile.args).to.deep.equal([['output/0/0_0.jpg']])
      });
    });
  });
});
