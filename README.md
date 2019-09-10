<h1>Bolyai Bot</h1>

[![Thimble Bot](https://img.shields.io/badge/thimble-bot-blue.svg)](https://thimblebot.xyz)
[![Dependency Status](https://david-dm.org/bolyaiwtf/bolyai-bot.svg)](https://david-dm.org/bolyaiwtf/bolyai-bot)

A Discord bot for Bolyai Discord servers.

## Requirements

At the moment, the only requirement is Node.js (preferably 10.2.x or higher). Chrome headless is required for puppeteer (the screenshot command).

Before installing the bot, make sure you have a user created for it, which you will configure properly in the config file.

## Installation

Clone the repository and install the dependencies.

```sh
git clone git@github.com:bolyaiwtf/bolyai-bot
cd bolyai-bot
npm install
```

You might also want to specify the path to the bot in the `THIMBLE_ROOT` environmental variable inside `/etc/profile`.
```sh
export THIMBLE_ROOT="/path/to/thimble-bot"
```

To create a new command you can run the included generator script:

```sh
node bin/createCommand
```

## Before committing

Contribution is welcome, but before opening a PR, make sure that your changes pass linting.

```
npm run lint
```

Writing tests for the extra libs is kinda nice too

```
npm run test
```

## License

MIT.
