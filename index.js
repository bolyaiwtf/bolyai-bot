const Commando = require('discord.js-commando');
const path = require('path');
const Raven = require('raven');

const config = require('./config');

if (config.sentry.secret && config.sentry.id) {
  const dsn = `https://${config.sentry.public}:${config.sentry.secret}@sentry.io/${config.sentry.id}`;
  Raven.config(dsn).install();
}

const client = new Commando.Client({
  commandPrefix: config.prefix,
  disableEveryone: true,
  owner: config.owner,
  unknownCommandResponse: false
});

client
  .registry
  .registerDefaultTypes()
  .registerGroups([
    ['bolyaibot', 'Bolyai Bot parancsok']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'))
  .registerCommandsIn(path.join(__dirname, 'custom', 'commands'));

client.on('ready', async () => {
  console.log('Bot started.');

  if (config.activity) {
    // client.setActivity(config.activity);
  }

  // invoking workers
  const workers = path.join(__dirname, 'workers');
  const customWorkers = path.join(__dirname, 'custom', 'workers');

  Object.values(require('require-all')(workers)).forEach(worker => worker(client));
  Object.values(require('require-all')(customWorkers)).forEach(worker => worker(client));
});

client.login(config.token);
