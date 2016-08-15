#!/usr/bin/env node

'use strict';

const program = require('commander');
const animeDl = require('anime-dl');
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const ora = require('ora');
const spawn = require('child_process').spawn;

updateNotifier({pkg}).notify();

program
  .version(pkg.version)
  .usage('-a <anime> -c <chapter>')
  .description('CLI to get a chapter link')
  .option('-a, --anime [anime]', 'Add name')
  .option('-c, --chapter [chapter]', 'Add chapter')
  .option('-k, --mpv', 'Play chapter in mpv')
  .parse(process.argv);

if (program.anime && program.chapter) {
  const spinner = ora('Searching...');
  spinner.start();
  animeDl.getLinksByNameAndChapter(program.anime, program.chapter).then((data) => {
    spinner.stop();
    if (data.urls.length === 0) return console.log(chalk.red('No links found'));
    if (program.mpv) {
      const url = data.urls[0];
      console.log(chalk.green(`Playing ${url} in mpv`));
      spawn('mpv', [url], {detached: true, stdio: 'ignore'});
    } else {
      console.log(chalk.green('Run any of these links in your video player'));
      for (let url of data.urls) {
        console.log(chalk.green(url));
      }
    }
  }).catch((err) => {
    spinner.stop();
    console.log(chalk.red(`Error: ${err.message}`));
  });
} else {
  program.help();
}
