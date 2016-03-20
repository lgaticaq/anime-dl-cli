#!/usr/bin/env node

'use strict';

import program from 'commander';
import animeDl from 'anime-dl';
import pkg from '../package.json';

program
  .version(pkg.version)
  .usage('-a <anime> -c <chapter>')
  .description('CLI for get chapter link')
  .option('-a, --anime [anime]', 'Add name')
  .option('-c, --chapter [chapter]', 'Add chapter')
  .parse(process.argv);

if (program.anime && program.chapter) {
  animeDl.getLinksByNameAndChapter(program.anime, program.chapter).then((data) => {
    if (data.urls.length === 0) return console.log('Not found a link');
    console.log(data.urls[data.urls.length - 1]);
  }).catch(() => console.log('an error occurred'));
} else {
  program.help();
}
