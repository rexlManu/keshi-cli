#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { run } from './taskrunner.js';
import loadConfig, { createDefaultConfig } from './config.js';
import { createPreset, listPresets, deletePreset } from './presets.js';

const config = await loadConfig();

yargs(hideBin(process.argv))
  .command(
    '$0',
    'Start tasks concurrently',
    () => {},
    (argv) => run(argv, config),
  )
  .command('init', 'create default config file', () => {}, createDefaultConfig)
  .command('create', 'create a new preset', () => {}, createPreset)
  .command('list', 'list available presets', () => {}, listPresets)
  .command(
    'delete <name>',
    'delete a preset',
    (yargs) => {
      return yargs.positional('name', {
        describe: 'name of the preset to delete',
      });
    },
    deletePreset,
  )
  .option('preset', {
    alias: 'p',
    describe: 'name of the preset to use',
    type: 'string',
  })
  .parse();
