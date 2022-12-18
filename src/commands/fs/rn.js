import { rename } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import { BaseFileSystemManager } from './base.js';
import { getPath, isFileExist, parseOption } from '../../common/path-helper.js';
import { I18N } from '../../text/locale.js';


export class RenameFileMgr extends BaseFileSystemManager {
  async _process(option) {
    const [source, newName] = parseOption(option);
    const oldPath = getPath(source, this.storage.getCurrentDir());
    if (!(await isFileExist(oldPath))) {
      throw new Error(I18N.errors.failed);
    }
    const newPath = join(dirname(oldPath), newName);
    if (!!(await isFileExist(newPath))) {
      throw new Error(`${I18N.errors.failed}: ${I18N.errors.fileExists}`);
    }
    console.log(oldPath, newPath);

    await rename(oldPath, newPath);
    return I18N.msg.fileRenamed;
  };

  _validateOptions(option){
    return this._validate(option, 2);
  }
}
