import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const extentions = [
  'ini',
  'yaml',
  'json',
];

test.each(extentions)('flat %s diff', (extention) => {
  const expectedFilePath = path.join(__dirname, '__fixtures__', 'diff');
  const beforeFilePath = path.join(__dirname, '__fixtures__', `before.${extention}`);
  const afterFilePath = path.join(__dirname, '__fixtures__', `after.${extention}`);
  const expected = fs.readFileSync(expectedFilePath, 'utf-8');

  expect(genDiff(beforeFilePath, afterFilePath)).toBe(expected);
});
