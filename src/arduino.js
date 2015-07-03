import SerialApiWrapper from './serial-api-wrapper';
import Avr109 from './avr109';

class Arduino {
  constructor (serialApi, Board = Avr109) {
    this.serialApi = serialApi;
    this.Board = Board;
  }

  getDevices () {
    return SerialApiWrapper.getDevices(this.serialApi);
  }

  connect (device) {
    // TODO: make sure we are only connected to one device at a time
    // this.insureNotAlreadyConnected();
    this.serial = new SerialApiWrapper(this.serialApi, device);
    return this.serial.connect();
  }

  disconnect () {
    this.validateConnection();
    return this.serial.disconnect(this.serial.connection.id);
  }

  getSketch () {
    this.validateConnection();
    var board = new this.Board(this.serial);
    return board.downloadSketch();
    // TODO: delete board
  }

  // PRIVATE

  validateConnection () {
    if (this.serial.connection) {
      return true;
    } else {
      throw new Error('You must be connected to a device to perform this operation.');
    }
  }
}

export default Arduino;

