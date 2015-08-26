// This class will have to hold representations of data in all formats.
// There will be:
//   arrays of single hex values
//   arrays of "pages" of values (I guess hex and binary?)
//   I guess binary data, whatever form that holds

import translator from './translator';

class Data {
  constructor (data) {
    this.hexArray = [];
    this.binary = null;

    if (data !== undefined) {
      this.addHex(data);
    }
  }

  // INTERFACE

  getHex () {
    let hexArray = this.hexArray;
    let binary = this.binary;
    if (hexArray.length > 0) {
      return hexArray;
    } else if (binary) {
      return translator.binToHex(binary);
    }
    return this.hexArray;
  }

  getBin () {
    let binary = this.binary;
    let hexArray = this.hexArray;

    if (binary) {
      return binary;
    } else if (hexArray.length > 0) {
      return translator.hexArrayToBin(hexArray);
    }
  }

  addHex (data) {
    let hex = this.coerceToHex(data);
    this.hexArray = this.hexArray.concat(hex);
  }

  addBin (data) {
    this.binary = data;
  }

  // PRIVATE

  coerceToHex (data) {
    let coerceHex = this.coerceHex;

    if (Array.isArray(data)) {
      return data.map( function (hex) {
        return coerceHex(hex);
      });
    } else {
      return coerceHex(data);
    }
  }

  coerceHex (hex) {
    let int = parseInt(hex);
    let resolvesToInt = (typeof int === 'number') && (int % 1 === 0);
    let withinHexRange = (int >= 0) && (int <= 255);

    if (resolvesToInt && withinHexRange) {
      return int;
    } else {
      throw new Error(`Must be able to coerce "${hex}" to an integer between 0 and 255.`);
    }
  }

  isHexFile (data) {
    let seperatedWithNewLine, isHexChars;
    isHexChars = /^:([A-Fa-f0-9]{2}){8,9}/.test(data);
    seperatedWithNewLine = true;
    if (data.split(':').length > 2) {
      seperatedWithNewLine =
        (data.split(':').length === data.split('\n').length) ||
        (data.split(':').length === data.split('\n').length - 1);
    }
    return isHexChars && seperatedWithNewLine;
  }
}

export default Data;
