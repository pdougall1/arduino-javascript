import Arduino from '../../src/arduino';
import SerialApiWrapper from '../../src/serial-api-wrapper';
import ChromeSerialCallbackParameters from '../fixtures/chrome-serial-callback-parameters';
import ChromeSerialMock from '../mocks/chrome-serial-mock';
import Avr109 from '../../src/avr109';

describe('Arduino', () => {
  var serialApi, arduino, response;
  beforeEach(function() {
    response = ChromeSerialCallbackParameters;
    serialApi = new ChromeSerialMock();
    arduino = new Arduino(serialApi);
  });

  describe('has a board', function() {
    it('has a default Avr109 board', function() {
      var serial = new SerialApiWrapper(serialApi, { path: 'path/to/device'});
      serial.connect();
      expect(new arduino.Board(serial)).to.be.an.instanceof(Avr109);
    });
  });

  describe('#getDevices', function() {
    it('retreives devices', function(done) {
      arduino.getDevices().then( function (devices) {
        expect(devices).to.equal(response.getDevices);
        done();
      });
    });
  });

  describe('#connect', function() {
    it('connects to device', function(done) {
      var device = { path: 'path/to/device' };
      arduino.connect(device).then( function (connection) {
        expect(connection).to.equal(response.connect);
        done();
      });
    });
  });
});

