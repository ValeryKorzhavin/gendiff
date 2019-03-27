const renderValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (value instanceof Object) {
    return '[complex value]';
  }
  return value;
};

const stateMapping = {
  complex: ({ key, children }, parent, render) => render(children, `${parent}${key}.`),
  changed: ({ key, oldValue, newValue }, parent) => (
    `Property '${parent}${key}' was updated. From ${renderValue(oldValue)} to ${renderValue(newValue)}`
  ),
  unchanged: () => '',
  added: ({ key, value }, parent) => (
    `Property '${parent}${key}' was added with value: ${renderValue(value)}`
  ),
  removed: ({ key }, parent) => `Property '${parent}${key}' was removed`,
};

const render = (diffAst, parent) => diffAst
  .map(node => stateMapping[node.type](node, parent, render))
  .filter(node => node)
  .join('\n');

export default diffAst => render(diffAst, '');
