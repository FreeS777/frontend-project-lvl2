import yaml from 'js-yaml';
import ini from 'ini';

const parseManager = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
  '.ini': ini.parse,
};

export default (type, data) => parseManager[type](data);
