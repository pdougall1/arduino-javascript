// import Arduino from '../../src/arduino';
import SerialApiWrapper from '../../src/serial-api-wrapper';
// import ChromeSerialCallbackParameters from '../fixtures/chrome-serial-callback-parameters';
import ChromeSerialMock from '../mocks/chrome-serial-mock';
import Avr109 from '../../src/avr109';

describe('Avr109', () => {
  var avr109, serial, serialApi;
  beforeEach(function() {
    serialApi = new ChromeSerialMock();
    serial = new SerialApiWrapper(serialApi, { path: 'path/to/device' });
    serial.connect();
    avr109 = new Avr109(serial);
  });

  describe('#kickBootloaderConnect', function() {
    it('will kick off the bootloader', function(done) {
      this.timeout(10000);
      avr109.kickBootloaderConnect().then( function (status) {
        expect(status).to.equal(true);
        done();
      });
    });
  });
});

