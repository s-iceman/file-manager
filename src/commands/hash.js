import { readFile } from 'node:fs/promises';

import { getPath } from '../common/path-helper.js';
import { I18N } from '../text/locale.js';

const { createHash } = await import('node:crypto');

export class HashManager {
  async process(filepath) {
    return await this._computeHash(filepath);
  }

  async _computeHash(filepath) {
    try {
      const input = await readFile(getPath(filepath));
      const hash = createHash('sha256');
      return hash.update(input.toString()).digest('hex');
    } catch (err) {
      throw new Error(I18N.errors.failed);
    }
  }
}