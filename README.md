![pxi-json teaser][teaser]

🧚`pxi-json` is a JSON plugin for `pxi` (pixie), the small, fast and magic command-line data processor.

See the [`pxi` github repository][pxi] for more details!

[![node version][shield-node]][node]
[![npm version][shield-npm]][npm-package]
[![license][shield-license]][license]
[![PRs Welcome][shield-prs]][contribute]
[![linux unit tests status][shield-unit-tests-linux]][actions]
[![macos unit tests status][shield-unit-tests-macos]][actions]
[![windows unit tests status][shield-unit-tests-windows]][actions]

## Installation

> :ok_hand: `pxi-json` comes preinstalled in `pxi`.
> No installation necessary.
> If you still want to install it, proceed as described below.

`pxi-json` is installed in `~/.pxi/` as follows:

```bash
npm install pxi-json
```

The plugin is included in `~/.pxi/index.js` as follows:

```js
const json = require('pxi-json')

module.exports = {
  plugins:  [json],
  context:  {},
  defaults: {}
}
```

For a much more detailed description, see the [`.pxi` module documentation][pxi-module].

## Extensions

This plugin comes with the following `pxi` extensions:

|                   | Description                                                                                                                                                                                                            |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `jsonObj` chunker | Searches the data for JSON objects and returns each object as a token. All data between objects is dropped. This is useful in a streaming context, or when parsing files containing one big JSON list of JSON objects. |
| `json` parser     | Parses data into JSON. Uses JSON.parse internally.                                                                                                                                                                     |
| `json` marshaller | Serializes transformed JSON into JSON using JSON.stringify.                                                                                                                                                            |

## Reporting Issues

Please report issues [in the tracker][issues]!

## License

`pxi-json` is [MIT licensed][license].

[actions]: https://github.com/Yord/pxi-json/actions
[contribute]: https://github.com/Yord/pxi
[issues]: https://github.com/Yord/pxi/issues
[license]: https://github.com/Yord/pxi-json/blob/master/LICENSE
[node]: https://nodejs.org/
[npm-package]: https://www.npmjs.com/package/pxi-json
[pxi]: https://github.com/Yord/pxi
[pxi-module]: https://github.com/Yord/pxi#pxi-module
[shield-license]: https://img.shields.io/npm/l/pxi-json?color=yellow&labelColor=313A42
[shield-node]: https://img.shields.io/node/v/pxi-json?color=red&labelColor=313A42
[shield-npm]: https://img.shields.io/npm/v/pxi-json.svg?color=orange&labelColor=313A42
[shield-prs]: https://img.shields.io/badge/PRs-welcome-green.svg?labelColor=313A42
[shield-unit-tests-linux]: https://github.com/Yord/pxi-json/workflows/linux/badge.svg?branch=master
[shield-unit-tests-macos]: https://github.com/Yord/pxi-json/workflows/macos/badge.svg?branch=master
[shield-unit-tests-windows]: https://github.com/Yord/pxi-json/workflows/windows/badge.svg?branch=master
[teaser]: ./teaser.gif