import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const extentions = [
  ['flat', 'ini', 'simple'],
  ['flat', 'yaml', 'simple'],
  ['flat', 'json', 'simple'],
  ['nested', 'ini', 'simple'],
  ['nested', 'yaml', 'simple'],
  ['nested', 'json', 'simple'],
  ['flat', 'yaml', 'plain'],
  ['flat', 'json', 'plain'],
  ['nested', 'ini', 'plain'],
  ['nested', 'yaml', 'plain'],
  ['nested', 'json', 'plain'],
];

test.each(extentions)('%s %s diff %s format', (type, extention, format) => {
  const expectedFilePath = path.join(__dirname, `__fixtures__/${type}`, `${format}`);
  const beforeFilePath = path.join(__dirname, `__fixtures__/${type}`, `before.${extention}`);
  const afterFilePath = path.join(__dirname, `__fixtures__/${type}`, `after.${extention}`);
  const expected = fs.readFileSync(expectedFilePath, 'utf-8');

  expect(genDiff(beforeFilePath, afterFilePath, `${format}`)).toBe(expected);
});
