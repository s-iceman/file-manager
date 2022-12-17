import { dirname, join, normalize } from 'node:path';
import { stat, lstat } from 'node:fs/promises'
import { fileURLToPath } from 'url';
import { I18N } from '../text/locale.js';


const __dirname = dirname(fileURLToPath(import.meta.url));

const getPath = (filepath, dir) => join(__dirname, filepath);

const getPathList = (option) => {
  if (option.indexOf('\'') == -1 && option.indexOf('\"') == -1) {
    return option.split(/\s+/g).map(e => getPath(e.trim()));
  }
  // todo
  return option;
};

const constructPath = (fileName, sourcePath, isFile=true) => {
  // todo;
  if (isFile) {

  }
  return '';
}

async function isFileExist(path) {
  return !!(await stat(path).catch(err => false));
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
  constructPath,
}