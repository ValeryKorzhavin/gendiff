import _ from 'lodash';

const tab = depth => ' '.repeat(depth * 2);

const renderValue = (value, depth) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const entries = Object.keys(value).map(key => `${tab(depth + 2)}${key}: ${value[key]}`);
  return ['{', ...entries, `${tab(depth)}}`].join('\n');
};

const format = (key, value, depth, change) => (
  `${tab(depth + 1)}${change} ${key}: ${renderValue(value, depth + 2)}`
);

const stateMapping = {
  complex: ({ key, children }, depth, render) => (
    `${tab(depth + 2)}${key}: {\n${render(children, depth + 2)}\n${tab(depth + 2)}}`
  ),
  changed: ({ key, oldValue, newValue }, depth) => ([
    `${format(key, oldValue, depth, '-')}`,
    `${format(key, newValue, depth, '+')}`,
  ]),
  unchanged: ({ key, value }, depth) => format(key, value, depth, ' '),
  added: ({ key, value }, depth) => format(key, value, depth, '+'),
  removed: ({ key, value }, depth) => format(key, value, depth, '-'),
};

const render = (diffAst, depth) => diffAst
  .map(node => stateMapping[node.type](node, depth, render));

export default diffAst => `{\n${_.flatten(render(diffAst, 0))}\n}`.split(',').join('\n');
