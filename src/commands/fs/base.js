import { I18N } from '../../text/locale.js';


export class BaseFileSystemManager {
  constructor(storage) {
    this.storage = storage;
  }

  async process(option) {
    if (!this._validateOptions(option)) {
      throw new Error(I18N.errors.invalidInput);
    }
    return await this._process(option);
  }

  async _process(option) {
    return '';
  };

  _validateOptions(option) {
    return this._validate(option);
  }

  _validate(option, amountOfParts=1) {
    if (!option) {
      return false;
    }
    const spaceCount = (option.match(/\s+/g) || []).length;
    if (spaceCount < amountOfParts - 1) {
      return false;
    }
    if (spaceCount >= amountOfParts) {
      return (option.match(/[\'\"](\s)+[\'\"]/g) || []).length == amountOfParts;
    }
    return true;
  }
}
