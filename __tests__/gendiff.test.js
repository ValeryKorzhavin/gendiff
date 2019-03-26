import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const extentions = [
  'ini',
  'yaml',
  'json',
];

test.each(extentions)('flat %s diff', (extention) => {
  const expectedFilePath = path.join(__dirname, '__fixtures__/flat', 'diff');
  const beforeFilePath = path.join(__dirname, '__fixtures__/flat', `before.${extention}`);
  const afterFilePath = path.join(__dirname, '__fixtures__/flat', `after.${extention}`);
  const expected = fs.readFileSync(expectedFilePath, 'utf-8');

  expect(genDiff(beforeFilePath, afterFilePath, 'simple')).toBe(expected);
});

test.each(extentions)('nested %s diff', (extention) => {
  const expectedFilePath = path.join(__dirname, '__fixtures__/nested', 'diff');
  const beforeFilePath = path.join(__dirname, '__fixtures__/nested', `before.${extention}`);
  const afterFilePath = path.join(__dirname, '__fixtures__/nested', `after.${extention}`);
  const expected = fs.readFileSync(expectedFilePath, 'utf-8');

  expect(genDiff(beforeFilePath, afterFilePath, 'simple')).toBe(expected);
});
