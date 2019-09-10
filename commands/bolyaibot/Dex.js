const { Command } = require('discord.js-commando');
const Dex = require('../../lib/dex');

const Raven = require('raven');

class DexCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'dex',
      memberName: 'dex',
      group: 'bolyaibot',
      description: 'Szó keresése a román értelmező szótárban (dexonline.ro).',
      args: [
        {
          key: 'word',
          type: 'string',
          default: '',
          prompt: 'n/a'
        }
      ]
    });
  }

  async run(message, { word }) {
    if (!word) {
      return message.say(':warning: Kérlek, add meg a kifejezést amire kíváncsi vagy.');
    }

    try {
      const dex = new Dex({
        word,
        user: this.client.user
      });

      const output = await dex.init();

      return message.say(output);
    } catch (err) {
      message.say(':x: Nem sikerült megkeresni a kifejezést.');
      Raven.captureException(err);
    }
  }
};

module.exports = DexCommand;
