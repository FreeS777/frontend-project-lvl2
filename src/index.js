import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parseData from './parsers.js';

const isNewKey = (key, obj1, obj2) => _.has(obj2, key) && !_.has(obj1, key);
const isDeletedKey = (key, obj1, obj2) => _.has(obj1, key) && !_.has(obj2, key);
const isSharedKey = (key, obj1, obj2) => _.has(obj1, key) && _.has(obj2, key);
const hasSameValue = (key, obj1, obj2) => obj1[key] === obj2[key];

export default (pathFile1, pathFile2) => {
  const data1 = fs.readFileSync(`${pathFile1}`, 'utf8');
  const data2 = fs.readFileSync(`${pathFile2}`, 'utf8');
  const obj1 = parseData(path.extname(pathFile1), data1);
  const obj2 = parseData(path.extname(pathFile2), data2);
  const int = '  ';
  const keys = _.union(_.keys(obj1), _.keys(obj2)).sort();
  const result = keys.reduce((res, key) => {
    let newRes = '';
    if (isDeletedKey(key, obj1, obj2)) {
      newRes = `${res}${int}- ${key}: ${obj1[key]}\n`;
    }
    if (isSharedKey(key, obj1, obj2) && hasSameValue(key, obj1, obj2)) {
      newRes = `${res}${int}  ${key}: ${obj1[key]}\n`;
    }
    if (isSharedKey(key, obj1, obj2) && !hasSameValue(key, obj1, obj2)) {
      newRes = `${res}${int}- ${key}: ${obj1[key]}\n${int}+ ${key}: ${obj2[key]}\n`;
    }
    if (isNewKey(key, obj1, obj2)) {
      newRes = `${res}${int}+ ${key}: ${obj2[key]}\n`;
    }
    return newRes;
  }, '');
  return `{\n${result}}`;
};
