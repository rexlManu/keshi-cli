#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { run } from './taskrunner.js';
import loadConfig from './config.js';

const config = await loadConfig();

yargs(hideBin(process.argv))
  .command(
    '$0',
    'Start tasks concurrently',
    (a) => a,
    (argv) => run(config),
  )
  .parse();
