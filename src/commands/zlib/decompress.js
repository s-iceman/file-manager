import { createReadStream, createWriteStream } from 'node:fs';
import { createBrotliDecompress } from 'node:zlib';

import { BaseFileSystemManager } from '../fs/base.js';
import { getPathList, isFileExist } from '../../common/path-helper.js';
import { I18N } from '../../text/locale.js';


export class DecompressManager extends BaseFileSystemManager {
  async _process(option) {
    const [source, target] = getPathList(option);
    if (!(await isFileExist(source))) {
      throw new Error(I18N.errors.failed);
    }

    const readStream = createReadStream(source);
    const writeStream = createWriteStream(target);
    const brotli = createBrotliDecompress();
    readStream.pipe(brotli).pipe(writeStream);

    return I18N.msg.decompressStatus;
  }

  _validateOptions(option) {
    return this._validate(option, 2);
  }
}
