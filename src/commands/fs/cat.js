import { createReadStream } from 'node:fs';

import { BaseFileSystemManager } from './base.js';
import { getPath, isFileExist } from '../../common/path-helper.js';
import { I18N } from '../../text/locale.js';


export class CatMgr extends BaseFileSystemManager {
  async _process(option) {
    const filePath = getPath(option);
    if (!(await isFileExist(filePath))) {
      throw new Error(I18N.errors.failed);
    }

    const readable = createReadStream(filePath);
    const chunks = [];
    for await (let chunk of readable) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks);
  };
}
