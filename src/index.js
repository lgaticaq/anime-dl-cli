#!/usr/bin/env node

'use strict';

import {spawn} from 'child_process';
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
  .option('-p, --player', 'Run player (optional). Availables: mpv|vlc|mplayer|omxplayer|smplayer|cvlc. Default: mpv', /(mpv|vlc|mplayer|omxplayer|smplayer|cvlc)/i, 'mpv')
  .parse(process.argv);

if (program.anime && program.chapter) {
  animeDl.getLinksByNameAndChapter(program.anime, program.chapter).then((data) => {
    if (data.urls.length === 0) return console.log(chalk.red('Not found a link'));
    const chapter = data.urls[data.urls.length - 1];
    if (program.player) {
      console.log(chalk.green(`Wait running ${program.player} ${chapter} ...`));
      spawn(program.player, [chapter], {detached: true, stdio: 'ignore'});
    } else {
      console.log(chalk.green(`Run ${chapter} in any player`));
    }
  }).catch((err) => console.log(chalk.red(`Error: ${err.message}`)));
} else {
  program.help();
}
