const { Command } = require('discord.js-commando');
const bolyaiwtf = require('../../lib/bolyaiwtf');

const Raven = require('raven');

class WtfCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'wtf',
      memberName: 'wtf',
      group: 'bolyaibot',
      description: 'Egy random üzenet a bolyai.wtf-ről.'
    });
  }

  async run(message) {
    try {
      const wtf = await bolyaiwtf.init();

      let output = wtf.header;

      if (wtf.comment) {
        output = `${output}\n*${wtf.comment}*`;
      }

      return message.say(output);
    } catch (err) {
      message.say(':x: Nem sikerült betölteni az üzenetet.');
      Raven.captureException(err);
    }
  }
};

module.exports = WtfCommand;
