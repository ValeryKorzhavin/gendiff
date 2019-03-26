import simpleRender from './simpleRender.js';

const formatMapping = {
  simple: simpleRender,
};

const render = (diffAst, format) => formatMapping[format](diffAst);

export default render;