import simpleRender from './simpleRender';

const formatMapping = {
  simple: simpleRender,
};

export default (diffAst, format) => `{\n${formatMapping[format](diffAst)}\n}`;
