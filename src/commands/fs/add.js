import { join } from 'node:path';
import { appendFile } from 'node:fs/promises';

import { BaseFileSystemManager } from './base.js';
import { isFileExist } from '../../common/path-helper.js';
import { I18N } from '../../text/locale.js';


export class AddFileMgr extends BaseFileSystemManager {
  async _process(option) {
    const filePath = join(this.storage.getCurrentDir(), option);
    if (!!(await isFileExist(filePath))) {
      throw new Error(I18N.errors.failed);
    }
    await appendFile(filePath, '');

    return I18N.msg.fileCreated;
  };
}
