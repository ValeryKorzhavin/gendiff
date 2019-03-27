import simple from './simpleRenderer';
import plain from './plainRenderer';
import json from './jsonRenderer';

const formatMapping = {
  simple,
  plain,
  json,
};

export default (diffAst, format) => formatMapping[format](diffAst);
