import simple from './renderer';

const formatMapping = {
  simple,
};

export default (diffAst, format) => formatMapping[format](diffAst);
