import simpleRender from './simpleRender';

const formatMapping = {
  simple: simpleRender,
};

const render = (diffAst, format) => `{\n${formatMapping[format](diffAst)}\n}`;

export default render;
