import fs from 'fs';

export function mkdirs(string) {
  if (!fs.existsSync(string)) {
    fs.mkdirSync(string);
  }
}
