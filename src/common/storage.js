import { homedir } from 'node:os';


export class Storage {
  constructor() {
    this.username = undefined;
    this.currentDir = homedir();
  }

  getCurrentDir() {
    return this.currentDir;
  }

  getUsername() {
    return this.username;
  }

  updateCurrentDir(dir) {
    this.currentDir = dir;
  }

  setUsername(username) {
    this.username = username;
  }
}
