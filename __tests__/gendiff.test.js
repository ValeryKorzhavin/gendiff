import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const expectedFilePath = path.join(__dirname, '__fixtures__', 'diff');

const yamlBeforeFilePath = path.join(__dirname, '__fixtures__', 'before.yaml');
const yamlAfterFilePath = path.join(__dirname, '__fixtures__', 'after.yaml');

const jsonBeforeFilePath = path.join(__dirname, '__fixtures__', 'before.json');
const jsonAfterFilePath = path.join(__dirname, '__fixtures__', 'after.json');

test('flat json diff', () => {
  const expected = fs.readFileSync(expectedFilePath, 'utf-8');
  expect(genDiff(jsonBeforeFilePath, jsonAfterFilePath)).toBe(expected);
});

test('flat yaml diff', () => {
  const expected = fs.readFileSync(expectedFilePath, 'utf-8');
  expect(genDiff(yamlBeforeFilePath, yamlAfterFilePath)).toBe(expected);
});
