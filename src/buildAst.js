import _ from 'lodash';

const makeNode = (key, type, value) => ({
  key,
  type,
  value,
});

const patterns = [
  {
    checkMatch: (key, obj1, obj2) => obj1[key] instanceof Object && obj2[key] instanceof Object,
    node: (key, obj1, obj2, buildChild) => makeNode(key,'complex', buildChild(obj1[key], obj2[key])),
  },
  {
    checkMatch: (key, obj1, obj2) => obj1[key] === obj2[key],
    node: (key, obj1) => makeNode(key, 'unchanged', obj1[key]),
  },
  {
    checkMatch: (key, obj1, obj2) => _.has(obj1, key) && _.has(obj2, key),
    node: (key, obj1, obj2) => ([
      makeNode(key, 'removed', obj1[key]),
      makeNode(key, 'added', obj2[key])
    ]),
  },
  {
    checkMatch: (key, obj1) => _.has(obj1, key),
    node: (key, obj1) => makeNode(key, 'removed', obj1[key]),
  },
  {
    checkMatch: (key, obj1, obj2) => _.has(obj2, key),
    node: (key, obj1, obj2) => makeNode(key, 'added', obj2[key]),
  },
];

const buildAst = (obj1, obj2) => {
  const objectsKeys = _.union(_.keys(obj1), _.keys(obj2));

  return _.flatten(objectsKeys
    .map(key => (patterns
      .find(({ checkMatch }) => checkMatch(key, obj1, obj2))
      .node(key, obj1, obj2, buildAst)
    )));
};

export default buildAst;
