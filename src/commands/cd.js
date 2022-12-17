import * as fs from 'node:fs/promises';

import { I18N } from '../text/locale.js';


export class CommandCdManager {
  constructor(storage) {
    this.storage = storage;
  }

  async process(option) {
    if (option) {
      throw new Error(I18N.errors.invalidInput);
    }
    return '';
  }
}
