#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { run } from './taskrunner.js';
import loadConfig, { createDefaultConfig } from './config.js';

const config = await loadConfig();

yargs(hideBin(process.argv))
  .command(
    '$0',
    'Start tasks concurrently',
    (a) => a,
    (argv) => run(config),
  )
  .command('init', 'create default config file', (a) => a, createDefaultConfig)
  .parse();
