/*
    Move file (same as copy but initial file is deleted, copying part should be done using Readable and Writable streams):
mv path_to_file path_to_new_directory
*/
import { createReadStream, createWriteStream } from 'node:fs';
import { join, basename } from 'node:path';
import { rm } from 'node:fs/promises';

import { BaseFileSystemManager } from './base.js';
import { getPathList, isFileExist, isDirExist } from '../../common/path-helper.js';
import { I18N } from '../../text/locale.js';


export class MoveFileMgr extends BaseFileSystemManager {
  async _process(option) {
    const [source, targetDir] = getPathList(option, this.storage.getCurrentDir());
    if (!(await isFileExist(source))) {
      throw new Error(I18N.errors.failed);
    }
    if (!(await isDirExist(targetDir))) {
      throw new Error(I18N.errors.failed);
    }

    const target = join(targetDir, basename(source));
    if (!!(await isFileExist(target))) {
      throw new Error(`${I18N.errors.failed}: ${I18N.errors.fileExists}`);
    }

    const readStream = createReadStream(source);
    const writeStream = createWriteStream(target);
    readStream.pipe(writeStream);
    await rm(source);

    return I18N.msg.fileMoved;
  };

  _validateOptions(option){
    return this._validate(option, 2);
  }
}
