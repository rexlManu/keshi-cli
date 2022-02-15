# keshi

A simple CLI for running commands concurrently.

Made for laravel but works with everything.

## Installation

`yarn global add keshi-cli`

`npm install keshi-cli --global`

## Usage

For starting everything you just need to run the command `keshi`.

Keshi will then searches for a `keshi.default.js` with tasks, if it doesn't exist, the default built in commands will be used.

### Default tasks

```js
module.exports = {
  tasks: {
    laravel: 'php artisan serve',
    vue: 'yarn dev',
  },
};
```

### Running the command

`keshi`

## Goal

I originally developed this tool for this purpose, so that I don't have to open multiple terminals each time when programming Laravel apps with VueJS.

## Security

If you discover any security related issues, please email mail@emmanuel-lampe.de instead of using the issue tracker.

## Credits

- [Emmanuel Lampe](https://github.com/rexlmanu)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
