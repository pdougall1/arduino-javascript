import Data from '../../src/data';
import intelHEX from '../fixtures/intelHEX';

describe('Data', function() {
  let data, zero, one, two, three;

  beforeEach(function() {
    zero = 0x00;
    one = 0x01;
    two = 0x02;
    three = 0x03;
    data = new Data();
  });

  describe('#getBin', function() {
    it('returns an empty array when there is no data', function() {
      // data = new Data();
      expect(data.getBin()).to.deep.equal([]);
    });
    describe('when starting with IntelHEX data', function() {
      it('returns an array of all data', function() {
        expect(intelHEX.substring(0, 30)).to.equal(':100000000C94A2010C94CA010C94C');

        data = new Data(intelHEX, 'intelHEX');
        expect(data.getBin().slice(10, 100)).to.deep.equal([202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 112, 26, 12, 148, 60, 25, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 92, 16, 12, 148, 202, 1]);
      });
    });

    describe('when starting with hex data', function() {
      it('returns an array of all data', function() {
        let hex = [zero, one, two];
        data = new Data(hex, 'hex');
        expect(data.getBin()).to.deep.equal([0, 1, 2]);
      });
    });

    describe('when starting with binary data', function() {
      it('returns an array of all data', function() {
        let bin = [0, 1, 2];
        data = new Data(bin, 'binary');
        expect(data.getBin()).to.deep.equal([0, 1, 2]);
      });
    });

    describe('when a hex array is present', function() {
      beforeEach(function() {
        data.addHex([zero, one, two, three]);
      });

      it('returns hex array as binary', function() {
        let bin = data.getBin();
        let extractBinary = function (binary) {
          return String.fromCharCode.apply(null, new Uint8Array(binary));
        };

        expect(extractBinary(bin)).to.equal('\u0000\u0001\u0002\u0003');
      });
    });
  });

  describe('#addHex', function() {
    it('adds an array of hex data to the content of data', function() {
      data.addHex([zero, one, two, three]);
      expect(data.getBin()).to.deep.equal([zero, one, two, three]);
    });
  });

  describe('#coerceToHex', function() {
    it('returns an int value for each hex', function() {
      expect(data.coerceToHex([zero])).to.deep.equal([zero]);
    });

    it('coerces string hex to int', function() {
      expect(data.coerceToHex(['0x00'])).to.deep.equal([zero]);
    });

    it('will throw when can not coerce to an int', function() {
      let coerce = function () { data.coerceToHex(['notInt']); };
      expect(coerce).to.throw();
    });

    it('will throw when the int is less than 0', function() {
      let coerce = function () { data.coerceToHex([-1]); };
      expect(coerce).to.throw();
    });

    it('will throw when the int is greater than 255', function() {
      let coerce = function () { data.coerceToHex([256]); };
      expect(coerce).to.throw();
    });
  });

  describe('#getPage', function() {
    it('has a default page size', function() {
      expect(data.pageSize).to.equal(128);
    });

    it('will return binary for the page number', function() {
      data = new Data(intelHEX, 'intelHEX');
      expect(data.getPage(1)).to.deep.equal([12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 47, 15, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 202, 1, 12, 148, 9, 10, 12, 148, 202, 1, 170, 17, 175, 17, 180, 17, 190, 17, 200, 17, 18, 18, 18, 18, 18, 18, 210, 17, 220, 17, 230, 17, 240, 17, 253, 17, 18, 18, 5, 18, 51, 18, 54, 18, 37, 18, 41, 18, 47, 18, 87, 18, 87, 18, 87, 18, 58, 18, 62, 18, 66, 18, 72, 18, 76, 18, 87, 18, 82, 18, 5, 168, 76, 205, 178, 212, 78, 185, 56, 54, 169, 2, 12, 80, 185, 145, 134, 136, 8, 60, 166, 170, 170, 42, 190, 0, 0, 0, 128, 63, 6, 100, 236, 27, 60, 4, 188, 22, 62, 59, 229, 185, 60, 201, 60, 55, 194, 158, 90, 61, 102, 4, 152, 8, 62, 234, 105, 170, 170, 62, 0, 0, 0, 128, 63, 0, 7, 6, 5, 4, 1, 0, 8, 10, 11, 12, 13, 9, 0, 0, 0, 2, 0, 9, 15, 0, 0, 3, 4, 1, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 2, 1, 16, 64, 128, 64, 16, 32, 64, 128, 64, 128, 8, 2, 4, 1, 128, 64, 32, 16, 2, 1, 16, 128, 16, 32, 64, 64, 4, 4, 4, 4, 4, 3, 4, 5, 2, 2, 2, 2, 4, 3]);
    });
  });
});
