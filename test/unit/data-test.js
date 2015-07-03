import Data from '../../src/data';

describe('Data', function() {
  let data, zero, one, two, three;

  beforeEach(function() {
    zero = 0x00;
    one = 0x01;
    two = 0x02;
    three = 0x03;
    data = new Data();
  });

  describe('#getHex', function() {
    it('returns an empty array when there is no data', function() {
      expect(data.getHex()).to.deep.equal([]);
    });

    it('returns an array of all data', function() {
      data = new Data(zero);
      expect(data.getHex()).to.deep.equal([zero]);
    });
  });

  describe('#getBin', function() {
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
    it('adds hex data to the array of hex data', function() {
      data.addHex(zero);
      expect(data.getHex()).to.deep.equal([zero]);
    });

    it('adds an array of hex data to the array of hex data', function() {
      data.addHex([zero, one, two, three]);
      expect(data.getHex()).to.deep.equal([zero, one, two, three]);
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
});
