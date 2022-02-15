import { spawn } from 'child_process';
import chalk from 'chalk';
import { preset as loadPreset } from './presets.js';

const runningTasks = [];

export async function run(argv, config) {
  const preset = argv.preset
    ? loadPreset(argv.preset)
    : config.preset || config.preset == ''
    ? loadPreset(config.preset)
    : config;
  if (!preset) {
    return;
  }

  // check if tasks are empty
  if (preset.tasks.length === 0) {
    console.log(chalk.red('No tasks found in keshi.config.js'));
    process.exit(1);
  }
  // print tasks
  console.log(chalk.green(`Tasks: ${Object.values(preset.tasks).join(', ')}`));

  // spawn a new process for each task and add them to the runningTasks array
  Object.keys(preset.tasks).forEach((taskName) => {
    const task = preset.tasks[taskName];
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
        console.log(prefix + chalk.red(line));
      });
    });

    // when a task ends, remove it from the runningTasks array
    taskProcess.on('exit', () => {
      const index = runningTasks.indexOf(taskProcess);
      if (index > -1) {
        runningTasks.splice(index, 1);
      }
      console.log(chalk.green(`Task ${taskName} ended`));
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
}
