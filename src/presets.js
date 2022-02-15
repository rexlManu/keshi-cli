import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { findUp } from 'find-up';

const configPath = await findUp(['.keshirc', '.keshirc.json']);
const config = configPath ? JSON.parse(fs.readFileSync(configPath)) : {};

const saveConfig = () => {
  fs.writeFileSync(
    configPath ??
      path.join(process.env.HOME ?? process.env.USERPROFILE ?? '', '.keshirc'),
    JSON.stringify(config, null, 2),
  );
};

export const createPreset = async () => {
  const name = (
    await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the preset?',
      },
    ])
  ).name;

  // check if name is already taken
  if (config.presets && config.presets[name]) {
    console.log(chalk.red(`Preset ${name} already exists`));
    return;
  }

  const tasks = {};
  while (true) {
    const { taskName, task } = await inquirer.prompt([
      {
        type: 'input',
        name: 'taskName',
        message: 'What is the name of the task? (leave empty to stop)',
      },
      {
        type: 'input',
        name: 'task',
        message: 'What task would you like to run? (leave empty to stop)',
      },
    ]);
    if (task === '' || taskName == '') break;
    tasks[taskName] = task;
  }
  const preset = {
    name,
    tasks,
  };
  // display the preset and ask if the user wants to save it
  console.log(chalk.green(`Preset ${name} created`));
  console.log(chalk.green(`Tasks: ${Object.values(tasks).join(', ')}`));
  const save = (
    await inquirer.prompt([
      {
        type: 'confirm',
        name: 'save',
        message: 'Save this preset?',
        default: true,
      },
    ])
  ).save;
  if (!save) return;
  config.presets = config.presets || {};
  config.presets[name] = preset;
  saveConfig();

  console.log(chalk.green(`Preset ${name} saved`));
};

export const listPresets = () => {
  if (!config.presets) {
    console.log(chalk.red('No presets found'));
    return;
  }
  // check if presets are empty
  if (Object.keys(config.presets).length === 0) {
    console.log(chalk.red('No presets found'));
    return;
  }
  console.log(chalk.green('Presets:'));
  Object.keys(config.presets).forEach((preset) => {
    console.log('  - ' + chalk.green(`${preset}`));
    Object.values(config.presets[preset].tasks).forEach((task) => {
      console.log('    - ' + chalk.green(`${task}`));
    });
  });
};
export const deletePreset = async (args) => {
  const name = args.name;

  // check if name is already taken
  if (!config.presets || !config.presets[name]) {
    console.log(chalk.red(`Preset ${name} does not exist`));
    return;
  }

  // display the preset and ask if the user wants to delete it
  console.log(chalk.green(`Preset ${name} will be deleted`));
  const save = (
    await inquirer.prompt([
      {
        type: 'confirm',
        name: 'save',
        message: 'Delete this preset?',
        default: true,
      },
    ])
  ).save;
  if (!save) return;
  delete config.presets[name];
  saveConfig();

  console.log(chalk.green(`Preset ${name} deleted`));
};

export const preset = (name) => {
  if (!config.presets || !config.presets[name]) {
    console.log(chalk.red(`Preset ${name} does not exist`));
    return;
  }
  return config.presets[name];
};
