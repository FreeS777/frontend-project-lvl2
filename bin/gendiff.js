#!/usr/bin/env node
import program from 'commander';
import { genDiff } from '../src/index.js'
import path from 'path';
program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format [type] ', 'Output format')
    .arguments('<filepath1> <filepath2>')
    .action((firstFilePath, secondFilePath) => (
        console.log(genDiff(path.resolve(process.cwd(), firstFilePath), path.resolve(process.cwd(), secondFilePath)))))
    .parse(process.agrv);