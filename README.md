![@pfx/json teaser][teaser]

`@pfx/json` is a JSON plugin for `pf`, the fast and extensible command-line data (e.g. JSON) processor and transformer.

See the [`pf` github repository][pf] for more details!

[![node version][node-shield]][node]
[![npm version][npm-shield]][npm-package]
[![license][license-shield]][license]
[![PRs Welcome][prs-shield]][pfx-how-to-contribute]
[![linux unit tests status][linux-unit-tests-shield]][actions]
[![macos unit tests status][macos-unit-tests-shield]][actions]
[![windows unit tests status][windows-unit-tests-shield]][actions]

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

For a much more detailed description, see the [`.pfrc` module documentation][pf-pfrc-module] in the [`pf` repository][pf].

## Reporting Issues

Please report issues [at the `pf` repository][issues]!

## License

`@pfx/json` is [MIT licensed][license].

[npm-package]: https://www.npmjs.com/package/@pfx/json
[license]: https://github.com/Yord/pfx-json/blob/master/LICENSE
[teaser]: ./teaser.gif
[pf]: https://github.com/Yord/pf
[actions]: https://github.com/Yord/pfx-json/actions
[npm-shield]: https://img.shields.io/npm/v/@pfx/json.svg?color=orange
[license-shield]: https://img.shields.io/npm/l/@pfx/json?color=yellow
[node-shield]: https://img.shields.io/node/v/@pfx/json?color=red
[node]: https://nodejs.org/
[prs-shield]: https://img.shields.io/badge/PRs-welcome-green.svg
[pfx-how-to-contribute]: https://github.com/Yord/pf
[linux-unit-tests-shield]: https://img.shields.io/github/workflow/status/Yord/pfx-json/linux/master?label=linux&logo=github&color=#5A5A5A&logoColor=#5A5A5A
[macos-unit-tests-shield]: https://img.shields.io/github/workflow/status/Yord/pfx-json/macos/master?label=macos&logo=github&color=#5A5A5A&logoColor=#5A5A5A
[windows-unit-tests-shield]: https://img.shields.io/github/workflow/status/Yord/pfx-json/windows/master?label=windows&logo=github&color=#5A5A5A&logoColor=#5A5A5A
[issues]: https://github.com/Yord/pf/issues
[pf-pfrc-module]: https://github.com/Yord/pf#pfrc-module