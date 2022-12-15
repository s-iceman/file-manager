import { argv } from 'node:process';
import { I18N } from './locale.js';

const USERNAME_TEMPLATE = '--username=';

const getUsername = () => {
  const argIdx = 2;
  if (argv.length < argIdx) {
    throw new Error(I18N.errors.invalidArg);
  }

  const arg = argv[argIdx];
  if (!arg.startsWith(USERNAME_TEMPLATE)) {
    throw new Error(I18N.errors.invalidUsernameOption);
  }
  const username = arg.slice(arg.indexOf('=') + 1);
  if (!username) {
    throw new Error(I18N.errors.invalidUsernameValue);
  }
  return username;
};

export { getUsername };