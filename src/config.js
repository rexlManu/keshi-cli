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
  }
  // else {
  //   console.log(chalk.yellow('Using default config.'));
  //   console.log(
  //     chalk.yellow('No keshi.config.js file found in the current directory.'),
  //   );
  // }
  return defaultConfig;
}

export async function createDefaultConfig() {
  const cwd = process.cwd();
  const configFile = path.join(cwd, CONFIG_FILE_NAME);
  if (fs.existsSync(configFile)) {
    console.log(chalk.yellow('keshi.config.js already exists.'));
    return;
  }
  const defaultConfigFile = new URL(CONFIG_FILE_NAME, import.meta.url);
  fs.writeFileSync(configFile, fs.readFileSync(defaultConfigFile, 'utf8'));
  console.log(chalk.green(`Created ${CONFIG_FILE_NAME}`));
}
