import yaml from 'js-yaml';

const extensionsMapping = {
  yaml: yaml.safeLoad,
  json: JSON.parse,
};

const parse = (data, extension) => extensionsMapping[extension](data);

export default parse;
