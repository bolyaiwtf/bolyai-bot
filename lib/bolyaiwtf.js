const axios = require('axios');
const html2text = require('html-to-text');

const config = require('../config');

class BolyaiWtf {
  get() {
    const url = (config.bolyaiwtf && config.bolyaiwtf.apiUrl) || 'https://bolyaiwtf.now.sh/api/message';

    return axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(({ data }) => {
        return data.ok ? data.message : 'Nem sikerült betölteni az üzenetet.';
      })
      .catch(err => console.error(err));
  }

  removeHTML(str) {
    return html2text.fromString(str, {
      ignoreHref: true,
      noLinkBrackets: true
    });
  }

  reformat(src) {
    const header = this.removeHTML(src.header);
    const comment = this.removeHTML(src.comment) || null;

    return { header, comment };
  }

  async init() {
    const message = await this.get();

    const formattedMessage = this.reformat(message);

    return formattedMessage;
  }
};

const wtf = new BolyaiWtf();

module.exports = wtf;
