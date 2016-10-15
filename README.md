# anime-dl-cli

[![npm version](https://img.shields.io/npm/v/anime-dl-cli.svg?style=flat-square)](https://www.npmjs.com/package/anime-dl-cli)
[![npm downloads](https://img.shields.io/npm/dm/anime-dl-cli.svg?style=flat-square)](https://www.npmjs.com/package/anime-dl-cli)
[![dependency Status](https://img.shields.io/david/lgaticaq/anime-dl-cli.svg?style=flat-square)](https://david-dm.org/lgaticaq/anime-dl-cli#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/anime-dl-cli.svg?style=flat-square)](https://david-dm.org/lgaticaq/anime-dl-cli#info=devDependencies)

> CLI for show and download anime from jkanime.net

## Installation

```bash
npm i -g anime-dl-cli
```

## Use

For streamng require [mpv](https://mpv.io/). For download require [wget](https://www.gnu.org/software/wget/).

```bash
anime-dl -a <anime> -c <chapter>
anime-dl -a <anime> -c <chapter> -k # play in mpv
anime-dl -a <anime> -c <chapter> -d # download in current directory
anime-dl -a <anime> -c <chapter> -d <directory> # download in a directory
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
