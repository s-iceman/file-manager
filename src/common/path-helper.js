import { dirname, join } from 'node:path';
import { stat } from 'node:fs/promises'
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));

const getPath = (filepath) => join(__dirname, filepath);

const getPathList = (option) => {
  if (option.indexOf('\'') == -1 && option.indexOf('\"') == -1) {
    return option.split(/\s+/g).map(e => getPath(e.trim()));
  }
  // todo
  return option;
};

async function isFileExist(path) {
  return !!(await stat(path).catch(err => false));
};

export {
  getPath,
  getPathList,
  isFileExist,
}