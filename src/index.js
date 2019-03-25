import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

const genDiff = (firstFilePath, secondFilePath) => {
  const firstFileData = fs.readFileSync(firstFilePath, 'utf8');
  const secondFileData = fs.readFileSync(secondFilePath, 'utf8');
  const firstFileExtension = path.extname(firstFilePath).substr(1);
  const secondFileExtension = path.extname(secondFilePath).substr(1);

  const obj1 = parse(firstFileData, firstFileExtension);
  const obj2 = parse(secondFileData, secondFileExtension);
  const objectsKeys = _.union(_.keys(obj1), _.keys(obj2));

  const diff = objectsKeys.reduce((acc, key) => {
    if (obj1[key] === obj2[key]) {
      return [...acc, `    ${key}: ${obj2[key]}`];
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      return [...acc, `  - ${key}: ${obj1[key]}`, `  + ${key}: ${obj2[key]}`];
    }
    if (_.has(obj1, key)) {
      return [...acc, `  - ${key}: ${obj1[key]}`];
    }
    if (_.has(obj2, key)) {
      return [...acc, `  + ${key}: ${obj2[key]}`];
    }
    return acc;
  }, []);
  const output = `{\n${diff.join('\n')}\n}`;

  return output;
};

export default genDiff;
