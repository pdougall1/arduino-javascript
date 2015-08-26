import Mock from './mock';
import ChromeSerialCallbackParameters from '../fixtures/chrome-serial-callback-parameters';
// import Avr109Commands from '../../src/arv109-commands';

class ChromeSerialMock extends Mock {
  constructor(connected = true) {
    super();
    this.connected = connected;
    this.onReceive = {
      addListener: function () {
        return true;
      }
    };
  }

  getDevices(callback) {
    var response;
    if (this.connected) {
      response = ChromeSerialCallbackParameters.getDevices;
    } else {
      response = ChromeSerialCallbackParameters.getDevicesUnconnected;
    }
    callback(response);
  }

  connect(devicePath, options, callback) {
    var response = ChromeSerialCallbackParameters.connect;
    callback(response);
  }

  disconnect(connectionId, callback) {
    if (connectionId) {
      var response = ChromeSerialCallbackParameters.disconnect;
      callback(response);
    } else {
      throw Error('Unchecked runtime.lastError while running serial.disconnect: Serial connection not found.');
    }
  }

  send (connectionId, data, callback) {
    callback('data');
  }
}

export default ChromeSerialMock;

