const typeMapping = {
  unchanged: ' ',
  added: '+',
  removed: '-',
  oldValue: '-',
  newValue: '+',
  complex: '',
};

const render = diff => (
  diff.reduce((result, { key, type, value }) => {
    if (value instanceof Array) {
      return { ...result, [`${typeMapping[type]}${key}`]: render(value) };
    }
    return { ...result, [`${typeMapping[type]} ${key}`]: value };
  }, {})
);

export default diffAst => JSON.stringify(render(diffAst), ' ', 4).replace(/"/g, '').replace(/,/g, '');
