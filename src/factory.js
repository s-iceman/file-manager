import { OperationSystemManager } from './os.js';
import { I18N } from './locale.js';


export class CommandProcessor {
  constructor() {
    this.osManager = new OperationSystemManager();
    this.commands = {
      'os': this.osManager,
    }
  }

  process(args) {
    const [command, options] = this._parseArg(args);
    const processor = this.commands[command];
    return processor.process(options);
  }

  _parseArg(args) {
    if (!args) {
      throw new Error(I18N.errors.invalidArg);
    }
    const pos = args.trim().indexOf(' ');
    return (pos !== -1) ? [args.slice(0, pos), args.slice(pos + 1).trim()] : [arg, ''];
  }
};