import Data from '../../src/data';
import SerialApiWrapper from '../../src/serial-api-wrapper';
import ChromeSerialCallbackParameters from '../fixtures/chrome-serial-callback-parameters';
import ChromeSerialMock from '../mocks/chrome-serial-mock';

describe('SerialApiWrapper', () => {
  describe('static getDevices', () => {
    it('should resolve the expected callback parameters', (done) => {
      var callbackParams = ChromeSerialCallbackParameters.getDevices;
      var serialApi = new ChromeSerialMock();

      SerialApiWrapper.getDevices(serialApi).then( function (result) {
        expect(result).to.equal(callbackParams);
        done();
      });
    });

    it('should resolve the expected unconnected parameters', function(done) {
      var callbackParams = ChromeSerialCallbackParameters.getDevicesUnconnected;
      var serialApi = new ChromeSerialMock(false);

      SerialApiWrapper.getDevices(serialApi).then( function (result) {
        expect(result).to.equal(callbackParams);
        done();
      });
    });
  });

  describe('instance methods', function() {
    var serialApi, serialApiWrapper, device, results, defaultBitrate;
    defaultBitrate = 9600;
    beforeEach(function() {
      device = { path: 'path/to/usn/port' };
      results = ChromeSerialCallbackParameters;
      serialApi = new ChromeSerialMock();
      serialApiWrapper = new SerialApiWrapper(serialApi, device);
    });

    describe('#connect', function() {
      it('should have the correct default bitrate', function() {
        var bitrate = serialApiWrapper.connectionOptions.bitrate;
        expect(bitrate).to.equal(defaultBitrate);
      });

      it('should resolve the connection object', function(done) {
        serialApiWrapper.connect().then( function (result) {
          expect(result).to.equal(results.connect);
          done();
        });
      });

      it('should set a connectionId', function(done) {
        serialApiWrapper.connect().then( function () {
          expect(serialApiWrapper.connection.id).to.equal(1);
          done();
        });
      });
    });

    describe('#disconnect', function() {
      var connectionId;
      it('disconnects from device', function(done) {
        connectionId = true;
        serialApiWrapper.disconnect(connectionId).then( function (result) {
          expect(result).to.equal(results.disconnect);
          done();
        });
      });

      it('rejects when not connected to given id', function(done) {
        connectionId = false;
        serialApiWrapper.disconnect(connectionId).catch( function (result) {
          expect(result.message).to.include('Unchecked runtime.lastError while running serial.disconnect');
          done();
        });
      });

      describe('when already connected', function() {
        beforeEach(function(done) {
          serialApiWrapper.connect();
          done();
        });

        it('should be connected', function() {
          expect(serialApiWrapper.connection.id).to.equal(1);
        });

        it('should remove a connection', function(done) {
          connectionId = 1;
          serialApiWrapper.disconnect(connectionId).then( function () {
            expect(serialApiWrapper.connection).not.to.exist;
            done();
          });
        });
      });
    });

    describe('#send', function() {
      let data, array;

      beforeEach(function() {
        array = [1, 2, 3];
        data = new Data(array);
      });

      it('it must be sent a data object', function() {
        expect( function () { serialApiWrapper.send(array); } ).to.throw();
      });

      it('it must be connected to a device', function() {
        expect( function () { serialApiWrapper.send(data); } ).to.throw();
      });

      describe('while connected to a device', function() {
        beforeEach(function(done) {
          serialApiWrapper.connect();
          done();
        });

        it('can send to the device', function(done) {
          serialApiWrapper.send(data).then( function (res) {
            expect(res).to.equal('data');
            done();
          });
        });

      });
    });
  });
});
