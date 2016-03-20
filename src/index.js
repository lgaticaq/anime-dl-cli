#!/usr/bin/env node

'use strict';

import program from 'commander';
import animeDl from 'anime-dl';
import chalk from 'chalk';
import updateNotifier from 'update-notifier';
import pkg from '../package.json';

updateNotifier({pkg}).notify();

program
  .version(pkg.version)
  .usage('-a <anime> -c <chapter>')
  .description('CLI for get chapter link')
  .option('-a, --anime [anime]', 'Add name')
  .option('-c, --chapter [chapter]', 'Add chapter')
  .parse(process.argv);

if (program.anime && program.chapter) {
  console.log(chalk.green('Searching...'));
  animeDl.getLinksByNameAndChapter(program.anime, program.chapter).then((data) => {
    if (data.urls.length === 0) return console.log(chalk.red('Not found a link'));
    console.log(chalk.green('Run any this links in your video player'));
    for (let url of data.urls) {
      console.log(chalk.green(url));
    }
  }).catch((err) => console.log(chalk.red(`Error: ${err.message}`)));
} else {
  program.help();
}
