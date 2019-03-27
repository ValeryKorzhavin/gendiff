import pretty from './prettyRenderer';
import plain from './plainRenderer';
import json from './jsonRenderer';

const formatMapping = {
  pretty,
  plain,
  json,
};

export default (diffAst, format) => formatMapping[format](diffAst);
