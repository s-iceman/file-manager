import { appendFile } from 'node:fs/promises';

import { BaseFileSystemManager } from './base.js';
import { getPath, isFileExist } from '../../common/path-helper.js';
import { I18N } from '../../text/locale.js';


export class AddFileMgr extends BaseFileSystemManager {
  async _process(option) {
    const filePath = getPath(option, this.storage.getCurrentDir());
    if (!!(await isFileExist(filePath))) {
      throw new Error(I18N.errors.failed);
    }
    await appendFile(filePath, '');

    return I18N.msg.fileCreated;
  };
}
