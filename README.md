# keshi

<span class="badge-npmversion"><a href="https://npmjs.org/package/keshi-cli" title="View this project on NPM"><img src="https://img.shields.io/npm/v/keshi-cli.svg" alt="NPM version" /></a></span>
<span class="badge-npmdownloads"><a href="https://npmjs.org/package/keshi-cli" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/keshi-cli.svg" alt="NPM downloads" /></a></span>

A simple CLI for running commands concurrently.

Made for laravel but works with everything.

<img src="./.github/preview/showcase.gif" />

## Installation

`yarn global add keshi-cli`

`npm install keshi-cli --global`

## Usage

To start everything, you just need to run the command `keshi`.

Keshi will then search for a `keshi.default.js` with tasks, if it doesn't exist, the default built in commands will be used.

### Commands

`keshi` - Start all tasks concurrently

`keshi -p <name>` - Start all tasks from the preset

`keshi init` - Create the default config file

`keshi create` - Create a new preset

`keshi list` - List available presets

`keshi delete <name>` - Delete a preset

`keshi --help`

`keshi --version`

### Config

The default looks like this if you generate it with `keshi init`.

```js
module.exports = {
  preset: '',
  tasks: {
    laravel: 'php artisan serve',
    vue: 'yarn dev',
  },
};
```

You can set 'preset' to one of your presets

## Presets

Your presets are saved in your user home directory under `.keshirc` or `.keshirc.json`.

### Premade presets

Premade presets for certain development environments.

#### Laravel

You can find premade presets for laravel development [here](./presets/laravel-development.json).

## Goal

I originally developed this tool for the purpose, so that I don't have to open multiple terminals at once when programming Laravel apps with VueJS.

## Security

If you discover any security related issues, please email mail@emmanuel-lampe.de instead of using the issue tracker.

## Credits

- [Emmanuel Lampe](https://github.com/rexlmanu)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
