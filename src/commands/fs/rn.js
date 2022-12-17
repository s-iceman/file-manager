import { rename } from 'node:fs/promises';

import { BaseFileSystemManager } from './base.js';
import { getPathList, isFileExist, constructPath } from '../../common/path-helper.js';
import { I18N } from '../../text/locale.js';


export class RenameFileMgr extends BaseFileSystemManager {
  async _process(option) {
    let [oldPath, newPath] = getPathList(option, this.storage.getCurrentDir());
    // newPath = constructPath(newFileName, oldPath, true);
    if (!(await isFileExist(oldPath))) {
      throw new Error(I18N.errors.failed);
    }
    await rename(oldPath, newPath);
    return I18N.msg.fileRenamed;
  };

  _validateOptions(option){
    return this._validate(option, 2);
  }
}
