import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const extentions = [
  ['flat', 'ini'],
  ['flat', 'yaml'],
  ['flat', 'json'],
  ['nested', 'ini'],
  ['nested', 'yaml'],
  ['nested', 'json'],
];

test.each(extentions)('%s %s diff', (type, extention) => {
  const expectedFilePath = path.join(__dirname, `__fixtures__/${type}`, 'diff');
  const beforeFilePath = path.join(__dirname, `__fixtures__/${type}`, `before.${extention}`);
  const afterFilePath = path.join(__dirname, `__fixtures__/${type}`, `after.${extention}`);
  const expected = fs.readFileSync(expectedFilePath, 'utf-8');

  expect(genDiff(beforeFilePath, afterFilePath, 'simple')).toBe(expected);
});
