const tab = depth => ' '.repeat(depth * 2);

const renderValue = (value, depth) => {
  if (value instanceof Object) {
    const entries = Object.keys(value).map(key => `${tab(depth + 4)}${key}: ${value[key]}`);
    return ['{', ...entries, `${tab(depth + 2)}}`].join('\n');
  }
  return `${value}`;
};

const format = (key, value, depth, change) => (
  `${tab(depth + 1)}${change} ${key}: ${renderValue(value, depth)}`
);

const typeMapping = {
  complex: ({ key, children }, depth, render) => (
    `${tab(depth + 2)}${key}: {\n${render(children, depth + 2)}\n${tab(depth + 2)}}`
  ),
  changed: ({ key, oldValue, newValue }, depth) => (
    `${format(key, oldValue, depth, '-')}\n${format(key, newValue, depth, '+')}`
  ),
  unchanged: ({ key, value }, depth) => format(key, value, depth, ' '),
  added: ({ key, value }, depth) => format(key, value, depth, '+'),
  removed: ({ key, value }, depth) => format(key, value, depth, '-'),
};

const render = (diffAst, depth = 0) => diffAst
  .map(node => typeMapping[node.type](node, depth, render))
  .join('\n');

export default render;
