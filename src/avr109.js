import commands from './avr109-commands';
import Data from './data';
// import SerialApiWrapper from './serial-api-wrapper';

class Avr109 {
  constructor (serial) {
    this.connection = this.getConnection(serial);
    // Arduino and the board both have a serial obj.  This allows arduino to assign multiple boards their own connection.
    this.serial = serial;
    this.bootloaderBitrate = 1200;
    this.dataBitrate = 57600; // this came from chrome-arduino
    this.flashSize = 28672;
    this.pageSize = 128;
    this.commands = commands;
  }

  kickBootloader () {
    var bitrate = this.bootloaderBitrate;
    var serial = this.serial;
    var id = serial.connection.id;

    return new Promise( function (resolve) {
      // bootloader wont be kicked if already connected
      serial.disconnect(id).then( function (status) {
        if (status) {

          // the idiomatic way of starting bootlaoder mode is to connect with a bitrate of 1200, and then disconnect
          // that's just how it is
          serial.connect(bitrate).then( function (connection) {
            setTimeout( function () {
              serial.disconnect(connection.connectionId).then( function (status2) {
                if (!status2) {
                  throw new Error('Could not disconnect so could not kick bootloader');
                } else {
                  resolve(true);
                }
              });
            }, 10); // 10 miliseconds is derived through trial and error as the least amount of time needed to make this work.
          });
        }
      });
    });
  }

  // TODO: ************************************
  downloadSketch () {
    var serial = this.serial;
    var data = new Data([103, 0, 128, 70]);
    this.startProgramming().then( function (success) {
      if (success) {
        serial.send(data).then( function (res) {
          console.log(res);
          return res;
        });
      }
    });
  }

  startProgramming () {
    let board = this;
    return new Promise( function (resolve) {
      board.kickBootloader().then( function (success) {
        if (success) {
          board.serial.connect().then( function () {
            board.enterProgrammingMode().then( function (success2) {
              if (success2) {
                resolve(true);
              }
            }).catch( function (fail2) {
              throw new Error('Could not enter programming mode : ' + fail2);
            });
          });
        }
      });
    });
  }

  enterProgrammingMode () {
    let serial = this.serial;
    let data = new Data(this.commands.enterProgrammingMode);
    return serial.send(data);
  }

  // enterProgramModePayload = [0x50]

  // downloadSketchPayload = [103, 0, 128, 70]

  // PRIVATE

  getConnection (serial) {
    var connection = serial.connection;
    if (connection) {
      return connection;
    } else {
      throw new Error('Avr109 must be passed a valid connection.');
    }
  }
}

export default Avr109;
