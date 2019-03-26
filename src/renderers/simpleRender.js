
const tab = depth => ' '.repeat(depth * 2);

const typeMapping = {
  complex: ({ key, children }, depth) => `${tab(depth)}${key}: {\n` + render(children, depth + 1) + `\n${tab(depth)}}`,
  changed: ({ key, oldValue, newValue }, depth) => `${tab(depth)}${key}: ` + renderValue(oldValue, depth) + `\n${tab(depth)}${key}: ` + renderValue(newValue, depth),
  unchanged: ({ key, value }, depth) => `${tab(depth)}${key}: ` + renderValue(value, depth),
  added: ({ key, value }, depth) => `${tab(depth)}${key}: ` + renderValue(value, depth),
  removed: ({ key, value }, depth) => `${tab(depth)}${key}: ` + renderValue(value, depth),
};

const renderValue = (value, depth) => {
  if (value instanceof Object) {
    const keys = Object.keys(value); 
    const entries = keys.map(key => `${tab(depth + 1)}${key}: ${value[key]}`);
    return [`{\n`, ...entries, `\n${tab(depth)}}`].join(``);
  }
  return `${value}`;  
};

const render = (diffAst, depth = 0) => diffAst.map(node => typeMapping[node.type](node, depth)).join('\n');

export default render;