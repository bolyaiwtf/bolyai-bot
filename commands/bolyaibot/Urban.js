const { Command } = require('discord.js-commando');
const Urban = require('../../lib/urban');

const Raven = require('raven');

class UrbanCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'urban',
      memberName: 'urban',
      group: 'bolyaibot',
      description: 'Szó keresése az Urban Dictionary-ben.',
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
      const urban = await new Urban({
        word,
        user: this.client.user
      }).init();

      return message.say(urban);
    } catch (err) {
      message.say(':x: Nem sikerült megkeresni a kifejezést.');
      Raven.captureException(err);
    }
  }
};

module.exports = UrbanCommand;
