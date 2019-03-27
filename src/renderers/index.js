import simple from './renderer';
import plain from './plainRenderer';

const formatMapping = {
  simple,
  plain,
};

export default (diffAst, format) => formatMapping[format](diffAst);
