![@pfx/json teaser][teaser]

`@pfx/json` is a JSON plugin for `pf`, the fast and extensible command-line data (e.g. JSON) processor and transformer.

See the [`pf` github repository][pf] for more details!

[![node version][shield-node]][node]
[![npm version][shield-npm]][npm-package]
[![license][shield-license]][license]
[![PRs Welcome][shield-prs]][contribute]
[![linux unit tests status][shield-unit-tests-linux]][actions]
[![macos unit tests status][shield-unit-tests-macos]][actions]
[![windows unit tests status][shield-unit-tests-windows]][actions]

## Installation

> :ok_hand: `@pfx/json` comes preinstalled in `pf`. No installation necessary. If you still want to install it, proceed as described below.

`@pfx/json` is installed in `~/.pfrc/` as follows:

```bash
npm install @pfx/json
```

The plugin is included in `~/.pfrc/index.js` as follows:

```js
const json = require('@pfx/json')

module.exports = {
  plugins:  [json],
  context:  {},
  defaults: {}
}
```

For a much more detailed description, see the [`.pfrc` module documentation][pfrc-module].

## Extensions

This plugin comes with the following `pf` extensions:

|                   | Description                                                                                                                                                                                                            |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `jsonObj` lexer   | Searches the data for JSON objects and returns each object as a token. All data between objects is dropped. This is useful in a streaming context, or when parsing files containing one big JSON list of JSON objects. |
| `json` parser     | Parses data into JSON. Uses JSON.parse internally.                                                                                                                                                                     |
| `json` marshaller | Serializes transformed JSON into JSON using JSON.stringify.                                                                                                                                                            |

## Reporting Issues

Please report issues [in the tracker][issues]!

## License

`@pfx/json` is [MIT licensed][license].

[actions]: https://github.com/Yord/pfx-json/actions
[contribute]: https://github.com/Yord/pf
[issues]: https://github.com/Yord/pf/issues
[license]: https://github.com/Yord/pfx-json/blob/master/LICENSE
[node]: https://nodejs.org/
[npm-package]: https://www.npmjs.com/package/@pfx/json
[pf]: https://github.com/Yord/pf
[pfrc-module]: https://github.com/Yord/pf#pfrc-module
[shield-license]: https://img.shields.io/npm/l/@pfx/json?color=yellow&labelColor=313A42
[shield-node]: https://img.shields.io/node/v/@pfx/json?color=red&labelColor=313A42
[shield-npm]: https://img.shields.io/npm/v/@pfx/json.svg?color=orange&labelColor=313A42
[shield-prs]: https://img.shields.io/badge/PRs-welcome-green.svg?labelColor=313A42
[shield-unit-tests-linux]: https://github.com/Yord/pfx-json/workflows/linux/badge.svg?branch=master
[shield-unit-tests-macos]: https://github.com/Yord/pfx-json/workflows/macos/badge.svg?branch=master
[shield-unit-tests-windows]: https://github.com/Yord/pfx-json/workflows/windows/badge.svg?branch=master
[teaser]: ./teaser.gif