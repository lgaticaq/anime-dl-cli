#!/usr/bin/env node

'use strict';

const program = require('commander');
const animeDl = require('anime-dl');
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const ora = require('ora');

updateNotifier({pkg}).notify();

program
  .version(pkg.version)
  .usage('-a <anime> -c <chapter>')
  .description('CLI to get a chapter link')
  .option('-a, --anime [anime]', 'Add name')
  .option('-c, --chapter [chapter]', 'Add chapter')
  .parse(process.argv);

if (program.anime && program.chapter) {
  const spinner = ora('Searching...');
  spinner.start();
  animeDl.getLinksByNameAndChapter(program.anime, program.chapter).then((data) => {
    spinner.stop();
    if (data.urls.length === 0) return console.log(chalk.red('No links found'));
    console.log(chalk.green('Run any of these links in your video player'));
    for (let url of data.urls) {
      console.log(chalk.green(url));
    }
  }).catch((err) => {
    spinner.stop();
    console.log(chalk.red(`Error: ${err.message}`));
  });
} else {
  program.help();
}
