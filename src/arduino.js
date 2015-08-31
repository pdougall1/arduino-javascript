import SerialApiWrapper from './serial-api-wrapper';
import Avr109 from './avr109';
import ModBin from './mod-bin';
import Data from './data';

class Arduino {
  constructor (serialApi, Protocol = Avr109) {
    this.serialApi = serialApi;
    this.Protocol = Protocol;
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

  getSketch (downloadCallback) {
    this.validateConnection();
    let board = this.getBoard();
    var callback = downloadCallback || this.defaultDownloadCallback;
    return board.downloadSketch(callback);
  }

  defaultDownloadCallback () {
    console.log('Default downloadCallback called.');
  }

  // sketch must be an array of hex values
  uploadSketch (sketch) {
    let data;
    if (sketch) {
      data = new Data(sketch, 'intelHEX');
    } else {
      data = new Data(ModBin, 'binary');
    }

    this.validateConnection();
    let board = this.getBoard();
    return board.uploadSketch(data);
  }

  // PRIVATE

  getBoard () {
    if (this.board) {
      return this.board;
    } else {
      let board = new this.Protocol(this.serial);
      this.board = board;
      return board;
    }
  }

  validateConnection () {
    if (this.serial.connection) {
      return true;
    } else {
      throw new Error('You must be connected to a device to perform this operation.');
    }
  }
}

export default Arduino;

