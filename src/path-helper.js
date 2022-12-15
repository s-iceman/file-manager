import { dirname, join } from 'node:path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));

export const getPath = (filepath) => join(__dirname, filepath);
