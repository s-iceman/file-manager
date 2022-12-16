import * as readline from 'node:readline';
import { I18N } from './text/locale.js';
import { CommandProcessor } from './commands/factory.js';
import { Storage } from './common/storage.js';
import { getUsername } from './common/username-helper.js';


const USERNAME = '${username}';
const END_OPTIONS = ['.exit',];


export class FileManager {
  constructor() {
    this.storage = new Storage();
    this.readline = readline.createInterface({
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
      this.readline.output.write(
        this.formatMsg(I18N.msg.start, username)
      );
    } catch (err) {
      this.readline.output.write(err.message + '\n');
    }
    this.readline.prompt();

    this.readline.on('line', (text) => {
      text = text.toString().trim();
      if (END_OPTIONS.includes(text)) {
        this.readline.close();
        return;
      }
      try {
        this.processor.process(text)
        .then(
          res => { 
            this.readline.output.write(res  + '\n');
            this.readline.prompt();
          },
          err => {
            this.readline.output.write(err.message + '\n');
            this.readline.prompt();
          }
        )
      } catch (err) {
        this.readline.output.write(err.message + '\n');
        this.readline.prompt();
      }
    });

    this.readline.on('close', () => {
      this.readline.output.write(
        this.formatMsg(I18N.msg.finish, this.storage.getUsername())
      );
    });
  };

  formatMsg(text, username) {
    return `${text}\n`.replace(USERNAME, username);
  }
}
