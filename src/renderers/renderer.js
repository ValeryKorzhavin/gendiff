const tab = depth => ' '.repeat(depth * 2);

const stateMapping = {
  unchanged: ' ',
  added: '+',
  removed: '-',
  complex: ' ',
};

const renderValue = (value, depth) => {
  if (value instanceof Object) {
    const entries = Object.keys(value).map(key => `${tab(depth + 4)}${key}: ${value[key]}`);
    return ['{', ...entries, `${tab(depth + 2)}}`].join('\n');
  }
  return `${value}`;
};

const render = (diff, depth) => (
  diff.map(({ key, type, value }) => {
    if (type === 'complex') {
      return `${tab(depth + 1)}`
      + `${stateMapping[type]} ${key}: {\n${render(value, depth + 2).join('\n')}`
      + `\n${tab(depth + 2)}}`;
    }
    return `${tab(depth + 1)}${stateMapping[type]} ${key}: ${renderValue(value, depth)}`;
  })
);

export default diffAst => `{\n${render(diffAst, 0)}\n}`.split(',').join('\n');
