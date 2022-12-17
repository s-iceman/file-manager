import { parse } from 'node:path';

import { I18N } from '../../text/locale.js';


export class CommandUpManager {
  constructor(storage) {
    this.storage = storage;
  }

  async process(option) {
    if (option) {
      throw new Error(I18N.errors.invalidInput);
    }

    const info = parse(this.storage.getCurrentDir());
    if (info['dir'] === info['root'] && !info['base']) {
      throw new Error(I18N.errors.failed);
    }
    this.storage.updateCurrentDir(info['dir']);
  }
}
