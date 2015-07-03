var ChromeSerialCallbackParameters = {

  getDevices: [
    {path: '/dev/cu.Bluetooth-Incoming-Port'},
    {path: '/dev/tty.Bluetooth-Incoming-Port'},
    {path: '/dev/cu.Bluetooth-Modem'},
    {path: '/dev/tty.Bluetooth-Modem'},
    {path: '/dev/cu.usbmodem1411'},
    {path: '/dev/tty.usbmodem1411'}
  ],

  getDevicesUnconnected: [
    {path: '/dev/cu.Bluetooth-Incoming-Port'},
    {path: '/dev/tty.Bluetooth-Incoming-Port'},
    {path: '/dev/cu.Bluetooth-Modem'},
    {path: '/dev/tty.Bluetooth-Modem'}
  ],

  connect: {
    bitrate: 9600,
    bufferSize: 4096,
    connectionId: 1,
    ctsFlowControl: true,
    dataBits: 'eight',
    name: '',
    parityBit: 'no',
    paused: false,
    persistent: false,
    receiveTimeout: 0,
    sendTimeout: 0,
    stopBits: 'one'
  },

  disconnect: true,

  send: { bytesSent: 4 }
};

export default ChromeSerialCallbackParameters;
