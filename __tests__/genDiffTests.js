// import { expect, test } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src/index.js';

test('difference two JSON files', () => {
  const dir = './__tests__/__fixtures__';
  const pathFirstConfig = `${dir}/fixture1.json`;
  const pathSecondConfig = `${dir}/fixture2.json`;
  const result = fs.readFileSync(`${dir}/result`).toString();
  const actual = genDiff(pathFirstConfig, pathSecondConfig);
  expect(result).toBe(actual);
});

test('difference two YAML files', () => {
  const dir = './__tests__/__fixtures__';
  const pathFirstConfig = `${dir}/fixture1.yml`;
  const pathSecondConfig = `${dir}/fixture2.yml`;
  const result = fs.readFileSync(`${dir}/result`).toString();
  const actual = genDiff(pathFirstConfig, pathSecondConfig);
  expect(result).toBe(actual);
});
