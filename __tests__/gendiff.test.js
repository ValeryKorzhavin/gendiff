import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const testCases = [
  ['flat', 'yaml', 'json'],
  ['flat', 'json', 'json'],
  ['nested', 'ini', 'json'],
  ['nested', 'yaml', 'json'],
  ['nested', 'json', 'json'],
  ['flat', 'ini', 'pretty'],
  ['flat', 'yaml', 'pretty'],
  ['flat', 'json', 'pretty'],
  ['nested', 'ini', 'pretty'],
  ['nested', 'yaml', 'pretty'],
  ['nested', 'json', 'pretty'],
  ['flat', 'yaml', 'plain'],
  ['flat', 'json', 'plain'],
  ['nested', 'ini', 'plain'],
  ['nested', 'yaml', 'plain'],
  ['nested', 'json', 'plain'],
];

test.each(testCases)('%s %s diff %s format', (type, extention, format) => {
  const expectedFilePath = path.join(__dirname, `__fixtures__/${type}`, `${format}`);
  const beforeFilePath = path.join(__dirname, `__fixtures__/${type}`, `before.${extention}`);
  const afterFilePath = path.join(__dirname, `__fixtures__/${type}`, `after.${extention}`);
  const expected = fs.readFileSync(expectedFilePath, 'utf-8');

  expect(genDiff(beforeFilePath, afterFilePath, `${format}`)).toBe(expected);
});
