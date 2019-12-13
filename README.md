![@pfx/json teaser][teaser]

`@pfx/json` is a JSON plugin for `pf`, the fast and extensible command-line data (e.g. JSON) processor and transformer.

See the [`pf` github repository][pf] for more details!

[![npm version][npm-shield]][npm-package]
[![license][license-shield]][license]
[![unit tests status][unit-tests-shield]][actions]

## Installation

> :ok_hand: `@pfx/json` comes preinstalled in `pf`. No installation necessary. If you still want to install it, proceed as described below.

`pf` requires **node v8.3.0** or higher.

Usually, `@pfx/json` is installed in `~/.pfrc/` as follows:

```bash
npm install @pfx/json
```

The plugin is included in `~/.pfrc/index.js` as follows:

```js
const jsonPlugin = require('@pfx/json')

module.exports = {
  plugins:  [jsonPlugin],
  context:  {},
  defaults: {}
}
```

For a much more detailed description, see the [`pf` repository][pf].

## License

`@pfx/json` is [MIT licensed][license].

[npm-package]: https://www.npmjs.com/package/@pfx/json
[license]: https://github.com/Yord/pfx-json/blob/master/LICENSE
[teaser]: ./teaser.gif
[pf]: https://github.com/Yord/pf
[actions]: https://github.com/Yord/pfx-json/actions
[npm-shield]: https://img.shields.io/npm/v/@pfx/json.svg?color=orange
[license-shield]: https://img.shields.io/badge/license-MIT-blue.svg?color=green
[unit-tests-shield]: https://github.com/Yord/pfx-json/workflows/unit%20tests/badge.svg?branch=master