import { OperationSystemManager } from './os.js';
import { HashManager } from './hash.js';
import { DirContentManager } from './ls.js';
import { CommandCdManager } from './navigation/cd.js';
import { CommandUpManager } from './navigation/up.js';
import { CompressManager } from './zlib/compress.js';
import { DecompressManager } from './zlib/decompress.js';
import { CatMgr } from './fs/cat.js';
import { AddFileMgr } from './fs/add.js';
import { RemoveFileMgr } from './fs/rm.js';
import { RenameFileMgr } from './fs/rn.js';
import { I18N } from '../text/locale.js';


export class CommandProcessor {
  constructor(storage) {
    this._osMgr = new OperationSystemManager();
    this._hashMgr = new HashManager();
    this._dirContentMgr = new DirContentManager(storage)
    this._commandUpMgr = new CommandUpManager(storage);
    this._commandCdMgr = new CommandCdManager(storage);
    this._compressMgr = new CompressManager(storage);
    this._decompressMgr = new DecompressManager(storage);
    this._catMgr = new CatMgr(storage);
    this._addFileMgr = new AddFileMgr(storage);
    this._removeFileMgr = new RemoveFileMgr(storage);
    this._renameFileMgr = new RenameFileMgr(storage);

    this._commands = this._createCommands();
  }

  process(args) {
    const [command, options] = this._parseArg(args);
    if (this._commands[command] === undefined) {
      throw new Error(I18N.errors.invalidInput);
    }
    const processor = this._commands[command];
    return processor.process(options);
  }

  _createCommands() {
    return {
      'os': this._osMgr,
      'hash': this._hashMgr,
      'ls': this._dirContentMgr,
      'up': this._commandUpMgr,
      'cd': this._commandCdMgr,
      'compress': this._compressMgr,
      'decompress': this._decompressMgr,
      'cat': this._catMgr,
      'add': this._addFileMgr,
      'rm': this._removeFileMgr,
      'rn': this._renameFileMgr,
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