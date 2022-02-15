#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import chalk from 'chalk';

const cwd = process.cwd();
const defaultConfig = {
  tasks: {
    laravel: 'php artisan serve',
    vue: 'yarn dev',
  },
};

const runningTasks = [];

let config = defaultConfig;

// check if a windvel.config.js file exists
const configFile = path.join(cwd, 'keshi.config.js');
if (fs.existsSync(configFile)) {
  // check if on windows
  const filePrefix = process.platform === 'win32' ? 'file://' : '';
  const module = (await import(`${filePrefix}${configFile}`)).default;
  config = { ...defaultConfig, ...module };
} else {
  console.log(chalk.yellow('Using default config.'));
  console.log(
    chalk.yellow('No keshi.config.js file found in the current directory.'),
  );
}

// check if tasks are empty
if (config.tasks.length === 0) {
  console.log(chalk.red('No tasks found in keshi.config.js'));
  process.exit(1);
}

// spawn a new process for each task and add them to the runningTasks array
Object.keys(config.tasks).forEach((taskName) => {
  const task = config.tasks[taskName];
  const taskProcess = spawn(task, {
    shell: true,
  });
  console.log(chalk.green(`Spawned task: ${taskName} (${task})`));
  const prefix = chalk.white(`[${chalk.cyan(taskName)}] `);
  runningTasks.push(taskProcess);
  // log the task output
  taskProcess.stdout.on('data', (data) => {
    // split data at newlines
    const lines = data.toString().split('\n');
    lines.forEach((line) => {
      console.log(prefix + line);
    });
  });
  taskProcess.stderr.on('data', (data) => {
    // split data at newlines
    const lines = data.toString().split('\n');
    lines.forEach((line) => {
      console.log(prefix + line);
    });
  });

  // when a task ends, remove it from the runningTasks array
  taskProcess.on('exit', () => {
    const index = runningTasks.indexOf(taskProcess);
    if (index > -1) {
      runningTasks.splice(index, 1);
    }
  });
});

// when the process gets terminated, kill all running tasks
process.on('SIGINT', () => {
  console.log(chalk.red('\nTerminating all running tasks...'));
  runningTasks.forEach((task) => {
    task.kill('SIGINT');
  });
  process.exit(1);
});
