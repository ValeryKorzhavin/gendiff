#!/usr/bin/env node

import program from 'commander';
import genDiff from '..';
import { version, description } from '../../package.json';

program
  .version(version)
  .description(description)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output formats: simple, plain', 'simple')
  .usage('[options] <firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => (
    console.log(genDiff(firstConfig, secondConfig, program.format))
  ))
  .parse(process.argv);
