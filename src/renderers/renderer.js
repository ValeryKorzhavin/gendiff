import _ from 'lodash';

const typeMapping = {
  unchanged: ' ',
  added: '+',
  removed: '-',
  oldValue: '-',
  newValue: '+',
  complex: ' ',
};

const render = (diff) => {
  const getJson = diff.reduce((result, { key, type, value }) => {
    if (_.isArray(value)) {
      return { ...result, [`${typeMapping[type]} ${key}`]: render(value) };
    }
    return { ...result, [`${typeMapping[type]} ${key}`]: value };
  }, {});
  return getJson;
};

export default diffAst => JSON.stringify(render(diffAst), ' ', 2).replace(/"/g, '').replace(/,/g, '');
