import { join, isAbsolute } from 'node:path';

import { isDirExist } from '../../common/path-helper.js';
import { I18N } from '../../text/locale.js';


export class CommandCdManager {
  constructor(storage) {
    this.storage = storage;
  }

  async process(option) {
    if (!option) {
      throw new Error(I18N.errors.invalidInput);
    }

    let newPath = isAbsolute(option) ? option : join(this.storage.getCurrentDir(), option);
    await this._processPath(newPath);
  }

  async _processPath(newPath) {
    try {
      if ((await isDirExist(newPath))) {
        this.storage.updateCurrentDir(newPath);
      } else {
        throw new Error(I18N.errors.failed);
      }
    } catch (err) {
      throw new Error(I18N.errors.failed);
    }
  }
}
