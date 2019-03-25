#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';
import { version, description } from '../../package.json';

program
  .version(version)
  .description(description)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')
  .usage('[options] <firstConfig> <secondConfig>')
  .parse(process.argv);

console.log(genDiff(...program.args));
