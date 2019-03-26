const tab = depth => ' '.repeat(depth * 2);
const format = (key, line, depth, change) => `${tab(depth)}${change} ${key}: ${line}`;

const renderValue = (value, depth) => {
  if (value instanceof Object) {
    const entries = Object.keys(value).map(key => `${tab(depth + 4)}${key}: ${value[key]}`);
    return ['{\n', ...entries, `\n${tab(depth + 2)}}`].join('');
  }
  return `${value}`;
};

const render = (diffAst, depth = 0) => {
  const typeMapping = {
    complex: ({ key, children }) => (
      `${format(key, '{\n', depth + 1, ' ')}`
      + `${render(children, depth + 2)}`
      + `\n${tab(depth + 2)}}`
    ),
    changed: ({ key, oldValue, newValue }) => (
      format(key, `${renderValue(oldValue, depth)}\n`, depth + 1, '-')
      + format(key, `${renderValue(newValue, depth)}`, depth + 1, '+')
    ),
    unchanged: ({ key, value }) => format(key, `${renderValue(value, depth)}`, depth + 1, ' '),
    added: ({ key, value }) => format(key, `${renderValue(value, depth)}`, depth + 1, '+'),
    removed: ({ key, value }) => format(key, `${renderValue(value, depth)}`, depth + 1, '-'),
  };

  return diffAst.map(node => typeMapping[node.type](node, depth)).join('\n');
};

export default render;
