const urban = require('urban.js');

class Urban {
  constructor(opts) {
    this.word = opts.word;
    this.user = opts.user;
  }

  parseText(str) {
    const delimiter = '...';

    str = str.replace(/[[\]']+/g, '');

    if (str.length > 1024) {
      return str.substr(0, 1024 - delimiter.length) + delimiter;
    }

    return str;
  }

  generateEmbed(data) {
    const fields = [
      {
        name: 'Meghatározás',
        value: this.parseText(data.definition)
      },
      {
        name: 'Példa',
        value: data.example ? this.parseText(data.example) : 'N/A'
      },
      {
        name: 'Szerző',
        value: data.author
      }
    ];

    if (data.tags && data.tags.length) {
      fields.push({
        name: 'Címkék',
        value: data.tags.join(', ')
      });
    }

    return {
      embed: {
        author: {
          name: this.user.username,
          icon_url: this.user.avatarURL
        },
        title: this.word,
        url: data.URL,
        description: `A(z) ${this.word} meghatározása az Urban Dictionary szerint.`,
        fields
      }
    };
  }

  init() {
    return new Promise((resolve, reject) => {
      return urban(this.word)
        .then(data => resolve(this.generateEmbed(data)))
        .catch(() => reject(new Error('Hiba történt. Lehet, hogy ez a szó nincs még definiálva.')));
    });
  }
}

module.exports = Urban;
