import { OperationSystemManager } from './os.js';
import { HashManager } from './hash.js';
import { DirContentManager } from './ls.js';
import { CommandCdManager } from './cd.js';
import { CommandUpManager } from './up.js';
import { I18N } from '../text/locale.js';


export class CommandProcessor {
  constructor(storage) {
    this.osMgr = new OperationSystemManager();
    this.hashMgr = new HashManager();
    this.dirContentMgr = new DirContentManager(storage)
    this.commandUpMgr = new CommandUpManager(storage);
    this.CommandCdManager = new CommandCdManager(storage);

    this.commands = this._createCommands();
  }

  process(args) {
    const [command, options] = this._parseArg(args);
    if (this.commands[command] === undefined) {
      throw new Error(I18N.errors.invalidInput);
    }
    const processor = this.commands[command];
    return processor.process(options);
  }

  _createCommands() {
    return {
      'os': this.osMgr,
      'hash': this.hashMgr,
      'ls': this.dirContentMgr,
      'up': this.commandUpMgr,
      'cd': this.CommandCdManager,
    };
  }

  _parseArg(args) {
    if (!args) {
      throw new Error(I18N.errors.invalidInput);
    }
    const pos = args.trim().indexOf(' ');
    return (pos !== -1) ? [args.slice(0, pos), args.slice(pos + 1).trim()] : [args, ''];
  }
};