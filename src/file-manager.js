import { getUsername } from './common.js';
import * as readline from 'node:readline';
import { I18N } from './locale.js';
import { CommandProcessor } from './factory.js';

const USERNAME = '${username}';
const END_OPTIONS = ['.exit',];


export class FileManager {
  constructor() {
    this.username = undefined;
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '>> ',
    });
    this.processor = new CommandProcessor();
  }

  start() {
    try {
      this.username = getUsername();
      this.readline.output.write(
        this.formatMsg(I18N.msg.start, this.username)
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
      this.readline.prompt();
      try {
        const result = this.processor.process(text);
        this.readline.output.write(result  + '\n');
      } catch (err) {
        this.readline.output.write(err.message + '\n');
      }
    });

    this.readline.on('close', () => {
      this.readline.output.write(
        this.formatMsg(I18N.msg.finish, this.username)
      );
    });
  };

  formatMsg = (text, username) => `${text}\n`.replace(USERNAME, username);
}
