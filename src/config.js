import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import defaultConfig from './keshi.config.js';

const CONFIG_FILE_NAME = 'keshi.config.js';

export default async function () {
  const cwd = process.cwd();
  // check if a windvel.config.js file exists
  const configFile = path.join(cwd, CONFIG_FILE_NAME);
  if (fs.existsSync(configFile)) {
    // check if on windows
    const filePrefix = process.platform === 'win32' ? 'file://' : '';
    const module = (await import(`${filePrefix}${configFile}`)).default;
    return { ...defaultConfig, ...module };
  } else {
    console.log(chalk.yellow('Using default config.'));
    console.log(
      chalk.yellow('No keshi.config.js file found in the current directory.'),
    );
  }
  return defaultConfig;
}
