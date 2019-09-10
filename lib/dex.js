const axios = require('axios');
const Turndown = require('turndown');

class Dex {
  constructor(opts) {
    this.word = opts.word;
    this.user = opts.user;
    this.dexURL = `https://dexonline.ro/definitie/${encodeURIComponent(opts.word)}`;
  }

  parse(html) {
    const converter = new Turndown();
    return converter.turndown(html);
  }

  truncate(str) {
    const delimiter = '...';

    if (str.length > 1024) {
      return str.substr(0, 1024 - delimiter.length) + delimiter;
    }

    return str;
  }

  fetch() {
    return new Promise((resolve, reject) => {
      if (!this.word) {
        return reject(new Error('NO_WORD_PROVIDED'));
      }

      return axios.get(`${this.dexURL}/json`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(({ data }) => {
          return resolve(data.definitions[0].htmlRep);
        })
        .catch(() => {
          return reject(new Error('FETCH_ERROR'));
        });
    });
  }

  init() {
    return new Promise((resolve, reject) => {
      return this.fetch()
        .then(data => this.parse(data))
        .then(data => this.truncate(data))
        .then(data => {
          return resolve({
            embed: {
              author: {
                name: this.user.username,
                icon_url: this.user.avatarURL
              },
              title: this.word,
              url: this.dexURL,
              description: `A(z) ${this.word} szó meghatározása.`,
              fields: [
                {
                  name: 'Meghatározás',
                  value: data
                }
              ],
              timestamp: new Date(),
              footer: {
                icon_url: this.user.avatarURL,
                text: 'Bolyai Farkas Bot'
              }
            }
          });
        })
        .catch(() => {
          return reject(new Error('Hiba történt. Lehet, hogy ez a szó nincs meg a DEX-ben.'));
        });
    });
  }
};

module.exports = Dex;
