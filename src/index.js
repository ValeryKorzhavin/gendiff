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
  const keysIntersection = _.intersection(_.keys(obj1), _.keys(obj2));
  const onlyFirstObjectKeys = _.difference(_.keys(obj1), _.keys(obj2));
  const onlySecondObjectKeys = _.difference(_.keys(obj2), _.keys(obj1));

  const bothObjectsDiff = keysIntersection.reduce((acc, key) => {
    if (obj1[key] === obj2[key]) {
      return { ...acc, [`  ${key}`]: obj2[key] };
    }
    return { ...acc, [`- ${key}`]: obj1[key], [`+ ${key}`]: obj2[key] };
  }, {});

  const firstObjectDiff = onlyFirstObjectKeys
    .reduce((acc, key) => ({ ...acc, [`- ${key}`]: obj1[key] }), {});
  const secondObjectDiff = onlySecondObjectKeys
    .reduce((acc, key) => ({ ...acc, [`+ ${key}`]: obj2[key] }), {});

  const format = diffObject => _
    .keys(diffObject)
    .map(key => `  ${key}: ${diffObject[key]}`);

  const output = `{\n${[
    ...format(bothObjectsDiff),
    ...format(firstObjectDiff),
    ...format(secondObjectDiff),
  ].join('\n')}\n}`;

  return output;
};

export default genDiff;
