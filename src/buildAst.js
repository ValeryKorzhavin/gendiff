import _ from 'lodash';

const patterns = [
  {
    checkMatch: (key, obj1, obj2) => obj1[key] instanceof Object && obj2[key] instanceof Object,
    makeNode: (key, obj1, obj2, buildChild) => ({
      type: 'complex',
      key,
      children: buildChild(obj1[key], obj2[key]),
    }),
  },
  {
    checkMatch: (key, obj1, obj2) => obj1[key] === obj2[key],
    makeNode: (key, obj1) => ({
      type: 'unchanged',
      key,
      value: obj1[key],
    }),
  },
  {
    checkMatch: (key, obj1, obj2) => _.has(obj1, key) && _.has(obj2, key),
    makeNode: (key, obj1, obj2) => ({
      type: 'changed',
      key,
      oldValue: obj1[key],
      newValue: obj2[key],
    }),
  },
  {
    checkMatch: (key, obj1) => _.has(obj1, key),
    makeNode: (key, obj1) => ({
      type: 'removed',
      key,
      value: obj1[key],
    }),
  },
  {
    checkMatch: (key, obj1, obj2) => _.has(obj2, key),
    makeNode: (key, obj1, obj2) => ({
      type: 'added',
      key,
      value: obj2[key],
    }),
  },
];

const buildAst = (obj1, obj2) => {
  const objectsKeys = _.union(_.keys(obj1), _.keys(obj2));

  return objectsKeys.map(key => (
    patterns
      .find(({ checkMatch }) => checkMatch(key, obj1, obj2))
      .makeNode(key, obj1, obj2, buildAst)
  ));
};

export default buildAst;
