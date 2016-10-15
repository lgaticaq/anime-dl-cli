#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
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
  .option('-d, --download [directory]', 'Download chapter to directory')
  .parse(process.argv);

if (program.anime && program.chapter) {
  const spinner = ora('Searching');
  spinner.start();
  animeDl.getLinksByNameAndChapter(program.anime, program.chapter).then((data) => {
    if (data.urls.length === 0) {
      spinner.text = 'No links found';
      spinner.fail();
      return;
    }
    spinner.succeed();
    if (program.mpv) {
      const url = data.urls[0];
      console.log(chalk.green(`Playing ${url} in mpv`));
      spawn('mpv', [url], {detached: true, stdio: 'ignore'});
    } else if (typeof program.download !== 'undefined') {
      if (program.download === true) {
        program.download = process.cwd();
      }
      if (!fs.existsSync(program.download)) {
        spinner.text = 'Destination no exist';
        spinner.fail();
        return;
      }
      const filename = path.join(program.download, `${data.title} ${data.chapter}.mp4`);
      if (fs.existsSync(filename)) {
        spinner.text = `Destination ${filename} already exist`;
        spinner.fail();
        return;
      }
      const url = data.urls[0];
      spinner.text = `Downloading ${data.title} chapter ${data.chapter}`;
      spinner.start();
      const wget = spawn('wget', [url, '-O', filename], {detached: true, stdio: 'ignore'});
      wget.on('close', () => {
        spinner.test =  'Finish';
        spinner.succeed();
        return;
      });
    } else {
      console.log(chalk.green('Run any of these links in your video player'));
      for (let url of data.urls) {
        console.log(chalk.green(url));
      }
    }
  }).catch((err) => {
    spinner.text = `Error: ${err.message}`;
    spinner.fail();
  });
} else {
  program.help();
}
