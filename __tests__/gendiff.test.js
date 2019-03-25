import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const firstFilePath = path.join(__dirname, '__fixtures__', 'before.json');
const secondFilePath = path.join(__dirname, '__fixtures__', 'after.json');
const expectedFilePath = path.join(__dirname, '__fixtures__', 'diff');
const expected = fs.readFileSync(expectedFilePath, 'utf-8');

test('flat json diff', () => {
  expect(genDiff(firstFilePath, secondFilePath)).toBe(expected);
});
