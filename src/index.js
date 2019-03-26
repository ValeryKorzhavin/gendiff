import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildAst from './buildAst';
import render from './renderers';



const genDiff = (firstFilePath, secondFilePath, outputFormat) => {
  const firstFileData = fs.readFileSync(firstFilePath, 'utf8');
  const secondFileData = fs.readFileSync(secondFilePath, 'utf8');

  const firstFileExtension = path.extname(firstFilePath).substr(1);
  const secondFileExtension = path.extname(secondFilePath).substr(1);
  
  const obj1 = parse(firstFileData, firstFileExtension);
  const obj2 = parse(secondFileData, secondFileExtension);
  
  const diffAst = buildAst(obj1, obj2);

  // console.log(JSON.stringify(diffAst, null, ' '));
  return render(diffAst, outputFormat);
};

export default genDiff;
