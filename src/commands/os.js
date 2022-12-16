import * as os from 'node:os';

import { I18N } from '../text/locale.js';


export class OperationSystemManager {
  constructor() {
    this.options = {
      '--username': this._getUsername,
      '--EOL': this._getEOL,
      '--homedir': this._getHomedir,
      '--cpus': this._getCpus,
      '--architecture': this._getArchitecture,
    }
  }

  async process(option) {
    const processor = this.options[option];
    if (!processor) {
      throw new Error(I18N.errors.invalidInput);
    }
    return processor();
  }

  _getArchitecture() {
    return os.arch();
  }

  _getCpus() {
    const cpus = os.cpus();
    const res = cpus
      .map(e => Object.fromEntries(Object.entries(e)
        .map(e => {
          if (e[0] === 'speed') {
            e[1] = `${e[1] / 1000}GHz`;
          }
          return e;
        })
        .filter(([key]) => ['model', 'speed'].includes(key))));

      return `${I18N.msg.amountCpus} ${cpus.length}\n` + JSON.stringify(res, null, '\t');
  }

  _getEOL() {
    return JSON.stringify(os.EOL);
  }

  _getHomedir() {
    return os.homedir();
  }

  _getUsername() {
    return os.userInfo()['username'];
  }
}
