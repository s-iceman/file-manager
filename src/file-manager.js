import { createInterface } from 'node:readline';
import { I18N } from './text/locale.js';
import { CommandProcessor } from './commands/factory.js';
import { Storage } from './common/storage.js';
import { getUsername } from './common/username-helper.js';


const USERNAME = '${username}';
const END_OPTIONS = ['.exit',];


export class FileManager {
  constructor() {
    this.storage = new Storage();
    this.readline = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '>> ',
    });
    this.processor = new CommandProcessor(this.storage);
  }

  start() {
    try {
      const username = getUsername();
      this.storage.setUsername(username);
      this._printMsg(this._formatMsg(I18N.msg.start, username));
      this._printPromptMsg();
    } catch (err) {
      this._printErrorMsg(err.message);
    }

    this.readline.on('line', (text) => {
      text = text.toString().trim();
      if (END_OPTIONS.includes(text)) {
        this.readline.close();
        return;
      }
      try {
        this.processor.process(text).then(
          res => { 
            this._printMsg(res);
            this._printPromptMsg();
          },
          err => this._printErrorMsg(err.message)
        )
      } catch (err) {
        this._printErrorMsg(err.message);
      }
    });

    this.readline.on('close', () => {
      this._printMsg(
        this._formatMsg(I18N.msg.finish, this.storage.getUsername())
      );
    });
  };

  _formatMsg(text, username) {
    return `${text}`.replace(USERNAME, username);
  }

  _printMsg(msg) {
    if (msg) {
      this.readline.output.write(`${msg}\n`);
    }
  }

  _printPromptMsg() {
    const msg = `${I18N.msg.currentPath} ${this.storage.getCurrentDir()}`;
    this._printMsg(msg);
    this.readline.prompt();
  }

  _printErrorMsg(msg) {
    this._printMsg(msg);
    this._printPromptMsg();
  }
}
