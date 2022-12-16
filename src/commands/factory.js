import { OperationSystemManager } from './os.js';
import { HashManager } from './hash.js';
import { DirContentManager } from './navigation.js';
import { I18N } from '../locale.js';


export class CommandProcessor {
  constructor(storage) {
    this.osMgr = new OperationSystemManager();
    this.hashMgr = new HashManager();
    this.dirContentMgr = new DirContentManager(storage)
    this.commands = {
      'os': this.osMgr,
      'hash': this.hashMgr,
      'ls': this.dirContentMgr,
    }
  }

  process(args) {
    const [command, options] = this._parseArg(args);
    if (this.commands[command] === undefined) {
      throw new Error(I18N.errors.invalidInput);
    }
    const processor = this.commands[command];
    return processor.process(options);
  }

  _parseArg(args) {
    if (!args) {
      throw new Error(I18N.errors.invalidInput);
    }
    const pos = args.trim().indexOf(' ');
    return (pos !== -1) ? [args.slice(0, pos), args.slice(pos + 1).trim()] : [args, ''];
  }
};