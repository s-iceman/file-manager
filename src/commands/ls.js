import { readdir } from 'node:fs/promises';

import { I18N } from '../text/locale.js';


export class DirContentManager {
  constructor(storage) {
    this.storage = storage;
  }

  async process(option) {
    if (option) {
      throw new Error(I18N.errors.invalidInput);
    }

    const content = await readdir( this.storage.getCurrentDir(), {withFileTypes: true});

    const [dirs, files] = [[], []];
    content.forEach( e => {
      if (e.isDirectory()) {
        dirs.push(e.name);
      } else if (e.isFile()) {
        files.push(e.name);
      }
    });

    const res = [];
    dirs.sort().forEach(e => { res.push(this._format(e, 'directory'))});
    files.sort().forEach(e => { res.push(this._format(e, 'file'))});
    console.table(res);
    return '';
  }

  _format(value, valueType) {
    return { 'Name': value, 'Type': valueType };
  }
}
