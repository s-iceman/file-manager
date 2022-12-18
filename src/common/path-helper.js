import { join, isAbsolute } from 'node:path';
import { lstat } from 'node:fs/promises'
import { I18N } from '../text/locale.js';


const getPath = (filepath, dir=undefined) => {
  return isAbsolute(filepath) ? filepath : join(dir, filepath);
}

const getPathList = (option, dir=undefined) => {
  if (option.indexOf('\'') == -1 && option.indexOf('\"') == -1) {
    return option.split(/\s+/g).map(e => getPath(e.trim(), dir));
  }
  // todo
  return option;
};

const parseOption = (option) => {
  if (option.indexOf('\'') == -1 && option.indexOf('\"') == -1) {
    return option.split(/\s+/g);
  }
  // todo
  return option;
}

async function isFileExist(path) {
  try {
    return (await lstat(path)).isFile();
  } catch(err) {
    return false;
  };
};

async function isDirExist(path) {
  try {
    return (await lstat(path)).isDirectory();
  } catch(err) {
    throw new Error(I18N.errors.failed);
  };
}

export {
  getPath,
  getPathList,
  isFileExist,
  isDirExist,
  parseOption,
}