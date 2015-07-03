// import Arduino from '../../src/arduino';
import SerialApiWrapper from '../../src/serial-api-wrapper';
// import ChromeSerialCallbackParameters from '../fixtures/chrome-serial-callback-parameters';
import ChromeSerialMock from '../mocks/chrome-serial-mock';
import Avr109 from '../../src/avr109';

describe('Avr109', () => {
  var avr109, serial, serialApi;
  beforeEach(function() {
    // response = ChromeSerialCallbackParameters;
    serialApi = new ChromeSerialMock();
    serial = new SerialApiWrapper(serialApi, { path: 'path/to/device' });
    serial.connect();
    avr109 = new Avr109(serial);
  });

  describe('#kickBootloader', function() {
    it('will kick off the bootloader', function(done) {
      avr109.kickBootloader().then( function (status) {
        expect(status).to.equal(true);
        done();
      });
    });
  });
});

