#!/usr/bin/env node

import program from 'commander';

program
  .version('1.0.1')
  .usage('[options] <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
