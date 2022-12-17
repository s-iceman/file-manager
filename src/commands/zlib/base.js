import { I18N } from '../../text/locale.js';


export class BaseZlibManager {
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
    if (!option) {
      return false;
    }
    const spaceCount = (option.match(/\s+/g) || []).length;
    if (spaceCount <  1) {
      return false;
    }
    if (spaceCount > 1) {
      return (option.match(/[\'\"](\s)+[\'\"]/g) || []).length == 1;
    }
    return true;
  }
}
