#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';

program
  .version('1.0.3')
  .usage('[options] <firstConfig> <secondConfig>')
  .arguments('<firstConfig> [pathToFile1] <secondConfig> [pathToFile2]')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);

console.log(genDiff(...program.args));
