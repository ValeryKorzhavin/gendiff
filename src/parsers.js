import yaml from 'js-yaml';
import ini from 'ini';

const extensionsMapping = {
  yaml: yaml.safeLoad,
  json: JSON.parse,
  ini: ini.parse,
};

export default (data, extension) => extensionsMapping[extension](data);
